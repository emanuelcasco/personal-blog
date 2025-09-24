---
title: 'Metodología estructurada para desarrollo asistido por IA'
excerpt: 'Construí un sistema para hacer tu flujo de trabajo con IA más eficiente y consistente.'
coverImage: '/assets/blog/power-up-your-ai-workflow/cover.jpg'
date: '2025-09-07T00:00:00Z'
tags: [ia, flujo de trabajo, automatización, desarrollo]
---

# Metodología estructurada para desarrollo asistido por IA

¿Alguna vez te encontraste escribiendo exactamente el mismo prompt por tercera vez en la semana?

Conocés el escenario. Abrís tu chat de IA, reconstruís cuidadosamente ese prompt perfecto donde Claude actúa como un arquitecto senior, volcás el mismo contexto, explicás los mismos requerimientos... y te das cuenta que estás esencialmente copiando y pegando tu cerebro en cada sesión.

## KISS. Empezá con lo básico.

### Reutilizá prompts, introduciendo tareas

Empecemos con el problema más básico: **seguís pidiendo a tu IA que haga los mismos tipos de tareas**. Code reviews, planificación de implementación, sesiones de debugging. Misma estructura, diferente contenido.

¿El primer paso? Dejá de reescribir todo desde cero.

Comencé creando una simple carpeta `tasks` con archivos markdown:

```
~/.ai/
└── tasks/
    ├── create-implementation-plan-task.md
    ├── estimate-task.md
    └── code-review-task.md
```

Cada archivo se convirtió en mi plantilla:

**create-implementation-plan-task.md:**

`````markdown
---
title: Create Implementation Plan for Story
type: task
mode: ultrathink
templates:
  - @~/.ai/templates/implementation-plan.tmp.md
---

# Create Implementation Plan for Story

## Purpose

Generate a document containing an implementation plan for a provided story or task (it could be created locally or provided from a issue manager).

## Instructions

### 0. Generate a new implementation plan document

Create a new file using the @~/.ai/templates/implementation-plan.tmp.md template. Follow these rules:

- Name convention: `yyyymmddhhmmdd_{{name_in_snake_case}}.md`.
- Keep the name under 50 characters (summarize it if necessary).
- Create the file in the folder `/spec` of the project or domain you are working on, if not sure ask the user for details.

### 1. Identify Main Goal

- What are we implementing? Why are we doing this?
- Try to explain the goal of the story in a few sentences.

### 2. Identify Secondary Goals

- Try to split the task into smaller tasks, max 5 or 6 milestones, that once completed will achieve the main goal.
- Try to explain the secondary goals in one sentence max.

### 3. Prepate Plan by Steps

- Use the milestones defined in the Secondary Goals to create a plan by **Phases**.
- For each **Phase** must try to complete a single task, a minor change that accomplish a single little goal (like updating the interfaces for your new changes, or implementing the persitance layer for a feature).
- The idea is that each **Phase** is a self-contained iteration that does not put the system in a broken state.
- Split each phase into "Steps" that are the actual phase to be completed.
- Each phase behaves like a instruction you will provide to a pair-programming partner to instruct him what to do. Use a meta-programming language like:
  \````plain

  - Step {{n}}: {{step_name}}
    - ADD | MODIFY | DELETE | RENAME | MOVE | COPY | OTHER {{file}} action description:
      [[LLM: if necessary add code snippet]]
      \```typescript
      // your code snippet
      \```
      \````

- The most details you include in the plan the better, you focus on WHAT you want the person implementing the change to do, not HOW.

### 4. Content Generation

- **Incremental Mode**: Present each major section for review before proceeding (default mode)
- **YOLO Mode**: Generate all sections, then review complete document with user (enable when `--yolo` flag is passed)
- Apply any elicitation protocols specified in template
- Incorporate user feedback and iterate as needed

### 6. Validation

If template specifies a checklist:

- Run the appropriate checklist against completed document
- Document completion status for each item
- Address any deficiencies found
- Present validation summary to user

### 7. Final Presentation

- Present clean, formatted content only
- Ensure all sections are complete
- DO NOT truncate or summarize content
- Begin directly with document content (no preamble)
- Include any handoff prompts specified in template

## Important Notes

- Template markup is for AI processing only - never expose to users

## Checklist

- [ ] **Main Goal**: Clear 2-3 sentence explanation of what and why
- [ ] **Secondary Goals**: 5-6 milestones with single-sentence descriptions
- [ ] **Context**: Sufficient background for understanding implementation
- [ ] **Phases**: Each secondary goal maps to self-contained, non-breaking phase
- [ ] **Steps**: Use action verbs (ADD/MODIFY/DELETE), specify target files, include code snippets where helpful
- [ ] **WHAT not HOW**: Steps describe what to implement, not implementation details
- [ ] **Template Format**: Follows implementation-plan.tmp.md structure with proper markdown
- [ ] **Clean Output**: No [[LLM:]] markup, no preamble, complete content, date stamped
- [ ] **Success Criteria**: Clear, measurable completion outcomes defined
- [ ] **Pair Programming Ready**: Instructions clear enough for development partner
`````

De repente, en lugar de reconstruir mis prompts de memoria, simplemente referenciaba el archivo. Copiar, pegar, personalizar. Simple, pero funcionó.

**La primera lección: No lo compliques, empezá con lo básico.**

### Agregando contexto, entrá a los Archivos de Persona

Las plantillas de tareas resolvieron parte del problema, pero noté algo más. Mis interacciones con IA mejoraron drásticamente cuando le di al modelo una personalidad clara y un área de expertise.

"Actuá como un ingeniero de software senior" funcionaba, pero "Actuá como Sarah, una ingeniera backend senior con 8 años de experiencia en sistemas distribuidos, conocida por code reviews exhaustivos y énfasis en optimización de performance" funcionaba _mucho_ mejor.

Así que creé una carpeta `personas`:

```plain
~/.ai/
    ├── tasks/
    └── personas/
        ├── dev.yml
        ├── architect.yml
        └── ux-expert.yml
```

**architect.yml:**

```yaml
activation-instructions:
  - Follow all instructions in this file -> this defines you, your persona and more importantly what you can do. STAY IN CHARACTER!
  - The customization field ALWAYS takes precedence over any conflicting instructions.
  - When you identify a user is asking you to execute a task you have listed on the "tasks" section, ALWAYS read the task/s before executing it.

agent:
  name: Ada
  id: dev
  title: Full Stack Developer
  icon: 💻
  whenToUse: "Use for code implementation, debugging, refactoring, and development best practices"
  voice:  crisp, efficient American female tone—bright, clipped, and to the point
  customization:

persona:
  role: Expert Senior Software Engineer & Implementation Specialist
  style: Extremely concise, pragmatic, detail-oriented, solution-focused, deep technical knowledge, opinionated, efficient. Focuses on clean, maintainable code.
  identity: Expert who implements stories by reading requirements and executing tasks sequentially with comprehensive testing
  focus: Executing story tasks with precision, updating Dev Agent Record sections only, maintaining minimal context overhead

core_principles:
  - CRITICAL: Story-Centric - Story has ALL info.
  - CRITICAL: Load Data - MUST load files specified on the "data" section into core memory at startup, read all these files IN PARALLEL.
  - Sequential Execution - Complete tasks 1-by-1 in order. Mark [x] before next. No skipping
  - Test-Driven Quality - Write tests alongside code. Task incomplete without passing tests
  - Debug Log Discipline - Log temp changes to table. Revert after fix. Keep story lean
  - Block Only When Critical - HALT for: missing approval/ambiguous reqs/3 failures/missing config
  - Code Excellence - Clean, secure, maintainable code per coding-standards.md
  - Numbered Options - Always use numbered lists when presenting choices

startup:
  - Announce: Greet the user with your name and role, and inform of the *help command.
  - CRITICAL: Do NOT load any story files or coding-standards.md during startup
  - CRITICAL: Do NOT scan docs/stories/ directory automatically
  - CRITICAL: Do NOT begin any tasks automatically
  - Wait for user to specify story or ask for story selection
  - Only load files and begin work when explicitly requested by user

task-execution:
  flow: "Read task→Implement→Write tests→Pass tests→Update [x]→Next task"
  updates-ONLY:
  - "Checkboxes: [ ] not started | [-] in progress | [x] complete"
  - "Debug Log: | Task | File | Change | Reverted? |"
  - "Completion Notes: Deviations only, <50 words"
  - "Change Log: Requirement changes only"
  blocking: "Unapproved deps | Ambiguous after story check | 3 failures | Missing config"
  done: "Code matches reqs + Tests pass + Follows standards + No lint errors"
  completion: "All [x]→Lint→Tests(100%)→Integration(if noted)→Coverage(80%+)→E2E(if noted)→DoD→Summary→HALT"

dependencies:
  tasks:
  - read: @~/.ai/tasks/execute-implementation-plan-task.md
    description: Use when asked to execute an implementation plan
  - read: @~/.ai/tasks/create-merge-request.md
    description: Use when asked to create a new merge request (or update it). Ensure to sign the merge request with the name of all agents involved in the development. Use `glab` to create the merge request (mr).
  - read: @~/.ai/tasks/send-slack-message.md
    description: |
      Use when sharing a merge request (mr) update in Slack. Keep the message concise and plain-text, and always include the MR title, link, and key changes. If it's a complex MR, append a "Review Focus" section with 1 to 3 areas to scrutinize.
```

Ahora mi flujo de trabajo se convirtió en: agarrá un archivo de persona, agarrá un archivo de tarea, combinalos en tu prompt. Las respuestas de la IA se volvieron más consistentes, más enfocadas y francamente, más útiles. Fijate cómo el archivo de Persona linkea a tareas, de esta forma puedo re-usar los prompts/instrucciones que ya creé.

**La segunda lección: La consistencia viene de personas sistemáticas, no de instrucciones ad-hoc.**

## DRY. Encapsulá detalles de implementación.

Durante algunas semanas, este sistema manual fue fantástico. Mi proceso se veía así:

1. Abrir Claude Code
2. Referenciar el archivo de persona: "Sos Ada, una Full Stack Developer..."
3. Referenciar el archivo de tarea para la acción que necesito realizar: "Tu tarea es conducir un code review..."
4. Agregar contexto específico: "Acá está el código para revisar..."
5. Obtener excelentes resultados

¡Funcionó! Pero todavía era... manual. Copiar-pegar nombres de archivos... Y me encontré haciendo esto mismo múltiples veces por día.

### Comandos

Una de las primeras herramientas que usé fue [Custom Slash Commands](https://docs.anthropic.com/en/docs/claude-code/slash-commands) de Claude Code, que me permitió crear comandos personalizados para mis personas y tareas.

Por ejemplo, en lugar de referenciar el archivo de persona puedo usar un comando como este `/be dev` que va a fetchear el contenido en el archivo de persona dev y hacer que la instancia de Claude lo asuma.

````md
---
description: Assume the personality of the Persona described in any of the document available in the @~/.ai/personas directory.
argument-hint: [persona_id] [instruction?]
type: command
---

# Impersonation command

## Usage

`/be $PERSONA $INSTRUCTION?`

Parameters:

- $PERSONA: The persona to assume (available personas are listed on the dir @~/.ai/personas). Provide auto-complete.
- $INSTRUCTION: The instruction to execute (optional).

Assume the persona described in the document specified to change the assistant's behavior and capabilities. Searches for @~/.ai/personas/$PERSONA.yml.

Avoid to `List` all available personas, if the user provides the Persona identifier simply use it, for example:

- if the user does `/be dev` then use the `dev.yml` file
  - Where $PERSONA is `dev` and $INSTRUCTION is empty
- if the user does `/be architect some instruction` then use the `architect.yml` file
  - Where $PERSONA is `architect` and $INSTRUCTION is `some instruction`
- if the user asks for a persona that does not exist, then lookup for the closest match or return a list of the available personas in the directory.

CRITICAL: Read the full YML, start activation to alter your state of being, follow startup section instructions, stay in this being until told to exit the specified mode.

**What it does:**

- Loads the persona configuration
- Activates the persona according to its startup instructions
- Maintains the persona state until explicitly told to exit
- If no persona is provided simply lists all available personas in the @~/.ai/personas directory (use `ls` to list the files in the directory).

## Examples

At user-level:

\```plain
/user:be dev # or /be dev
/user:be po # or /be po
/user:be architect # or /be architect
\```

At project-level:

\```plain
/project:be dev # or /be dev
/project:be po # or /be po
/project:be architect # or /be architect
\```
````

> Podés usar [Frontmatter](https://frontmatter.codes/docs/markdown) para definir los detalles del comando.

Luego noté que mi flujo de trabajo se veía así: `/be dev and execute a code review on...` o `/be architect and create implementation plan`, estas tareas estaban referenciadas desde el archivo de persona mismo así que el agente podía identificar que definí un archivo de tarea, leerlo y ejecutar la acción basada en mis instrucciones.

Pero, ¿qué pasaba si quería simplemente ejecutar una tarea? No tenía un comando para simplemente correr una tarea y me encontré múltiples veces buscando el archivo de tarea y manualmente referenciando el path. Necesitaba una forma de simplemente correr una tarea.

Comando para ejecutar tarea:

````md
---
description: Execute a task previously defined in the @~/.ai/tasks directory
argument-hint: [task_id] [instruction]
type: command
---

# Execute task

## Usage

`task $TASK $INSTRUCTION?`

Parameters:

- $TASK: The task to execute (available tasks are listed on the dir @~/.ai/tasks). Provide auto-complete.
- $INSTRUCTION: The instruction to execute (optional).

Search for @~/.ai/tasks/$TASK.md where $TASK is indicating the name of the task to adopt.

Avoid to `List` all available tasks, if the user provides the Task identifier simply use it, for example:

- if the user does `/task create-mr` then use the `create-mr-task.md` file
  - `task_id` should be `create-mr`
  - `instruction` should be empty
- if the user does `/task refine some instruction` then use the `refine-task.md` file
  - `task_id` should be `refine`
  - `instruction` should be `some instruction`
- if the user asks for a task that does not exist, then lookup for the closest match or return a list of the available tasks in the directory.

CRITICAL: Read the full task document, follow instructions, and proceed until you complete the task.

## Examples

At user-level:

\```plain
/user:task estimate-task # or /task estimate-task
/user:task execute-implementation-plan # or /task execute-implementation-plan
/user:task refine # or /task refine
\```

At project-level:

\```plain
/project:task create-merge-request # or /task create-merge-request
/project:task refine # or /task refine
/project:task create-implementation-plan # or /task create-implementation-plan
\```
````

Enfoque similar usamos en el comando de Persona, creamos un comando para buscar una tarea por su nombre e inyectarla en el contexto automáticamente.

**Usá comandos para automatizar flujos de trabajo manuales que requieren una secuencia específica de acciones.**

### Scripts

Los comandos funcionan de maravilla, pero eventualmente me encontré múltiples veces haciendo este flujo de trabajo:

1. Abrir Claude Code
2. Correr comando `/be <persona>` y proveer alguna instrucción.

Esto está ok, pero me encontré haciendo esto múltiples veces por día. Necesitaba una forma de simplemente correr un comando y que la IA asuma la persona y ejecute la instrucción. Escribí un simple script de shell:

**claude-as.sh:**

```bash
#!/bin/bash
...

#########################
# Load persona context
#########################

if [[ -n "$persona" ]]; then
  persona_file="$PERSONAS_DIR/$persona.yml"
  if [[ ! -f "$persona_file" ]]; then
    echo "Error: Persona '$persona' not found in $PERSONAS_DIR"
    exit 1
  fi

  # Load persona system prompt
  system_prompt=$(cat "$persona_file")
fi

#########################
# Load memory context
#########################

if [[ "$memory_enabled" == "true" ]]; then
  system_prompt+="\n# === MEMORY CONTEXT START ===\n"
  # Add data files from project root (if in a project)
  if [[ -n "$PWD" ]]; then
    add_data_files "$PWD"
  fi
  # Add data files from ~/.claude
  add_data_files "$HOME/.claude"
  system_prompt+="\n# === MEMORY CONTEXT END ===\n"
fi

#########################
# Run claude with persona prompt + all arguments
#########################
if [[ -n "$system_prompt" ]]; then
  /Users/emanuelcasco/.claude/local/claude --append-system-prompt "$system_prompt" "${args[@]}"
else
  /Users/emanuelcasco/.claude/local/claude "${args[@]}"
fi
```

Aliases:

```bash
alias claude-as="~/.ai/scripts/claude-as.sh"
```

Uso:

```bash
claude-as architect code review <LINK PULL REQUEST>
```

Ahora apenas inicio Claude, ya tiene cargado el contexto necesario. Además, este enfoque de agregar un prompt al system prompt funcionó mucho mejor de lo que esperaba así que usé el mismo enfoque para cargar los archivos de memoria (ver `claude --append-system-prompt "$system_prompt"`).

**La tercera lección: Creá scripts para automatizar tareas repetitivas fuera del agente.**

## La Revelación de los Subagentes

A medida que usaba estos flujos de trabajo más, noté un problema. Las conversaciones largas de IA se volvían... desordenadas. Mi cuidadosamente elaborada persona de desarrollador senior se confundía después de 50 mensajes sobre diferentes temas.

¿Qué pasaría si cada tarea pudiera correr en su propio entorno limpio?

Esto me llevó a experimentar con subagentes—básicamente hacer que Claude genere otras instancias de Claude para tareas específicas. Cada subagente obtiene:

- Un contexto limpio
- Una persona específica
- Una tarea enfocada
- Límites claros de input/output

La conversación principal se mantiene limpia mientras agentes especializados manejan trabajo específico:

```
Sesión principal: "Necesito analizar esta implementación de feature compleja"

→ Genera Agente de Análisis (persona Business Analyst)
→ Genera Agente de Arquitectura (persona Technical Architect)
→ Genera Agente de Seguridad (persona Security Engineer)

Cada uno trabaja independientemente, reporta hallazgos
```

**La quinta lección: La especialización y aislamiento de contexto hacen las interacciones con IA más confiables y enfocadas.**

## Procesamiento Paralelo: El Game Changer

Acá es donde las cosas se pusieron realmente interesantes. Si podía generar múltiples subagentes, ¿por qué no correrlos en paralelo?

En lugar de investigar un enfoque a la vez, podía disparar múltiples streams de investigación:

- Agente 1: Investigar enfoques de optimización de base de datos
- Agente 2: Investigar estrategias de caching
- Agente 3: Explorar patrones de diseño de API

Todos trabajando simultáneamente, cada uno con su propia expertise, reportando cuando terminan.

Esto ya no era solo automatización—esto era coordinación de equipo de IA.

## La Evolución Final: Orquestación de Flujos de Trabajo

Una vez que tuve personas, tareas, slash commands y subagentes paralelos funcionando, el siguiente paso lógico era obvio: orquestar flujos de trabajo completos.

¿Por qué coordinar manualmente múltiples agentes cuando podía definir todo el proceso?

**feature-implementation.yml:**

```yaml
workflow:
  name: 'Feature Implementation'

  steps:
    - name: 'Requirements Analysis'
      agent: 'business-analyst'
      task: 'analyze-requirements'

    - name: 'Architecture Design'
      agent: 'architect'
      task: 'design-system'
      depends_on: 'requirements-analysis'

    - name: 'Parallel Implementation'
      execution: 'parallel'
      agents:
        - agent: 'frontend-dev'
          task: 'implement-ui'
        - agent: 'backend-dev'
          task: 'implement-api'
        - agent: 'database-engineer'
          task: 'design-schema'
      depends_on: 'architecture-design'

    - name: 'Integration Testing'
      agent: 'qa-engineer'
      task: 'integration-test'
      depends_on: 'parallel-implementation'
```

Ahora podía disparar un flujo de trabajo completo de desarrollo de feature con un solo comando:

```bash
/workflow feature-implementation.yml "Build user authentication system"
```

Múltiples agentes de IA especializados se coordinarían para analizar, diseñar, implementar y testear una feature completa. Todo lo que tenía que hacer era definir el workflow una vez.

## Lo que Aprendí Construyendo Este Sistema

Mirando hacia atrás en este viaje desde simples archivos markdown hasta flujos de trabajo de IA orquestados, acá están los insights clave:

### Empezá Estúpidamente Simple

No intentes construir el sistema perfecto desde el día uno. Empecé con archivos markdown en carpetas. Eso me enseñó qué necesitaba realmente antes de construir automatización compleja.

### Manual Primero, Automatizar Segundo

Entender tu flujo de trabajo manual es crucial. No podés automatizar lo que no entendés completamente. Mis semanas de copiar-pegar me enseñaron exactamente qué partes necesitaban automatización.

### Iteración Gana a Planificación

Cada etapa de este sistema evolucionó de los pain points de la etapa anterior. Organización de archivos → Personas → Scripts → Herramientas CLI → Slash commands → Subagentes → Workflows. Cada paso resolvió un problema real que estaba experimentando.

### Integración Importa Más que Features

Los momentos breakthrough no fueron sobre agregar features—fueron sobre integrar con flujos de trabajo existentes. Herramientas de línea de comando, slash commands e integración con shell hicieron la diferencia entre "demo copado" y "driver diario."

### Especialización Escala Mejor que Generalización

Un asistente de IA flexible y de propósito general se vuelve caótico con tareas complejas. Múltiples agentes especializados con expertise enfocada manejan la complejidad mucho mejor.

### No Necesitás Construir Todo de Una

Acá está lo que quiero que te lleves de esto: No necesitás construir un framework completo de orquestación de IA para obtener ganancias masivas de productividad.

Empezá con una carpeta de archivos markdown. Creá una persona o dos. Escribí un script simple de shell. Cada paso te enseñará cuál debería ser el siguiente paso.

Los equipos construyendo estos sistemas incrementalmente, aprendiendo en cada etapa, tendrán mejores sistemas que aquellos tratando de arquitecturar la solución perfecta de entrada.

La revolución empieza con crear tu primer archivo de plantilla de tarea. Todo lo demás es solo evolución natural desde ahí.

## El Framework Completo

Si querés ver la implementación completa de este sistema, he open-sourced el framework completo en GitHub: **[.ai - AI Agent Framework](https://github.com/emanuelcasco/.ai)**

El repositorio incluye:

- **Personas Pre-construidas**: Developer, Architect, Analyst, QA, DevOps, Product Owner, UX Expert, y Writer
- **Plantillas de Tareas**: Planificación de implementación, code review, estimación, debugging, y más
- **Plantillas de Documentos**: Formatos de output consistentes para specs, planes y reportes
- **Scripts de Utilidad**: Scripts de shell para automatización de workflows
- **Documentación Completa**: Guías de setup y ejemplos de uso

El framework está diseñado para ser extensible—podés forkearlo, personalizar las personas para que coincidan con la expertise de tu equipo, agregar tus propias tareas, y construir encima de él.

### Características Clave

**Generación Basada en Templates**:
- Reemplazo de placeholders para contenido dinámico
- Secciones condicionales basadas en contexto
- Bloques repetibles para output estructurado
- Instrucciones de IA embebidas para resultados consistentes

**Coordinación Multi-Agente**:
- Cada persona tiene roles y responsabilidades definidos
- Las tareas pueden referenciar otras tareas para workflows complejos
- Los agentes mantienen aislamiento de contexto para resultados enfocados

**Orquestación de Workflows**:
1. Creación de Story: Definir metas y requerimientos de alto nivel
2. Implementación: Ejecutar tareas secuencialmente con testing apropiado
3. Review y Deployment: Validar calidad y liberar

---

**Tu Próximo Paso:** Forkeá el [repositorio .ai](https://github.com/emanuelcasco/.ai), personalizá una persona para que coincida con tu estilo, y probá ejecutar una tarea. Empezá simple—quizás un code review o un plan de implementación. Después construí desde ahí.

El futuro del desarrollo asistido por IA es basado en componentes y dirigido por workflows, pero empieza con entender tus procesos manuales actuales primero.