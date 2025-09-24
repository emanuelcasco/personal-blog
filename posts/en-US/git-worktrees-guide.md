---
title: 'Git Worktrees: Guide to Parallel Development'
excerpt: 'Learn how Git worktrees can revolutionize your development workflow by enabling parallel branch development, eliminating context switching overhead, and making your Git experience more efficient.'
coverImage: '/assets/blog/git-worktrees-guide/cover.png'
date: '2025-03-03T00:00:00Z'
tags:
  [git, developer tools, workflow optimization, version control, productivity]
---

## Git Worktrees: clean, efficient branching without the mess

**TL;DR**

- Use Git Worktrees when you want multiple branches checked out at the same time without switching constantly.
- They _feel_ like having copies of your project folder, but are much more efficient.
- They help you avoid stash-hell, speed up context switching, and keep your repo tidy.

### The traditional workflow: Git Flow and stashing

Before diving into worktrees, let's quickly review how most developers handle multiple branches today.

**Git Flow** is the standard branching strategy where you:

1. Work on a feature branch
2. Need to switch to another branch (hotfix, PR review, etc.)
3. Either commit incomplete work or stash your changes
4. Switch branches with `git checkout` or `git switch`
5. Do your work
6. Switch back and unstash

![Git Flow](/assets/blog/git-worktrees-guide/img-1.png)

This workflow works, but it has friction:

```bash
# Classic stash workflow
git stash push -m "WIP: halfway through feature X"
git checkout hotfix/urgent-bug
# ... fix the bug ...
git checkout feature/my-feature
git stash pop
# ... pray nothing conflicts ...
```

![Git Stash](/assets/blog/git-worktrees-guide/img-2.png)

**The problems with stashing:**

- **Mental overhead**: remembering what you stashed, when, and why
- **Stash stack management**: multiple stashes pile up, you lose track
- **Merge conflicts**: stash pop can conflict with your current changes
- **Context loss**: you lose your mental model of what you were doing
- **Tooling issues**: IDE indexing, linters, and test watchers get confused by branch switches

**What about committing WIP?**

Some devs commit incomplete work to avoid stashing:

```bash
git add .
git commit -m "WIP: half-done feature"
git checkout hotfix/urgent-bug
# ... later ...
git checkout feature/my-feature
git reset HEAD~1  # undo WIP commit
```

This pollutes your commit history and requires cleanup later (interactive rebase, amend, etc.). Not ideal.

### How worktrees solve this

Worktrees eliminate the need for stashing or WIP commits entirely. Instead of switching branches in one folder, you have multiple folders, each with its own branch checked out:

```bash
# No stashing needed
cd ../hotfix-urgent-bug    # already on hotfix branch
# ... fix the bug ...
cd ../myrepo-feature-x     # back to feature work, exactly as you left it
```

![Git Worktrees](/assets/blog/git-worktrees-guide/img-3.png)

**Key advantages over stashing:**

| Stashing workflow                         | Worktrees workflow                             |
| ----------------------------------------- | ---------------------------------------------- |
| Save state, switch, restore               | Just `cd` to different folder                  |
| Risk of conflicts on stash pop            | No conflicts, branches are isolated            |
| Stash stack gets messy                    | Each worktree is self-contained                |
| IDE re-indexes on every branch switch     | Each worktree has its own IDE state            |
| Can't run two branches simultaneously     | Can run dev servers, tests, builds in parallel |
| Commit history pollution with WIP commits | Clean commits, no WIP needed                   |

**Real-world example:**

You're deep in a complex refactor. Suddenly, production breaks. With stashing:

```bash
git stash  # lose your mental context
git checkout hotfix
# fix bug, but now you forgot where you were in the refactor
git checkout feature
git stash pop  # hope nothing breaks
# spend 10 minutes remembering what you were doing
```

With worktrees:

```bash
cd ../myrepo-hotfix  # instantly ready, no context loss
# fix bug
cd ../myrepo-refactor  # back to exactly where you left off
```

Your IDE, terminal sessions, running processes—everything stays intact.

### What are Git Worktrees?

A Git worktree is essentially another working directory linked to the same repository. It allows you to check out different branches in separate folders, sharing the same underlying Git data.

You might think “Isn’t that just copying my project folder and working there?” — well, **yes and no**:

| Like “copy + paste project dir”                                                  | What worktrees _really_ do                                                                                          |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Separate folder per branch                                                       | Separate folder per branch                                                                                          |
| Probably duplicate all files, history, Git metadata                              | **Share the same `.git` history and object database**                                                               |
| Risk of diverging remotes, conflicts if you try to treat them as different repos | They stay in sync regarding commits, remote tracking; clean and safe workflow managed by Git itself                 |
| Wasted disk space if many branches                                               | Much less overhead — only new working directories and checkout metadata; most of the data (objects, history) reused |

So while worktrees _feel_ like multiple copies, they are more like having multiple “views” or “checkouts” of the same repo without the inefficiencies.

### Why use them

- Work on two (or more) branches at once **without stashing**.
- Easier to compare feature work in parallel (say, bugfix + feature + release prep).
- Avoid “just one more commit on branch A” before switching to branch B, then later forgetting what you changed.
- Cleaner builds/tests: isolate release build or hotfix work in a separate folder.
- Better performance and disk usage than having full clones everywhere.

### How to use worktrees

```bash
# Create a new worktree for a new branch
git worktree add ../feature/my-cool-thing feature/my-cool-thing

# Create a worktree for an existing branch
git worktree add ../bugfix/urgent bugfix/urgent

# Check the status
cd ../feature/my-cool-thing
git status

# Remove when done
git worktree remove ../bugfix/urgent
```

### My helper script: `gwts`

Using raw `git worktree` commands is fine, but I found myself repeating the same steps: creating the branch, setting up the folder, copying over local configs like `.env`, and making sure dependencies are ready.

So I wrote a tiny helper: **`gwts`**.

What it does:

1. Creates a new branch with the name you pass in.
2. Creates a worktree with a directory name in the format `<reponame>-<branchname>`.
3. Copies over `.env`, `node_modules`, and `.venv` from your main repo using `rsync` so the new worktree starts up instantly.

Example:

```bash
gwts feature/new-dashboard
```

This will:

- Create `feature/new-dashboard` branch.
- Spin up a folder `myrepo-feature-new-dashboard`.
- Copy `.env`, `node_modules`, `.venv`.
- Drop you straight into a ready-to-work environment.

That means no reinstalling dependencies, no setting up local configs, just start coding.

```bash
#!/usr/bin/env bash

set -euo pipefail

# git-wta: Create a worktree and copy .env files and node_modules via rsync
# Usage:
#   git wta <new-branch> [start-point]
# or run directly if on PATH:
#   git-wta <new-branch> [start-point]

err() {
  printf "Error: %s\n" "$*" >&2
}

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    err "Missing required command: $1"
    exit 127
  }
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
  default_base="$(
    git symbolic-ref -q --short refs/remotes/origin/HEAD 2>/dev/null || true
  )"
  default_base="${default_base#origin/}"
  base_ref="${default_base:-main}"
  git switch "$base_ref" 2>/dev/null \
    || git switch -c "$base_ref" --track "origin/$base_ref" 2>/dev/null \
    || git switch --detach
fi

# If the branch is already checked out in another active worktree, abort
if git worktree list --porcelain \
  | awk '/^branch /{print $2}' \
  | grep -qx "refs/heads/$branch"; then
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
# Copy all files specifically named ".env"
# (skip .git and node_modules trees while searching)
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
# Copy every top-level directory named node_modules (any depth),
# no recursion into them during discovery
while IFS= read -r -d '' nm_path; do
  rel="${nm_path#"$repo_root"/}"
  target="$dest_dir/$rel"
  mkdir -p "$target"
  # Trailing slashes ensure rsync copies directory contents
  # into target directory
  rsync -a "$nm_path/" "$target/"
  echo "  node_modules -> $rel"
done < <(find "$repo_root" -type d -name node_modules -prune -print0)

echo "Done. New worktree: $dest_dir"
echo "Next: cd \"$dest_dir\""
```

### Use cases

So when does this actually make a difference?

- **Pull Request reviews**
  Spin up the PR branch in its own worktree, test the changes, run builds — all without leaving your current work branch behind.

- **Hotfixes under pressure**
  A production issue comes in, but you don’t want to stash or dirty your feature branch. Just open a hotfix worktree, fix, test, push. Your ongoing changes remain untouched.

- **Experimenting with multiple solutions**
  Sometimes you’re exploring different approaches (e.g. algorithm tweaks, refactor strategies, or AI agent behaviors). Worktrees let you run parallel experiments side-by-side without tripping over each other. This is especially useful in the current “agents era,” where testing multiple approaches quickly is the norm.

- **Release prep and testing**
  Build from your release branch in one worktree, continue developing features in another. No context loss.

### Differences & pitfalls to watch out for

- **Shared Git objects**: worktrees share the same `.git` object database, so big file changes are stored only once.
- **Branch checkout rules**: you can’t check out the same branch in two worktrees. If you try, Git will complain.
- **Clean up needed**: when a worktree is no longer used, you should remove it. Otherwise you’ll accumulate folders, loose ends.
- **Remote tracking**: pushing/pulling works the same, but you must be aware which worktree you are in. Tools/scripts referencing paths must be adjusted.

### Conclusion

Git Worktrees give you much of the benefit of having multiple copies of your project directory — multiple branches worked on in parallel — but without the duplication, mess and overhead.

And if you combine them with a helper like `gwts`, you cut away even more friction: creating worktrees that are ready-to-go in seconds.

Try it for your next PR review, hotfix, or experiment — once you see how clean the workflow feels, you won’t go back.

**Remember: The future of Git workflows is parallel, not sequential. Worktrees make that future available today.**

Links:

- [Git Worktrees Documentation](https://git-scm.com/docs/git-worktree)
- [Pro Git Book](https://git-scm.com/book)
