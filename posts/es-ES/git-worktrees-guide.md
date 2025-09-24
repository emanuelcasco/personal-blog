---
title: 'Git Worktrees: Guía para desarrollo en paralelo'
excerpt: 'Aprende cómo Git worktrees puede revolucionar tu flujo de desarrollo permitiendo el trabajo en ramas paralelas, eliminando la fricción del cambio de contexto y haciendo tu experiencia con Git más eficiente.'
coverImage: '/assets/blog/git-worktrees-guide/cover.png'
date: '2025-03-03T00:00:00Z'
tags:
  [git, herramientas de desarrollo, optimización de flujo, control de versiones, productividad]
---

## Git Worktrees: branching limpio y eficiente sin el desorden

**TL;DR**

- Usa Git Worktrees cuando quieras tener múltiples ramas activas al mismo tiempo sin estar cambiando constantemente.
- Se _sienten_ como tener copias de tu carpeta de proyecto, pero son mucho más eficientes.
- Te ayudan a evitar el infierno del stash, aceleran el cambio de contexto y mantienen tu repo ordenado.

### ¿Qué son los Git Worktrees?

Un Git worktree es esencialmente otro directorio de trabajo vinculado al mismo repositorio. Te permite hacer checkout de diferentes ramas en carpetas separadas, compartiendo los mismos datos subyacentes de Git.

Podrías pensar "¿No es eso simplemente copiar mi carpeta de proyecto y trabajar ahí?" — bueno, **sí y no**:

| Como "copiar + pegar directorio del proyecto"                                   | Lo que worktrees _realmente_ hacen                                                                                              |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Carpeta separada por rama                                                        | Carpeta separada por rama                                                                                                       |
| Probablemente duplicar todos los archivos, historial, metadata de Git           | **Comparten el mismo historial `.git` y base de datos de objetos**                                                             |
| Riesgo de remotos divergentes, conflictos si intentas tratarlos como repos diferentes | Se mantienen sincronizados respecto a commits, tracking de remotos; flujo de trabajo limpio y seguro administrado por Git mismo |
| Espacio en disco desperdiciado si hay muchas ramas                              | Mucho menos overhead — solo nuevos directorios de trabajo y metadata de checkout; la mayoría de los datos (objetos, historial) se reutilizan |

Entonces, aunque los worktrees se _sienten_ como múltiples copias, son más como tener múltiples "vistas" o "checkouts" del mismo repo sin las ineficiencias.

### Por qué usarlos

- Trabajar en dos (o más) ramas a la vez **sin hacer stash**.
- Más fácil comparar trabajo en funcionalidades en paralelo (digamos, bugfix + feature + preparación de release).
- Evitar el "solo un commit más en la rama A" antes de cambiar a la rama B, y luego olvidar qué cambiaste.
- Builds/tests más limpios: aislar build de release o trabajo de hotfix en una carpeta separada.
- Mejor rendimiento y uso de disco que tener clones completos por todos lados.

### Cómo usar worktrees

```bash
# Crear un nuevo worktree para una nueva rama
git worktree add ../feature/my-cool-thing feature/my-cool-thing

# Crear un worktree para una rama existente
git worktree add ../bugfix/urgent bugfix/urgent

# Verificar el estado
cd ../feature/my-cool-thing
git status

# Remover cuando termines
git worktree remove ../bugfix/urgent
```

### Mi script auxiliar: `gwts`

Usar comandos `git worktree` raw está bien, pero me encontré repitiendo los mismos pasos: crear la rama, configurar la carpeta, copiar configs locales como `.env`, y asegurarme de que las dependencias estén listas.

Entonces escribí un pequeño helper: **`gwts`**.

Lo que hace:

1. Crea una nueva rama con el nombre que le pases.
2. Crea un worktree con un nombre de directorio en el formato `<nombrerepo>-<nombrerama>`.
3. Copia `.env`, `node_modules` y `.venv` de tu repo principal usando `rsync` para que el nuevo worktree arranque instantáneamente.

Ejemplo:

```bash
gwts feature/new-dashboard
```

Esto va a:

- Crear la rama `feature/new-dashboard`.
- Crear una carpeta `myrepo-feature-new-dashboard`.
- Copiar `.env`, `node_modules`, `.venv`.
- Dejarte directo en un ambiente listo para trabajar.

Eso significa no reinstalar dependencias, no configurar configs locales, solo empezar a codear.

```bash
#!/usr/bin/env bash

set -euo pipefail

# git-wta: Create a worktree and copy .env files and node_modules via rsync
# Usage:
#   git wta <new-branch> [start-point]
# or run directly if on PATH:
#   git-wta <new-branch> [start-point]

err() { printf "Error: %s\n" "$*" >&2; }

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || { err "Missing required command: $1"; exit 127; }
}

need_cmd git
need_cmd rsync
need_cmd find

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  err "This command must be run inside a Git repository."
  exit 1
fi

if [[ ${1:-} == "" ]]; then
  echo "Usage: git wta <new-branch> [start-point]" >&2
  exit 2
fi

branch="$1"
start_point="${2:-}"

repo_root="$(git rev-parse --show-toplevel)"
root_name="$(basename "$repo_root")"
parent_dir="$(dirname "$repo_root")"

# Destination follows rule: ../<root_dir_name><branch>
dest_dir="$parent_dir/${root_name}-${branch}"

if [[ -e "$dest_dir" ]]; then
  err "Destination already exists: $dest_dir"
  exit 1
fi

echo "Preparing worktree at: $dest_dir (branch: $branch)"

# Prune any stale worktree registrations first (safe, no-op if none)
git worktree prune >/dev/null 2>&1 || true

# If current worktree is on the target branch, switch away (a branch
# can be checked out in only one worktree at a time)
current_branch="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$current_branch" == "$branch" ]]; then
  default_base="$(git symbolic-ref -q --short refs/remotes/origin/HEAD 2>/dev/null || true)"
  default_base="${default_base#origin/}"
  base_ref="${default_base:-main}"
  git switch "$base_ref" 2>/dev/null \
    || git switch -c "$base_ref" --track "origin/$base_ref" 2>/dev/null \
    || git switch --detach
fi

# If the branch is already checked out in another active worktree, abort
if git worktree list --porcelain | awk '/^branch /{print $2}' | grep -qx "refs/heads/$branch"; then
  err "Branch '$branch' is already checked out in another worktree."
  exit 1
fi

# Decide how to add the worktree: use existing local branch, or create it
if git show-ref --verify --quiet "refs/heads/$branch"; then
  # Branch exists locally; just attach it to a new worktree
  git worktree add "$dest_dir" "$branch"
else
  # Branch does not exist locally; pick a sensible start point
  track_flag=""
  if [[ -n "$start_point" ]]; then
    sp="$start_point"
  else
    # Optionally fetch to ensure remotes are up to date
    git fetch --all --prune --quiet || true
    if git show-ref --verify --quiet "refs/remotes/origin/$branch"; then
      sp="origin/$branch"
      track_flag="--track"
    else
      sp="HEAD"
    fi
  fi

  git worktree add -b "$branch" ${track_flag:+$track_flag} "$dest_dir" "$sp"
fi

echo "Copying .env files..."
# Copy all files specifically named ".env" (skip .git and node_modules trees while searching)
while IFS= read -r -d '' env_path; do
  rel="${env_path#"$repo_root"/}"
  target="$dest_dir/$rel"
  mkdir -p "$(dirname "$target")"
  rsync -a "$env_path" "$target"
  echo "  .env -> $rel"
done < <(find "$repo_root" \
          -type d -name .git -prune -o \
          -path '*/node_modules/*' -prune -o \
          -type f -name .env -print0)

echo "Copying node_modules directories (this may take a while)..."
# Copy every top-level directory named node_modules (any depth), no recursion into them during discovery
while IFS= read -r -d '' nm_path; do
  rel="${nm_path#"$repo_root"/}"
  target="$dest_dir/$rel"
  mkdir -p "$target"
  # Trailing slashes ensure rsync copies directory contents into target directory
  rsync -a "$nm_path/" "$target/"
  echo "  node_modules -> $rel"
done < <(find "$repo_root" -type d -name node_modules -prune -print0)

echo "Done. New worktree: $dest_dir"
echo "Next: cd \"$dest_dir\""
```

### Casos de uso

Entonces, ¿cuándo hace realmente la diferencia esto?

- **Revisiones de Pull Request**
  Crea la rama del PR en su propio worktree, prueba los cambios, ejecuta builds — todo sin dejar atrás tu rama de trabajo actual.

- **Hotfixes bajo presión**
  Llega un issue de producción, pero no quieres hacer stash o ensuciar tu rama de feature. Solo abre un worktree de hotfix, arregla, prueba, pushea. Tus cambios en curso permanecen intactos.

- **Experimentar con múltiples soluciones**
  A veces estás explorando diferentes enfoques (ej. ajustes de algoritmos, estrategias de refactor, o comportamientos de agentes de IA). Los worktrees te permiten correr experimentos paralelos lado a lado sin tropezarte entre ellos. Esto es especialmente útil en la actual "era de los agentes", donde probar múltiples enfoques rápidamente es la norma.

- **Preparación y testing de release**
  Construye desde tu rama de release en un worktree, continúa desarrollando features en otro. Sin pérdida de contexto.

### Diferencias y trampas a tener en cuenta

- **Objetos Git compartidos**: los worktrees comparten la misma base de datos de objetos `.git`, por lo que cambios de archivos grandes se almacenan solo una vez.
- **Reglas de checkout de rama**: no puedes hacer checkout de la misma rama en dos worktrees. Si lo intentas, Git se quejará.
- **Limpieza necesaria**: cuando un worktree ya no se usa, deberías removerlo. De lo contrario, acumularás carpetas, cabos sueltos.
- **Tracking de remotos**: hacer push/pull funciona igual, pero debes estar consciente de en qué worktree estás. Herramientas/scripts que referencian rutas deben ajustarse.

### Conclusión

Git Worktrees te dan gran parte del beneficio de tener múltiples copias de tu directorio de proyecto — múltiples ramas trabajadas en paralelo — pero sin la duplicación, desorden y overhead.

Y si los combinas con un helper como `gwts`, eliminas aún más fricción: creando worktrees que están listos para usar en segundos.

Pruébalo para tu próxima revisión de PR, hotfix, o experimento — una vez que veas lo limpio que se siente el flujo de trabajo, no volverás atrás.

**Recuerda: El futuro de los flujos de trabajo de Git es paralelo, no secuencial. Los worktrees hacen ese futuro disponible hoy.**

Links:

- [Documentación de Git Worktrees](https://git-scm.com/docs/git-worktree)
- [Libro Pro Git](https://git-scm.com/book)