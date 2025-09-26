---
title: 'Structured methodology for AI-assisted development'
excerpt: 'Buildup a system to make your AI workflow more efficient and consistent.'
coverImage: '/assets/blog/structured-methodology-for-ai/cover.jpg'
date: '2025-09-07T00:00:00Z'
tags: [ai, workflow, automation, development]
---

# Structured methodology for AI-assisted development

Have you ever caught yourself typing the exact same prompt for the third time this week?

You know the scenario. You open your AI chat, carefully reconstruct that perfect prompt where Claude acts like a senior architect, dump in the same context, explain the same requirements... and you realize you're essentially copy-pasting your brain every single session.

## KISS. Start with the basics.

### Reuse prompts, introducing tasks

Let's start with the most basic problem: **you keep asking your AI to do the same types of tasks**. Code reviews, implementation planning, debugging sessions. Same structure, different content.

The first step? Stop rewriting everything from scratch.

I started by creating a simple `tasks` folder with markdown files:

```
~/.ai/
└── tasks/
    ├── create-implementation-plan-task.md
    ├── estimate-task.md
    └── code-review-task.md
```

Each file became my template:

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
    - ADD | MODIFY | DELETE | RENAME | MOVE | COPY | OTHER {{file}} action description:
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

Suddenly, instead of reconstructing my prompts from memory, I'd just reference the file. Copy, paste, customize. Simple, but it worked.

**The first lesson: Don't overthink it, start with basics.**

### Adding context, enter the Persona Files

The task templates solved part of the problem, but I noticed something else. My AI interactions got drastically better when I gave the model a clear personality and expertise area.

"Act like a senior software engineer" worked, but "Act like Sarah, a senior backend engineer with 8 years of experience in distributed systems, known for thorough code reviews and emphasis on performance optimization" worked _way_ better.

So I created a `personas` folder:

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

Now my workflow became: grab a persona file, grab a task file, combine them in my prompt. The AI responses became more consistent, more focused, and frankly, more useful. Check how the Persona file links to tasks, this way I can re-use the prompts/instructions I've created already.

**The second lesson: Consistency comes from systematic personas, not ad-hoc instructions.**

## DRY. Encapsulate implementation details.

For a few weeks, this manual system was fantastic. My process looked like this:

1. Open Claude Code
2. Reference the persona file : "You are Ada, a Full Stack Developer..."
3. Reference the task file for the action I need to perform: "Your task is to conduct a code review..."
4. Add specific context: "Here's the code to review..."
5. Get great results

It worked! But it was still... manual. Copy-paste file names... And I found myself doing this same multiple times per day.

### Commands

One of the first tools I used was Claude Code [Custom Slash Commands](https://docs.anthropic.com/en/docs/claude-code/slash-commands), which allowed me to create custom commands for my personas and tasks.

For example, instead of referencing the persona file I can use a command like this `/be dev` which will fetch the content on the dev persona file and make the Claude instance assume it.

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

> You can use [Frontmatter](https://frontmatter.codes/docs/markdown) to define the command details.

Then I notice my workflow was looking like: `/be dev and execute a code review on...` or `/be architect and create implementation plan`, these tasks were references from the persona file itself so the agent could identify I defined a task file, read it and execute the action based on my instructions.

But, what if I wanted to simply execute a task? I didn't have a command to simply run a task and i found my self multiple times looking for the task file and manually referencing the path. I needed a way to simply run a task.

Execute task command:

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

Similar approach we used on the Persona command, we create a command to lookup for a task by its name and inject it on the context automatically.

**Use commands to automate manual workflow that require a specific sequence of actions.**

### Scripts

Commands work like a charm, but eventually I found my self multiple times doing this workflow:

1. Open Claude Code
2. Run command `/be <persona>` and provide some instruction.

This is ok, but I found myself doing this multiple times per day. I needed a way to simply run a command and have the AI assume the persona and execute the instruction. I wrote a simple shell script:

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

Usage:

```bash
claude-as architect code review <LINK PULL REQUEST>
```

Now as soon as I startup Claude, it has already load the necessaery context. Furthermore, this approach of appending a prompt to the system prompt worked much better than i expected so I used the same approach to load the memory files (see `claude --append-system-prompt "$system_prompt"`).

**The third lesson: Create scripts to automate repetitive tasks outside the agent.**

## The Subagent Revelation

As I used these workflows more, I noticed a problem. Long AI conversations would get... messy. My carefully crafted senior developer persona would get confused after 50 messages about different topics.

What if each task could run in its own clean environment?

This led me to experiment with subagents—basically having Claude spawn other instances of Claude for specific tasks. Each subagent gets:

- A clean context
- A specific persona
- A focused task
- Clear input/output boundaries

The main conversation stays clean while specialized agents handle specific work:

```
Main session: "I need to analyze this complex feature implementation"

→ Spawns Analysis Agent (Business Analyst persona)
→ Spawns Architecture Agent (Technical Architect persona)
→ Spawns Security Agent (Security Engineer persona)

Each works independently, reports back findings
```

**The fifth lesson: Specialization and context isolation make AI interactions more reliable and focused.**

## Parallel Processing: The Game Changer

Here's where things got really interesting. If I could spawn multiple subagents, why not run them in parallel?

Instead of researching one approach at a time, I could trigger multiple research streams:

- Agent 1: Research database optimization approaches
- Agent 2: Investigate caching strategies
- Agent 3: Explore API design patterns

All working simultaneously, each with their own expertise, reporting back when done.

This wasn't just automation anymore—this was AI team coordination.

## The Final Evolution: Workflow Orchestration

Once I had personas, tasks, slash commands, and parallel subagents working, the logical next step was obvious: orchestrate entire workflows.

Why manually coordinate multiple agents when I could define the whole process?

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

Now I could trigger an entire feature development workflow with a single command:

```bash
/workflow feature-implementation.yml "Build user authentication system"
```

Multiple specialized AI agents would coordinate to analyze, design, implement, and test a complete feature. All I had to do was define the workflow once.

## What I Learned Building This System

Looking back at this journey from simple markdown files to orchestrated AI workflows, here are the key insights:

### Start Stupidly Simple

Don't try to build the perfect system from day one. I started with markdown files in folders. That taught me what I actually needed before I built complex automation.

### Manual First, Automate Second

Understanding your manual workflow is crucial. You can't automate what you don't fully understand. My weeks of copy-pasting taught me exactly which parts needed automation.

### Iteration Beats Planning

Each stage of this system evolved from the pain points of the previous stage. File organization → Personas → Scripts → CLI tools → Slash commands → Subagents → Workflows. Each step solved a real problem I was experiencing.

### Integration Matters More Than Features

The breakthrough moments weren't about adding features—they were about integrating with existing workflows. Command line tools, slash commands, and shell integration made the difference between "cool demo" and "daily driver."

### Specialization Scales Better Than Generalization

One flexible, general-purpose AI assistant becomes chaotic with complex tasks. Multiple specialized agents with focused expertise handle complexity much better.

### You Don't Need to Build Everything at Once

Here's what I want you to take away from this: You don't need to build a complete AI orchestration framework to get massive productivity gains.

Start with a folder of markdown files. Create a persona or two. Write a simple shell script. Each step will teach you what the next step should be.

The teams building these systems incrementally, learning at each stage, will have better systems than those trying to architect the perfect solution upfront.

The revolution starts with creating your first task template file. Everything else is just natural evolution from there.

## The Complete Framework

If you want to see the complete implementation of this system, I've open-sourced the entire framework on GitHub: **[.ai - AI Agent Framework](https://github.com/emanuelcasco/.ai)**

The repository includes:

- **Pre-built Personas**: Developer, Architect, Analyst, QA, DevOps, Product Owner, UX Expert, and Writer
- **Task Templates**: Implementation planning, code review, estimation, debugging, and more
- **Document Templates**: Consistent output formats for specs, plans, and reports
- **Utility Scripts**: Shell scripts for workflow automation
- **Complete Documentation**: Setup guides and usage examples

The framework is designed to be extensible—you can fork it, customize the personas to match your team's expertise, add your own tasks, and build on top of it.

### Key Features

**Template-Driven Generation**:
- Placeholder replacement for dynamic content
- Conditional sections based on context
- Repeatable blocks for structured output
- Embedded AI instructions for consistent results

**Multi-Agent Coordination**:
- Each persona has defined roles and responsibilities
- Tasks can reference other tasks for complex workflows
- Agents maintain context isolation for focused results

**Workflow Orchestration**:
1. Story Creation: Define high-level goals and requirements
2. Implementation: Execute tasks sequentially with proper testing
3. Review and Deployment: Validate quality and release

---

**Your Next Step:** Fork the [.ai repository](https://github.com/emanuelcasco/.ai), customize a persona to match your style, and try executing one task. Start simple—maybe a code review or an implementation plan. Then build from there.

The future of AI-assisted development is component-based and workflow-driven, but it starts with understanding your current manual processes first.
