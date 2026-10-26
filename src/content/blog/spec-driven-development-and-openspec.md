---
title: "Building software with AI, specs, and OpenSpec"
description: "A teaching article on the AI-era ways of building software, the spec-driven cycle, and how OpenSpec keeps a spec beside the code."
date: 2026-10-26
tags: ["software", "ai"]
---

Coding assistants are good at finishing a thought and unreliable at remembering why the thought mattered. If the requirement lives only in a chat scrollback, the next session invents a new one. The last two years of writing about this problem has settled on a handful of named practices. They are not sealed boxes. People mix them. What follows is a map of the ones the sources actually describe, then a closer look at spec-driven development and at [OpenSpec](https://github.com/Fission-AI/OpenSpec), the lightweight spec layer that keeps an agreed behavior next to the repository.

Every command, directory name, and number below was checked against the linked source. Where a comparison sounds like a score, it is the constraint that source names, not a measurement.

## Seven practices, and they mix

Steve Yegge's March 2025 essay treats vibe coding as a stance, "the AI writes," that can sit on top of a chat or an agent. It is still worth its own section, because Andrej Karpathy's February 2025 description is a specific loop, not only an attitude. The other six are autocomplete pair programming, chat-oriented programming, agentic coding, AI-assisted test-driven development, context engineering, and spec-driven development.

![Four steps in a loop: See, Say, Run, Paste the error, then again until it mostly works.](/slides/ai-dev-approaches/vibe-coding.svg)

Vibe coding: see, say, run, paste the error, and go around again. [PNG](/slides/ai-dev-approaches/vibe-coding.png).


### Vibe coding

In February 2025 Karpathy named a way of working he called vibe coding: fully give in to the vibes, embrace exponentials, and forget that the code even exists. [Communications of the ACM](https://cacm.acm.org/news/catching-the-vibe-of-vibe-coding/) quotes him in May 2025. The loop he describes is short. You see something, you say what you want, you run it, and when it breaks you paste the error back with no comment. He accepts the diff and does not read it. The code, he says, grows beyond his usual comprehension. A [2025 study of vibe-coding sessions](https://arxiv.org/html/2506.23253v1) quotes the same post, including "I Accept All always, I don't read the diffs anymore," and then reports a more careful picture of the sessions it watched: people still alternate prompting, a rapid scan, running the app, and the occasional manual edit. Expertise shifts toward context, evaluation, and knowing when to take the keyboard back.

A weekend UI experiment is the shape this fits. You describe the screen, run it, and paste the stack trace. The tools those sources name for natural-language generation are Cursor, Replit, Windsurf, Bolt, and GitHub Copilot's agent mode. GitHub's September 2025 [Spec Kit post](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/) treats this as fine for a quick prototype and less reliable for a serious application or an existing codebase. [Thoughtworks](https://www.thoughtworks.com/en-us/insights/blog/machine-learning-and-ai/vibe-coding-context-engineering-2025-software-development), in November 2025, notes that the phrase was meant flippantly and that complacency with generated code showed up quickly.

![Four steps: Type, Suggest, Choose, Repeat. The return arrow says still your keystrokes.](/slides/ai-dev-approaches/pair-programming.svg)

Autocomplete pair programming stays on your keystrokes. [PNG](/slides/ai-dev-approaches/pair-programming.png).


### Pair programming, one line at a time

GitHub introduced Copilot in 2021 as an "AI pair programmer." The [June 2025 account](https://github.blog/news-insights/product-news/from-pair-to-peer-programmer-our-vision-for-agentic-workflows-in-github-copilot/) of that history is explicit, and it treats later agent mode and the cloud coding agent as newer, separate modes. CACM describes the first generation as autocomplete: the assistant finishes a line you had already started to type.

You are inside a function you understand. The tool offers the next line. You accept it, or you keep typing. Control stays high because every suggestion is a small, visible choice. This does not review a design. It keeps you as the author of the file.

The same CACM article summarizes a field experiment of about 5,000 developers at Microsoft, Accenture, and a Fortune 100 company. Developers given Copilot completions completed more than 25 percent more tasks. Less-experienced developers gained about 27 to 39 percent, and more senior developers about 8 to 13 percent. That is that study. It is not a promise about every codebase, and it is about completions, not about an agent that opens a pull request.

![Four steps: Prompt, Read, Revise, Test. The return arrow says ask a sharper question.](/slides/ai-dev-approaches/chat-oriented.svg)

Chat-oriented programming: prompt, read, revise, test, then ask a sharper question. [PNG](/slides/ai-dev-approaches/chat-oriented.png).


### Chat-oriented programming

Sourcegraph's July 2024 write-up calls this [chat-oriented programming](https://sourcegraph.com/blog/chat-oriented-programming-in-action): coding via iterative prompt refinement. You commission the change. You review. The assistant writes. Yegge's name for the same habit is CHOP. He separates it from agents because a chat rendezvous happens on every turn. You wait, you read, you ask again.

Ado Kukic's example is concrete. He adds a model to the Cody VS Code extension by asking where models are defined, then using an in-editor edit, then asking again when the diff is wrong. Tests, in that article, can act as a contract of correctness for the generated code. Familiarity with the code is what tells you the reply is wrong. The tools the sources name are Cody in that piece, and the in-editor chats in Copilot, Cursor, Sourcegraph, and Windsurf in Yegge's March 2025 essay. His productivity multiples in that essay are his estimates. They are not used here.

This fits a change one person can describe and check in a sitting. The model can be wrong in fluent prose. You can only catch what you still understand.

![Four steps: Delegate, Works, Review, Decide. The return arrow is another pass on the same task.](/slides/ai-dev-approaches/agentic-coding.svg)

Agentic coding: delegate, let it work, review the change, then merge or send it around again. [PNG](/slides/ai-dev-approaches/agentic-coding.png).


### Agentic coding

Anthropic's December 2024 essay [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) draws a line that is still useful. A workflow follows a path you wrote in advance. An agent is a model that directs its own process and its own tool use. A shorter line in the September 2025 context-engineering post is "LLMs autonomously using tools in a loop." The December page now notes that the tooling landscape has changed. The definitions here are from that post. Anthropic's advice in it is to start with a prompt and add an agent only when the agent beats the simpler version. Agents cost more, and errors can compound. A coding agent is a good fit when tests can check the result, and a person still has to judge whether the change fits the rest of the system. Their example is SWE-bench tasks taken from a pull-request description.

GitHub's coding agent is the worked loop. You assign an issue, or you ask from Copilot Chat. It opens a draft pull request, pushes commits, and runs tests and linters if the repository has them. You comment `@copilot` to send it around again. Branch protection still applies. The pull request needs a person's approval before CI runs. The agent does not merge its own work. GitHub's posts describe this as background work: several issues can be in flight while you do something else.

Claude Code is Anthropic's agentic coding CLI. Boris Cherny's [April 2025 best-practices post](https://www.anthropic.com/research/claude-code-best-practices) says the tool is low-level and does not force one workflow. A community pattern on that page is explore, plan, code, commit, and the first two steps matter because otherwise it jumps straight to code. The post says it is no longer the maintained copy and points at the [current Claude Code docs](https://code.claude.com/docs/en/best-practices). The workflows cited here were read from the April post.

This fits a scoped issue, a bug, a refactor, or a missing test, inside a repository that already has review rules. You delegate, then you review a change.

![Four steps: Red, Code, Green, Refactor, then the next behavior.](/slides/ai-dev-approaches/ai-assisted-tdd.svg)

AI-assisted TDD: a red test, then code, then green, then a refactor, then the next behavior. [PNG](/slides/ai-dev-approaches/ai-assisted-tdd.png).


### AI-assisted test-driven development

Classic test-driven development, as Martin Fowler records it from Kent Beck, is three steps and a list. You write a failing test, you make it pass, you refactor. The list of tests comes before the first red bar. Fowler's bliki, updated in December 2023, notes that skipping the refactor is the usual way to do it badly.

An agent does not remove the question of who writes the test. Anthropic's Claude Code post describes a loop for changes that tests can check: ask for tests from input and output pairs, run them and confirm they fail, commit the tests, then tell the agent to implement without modifying the tests until they pass. A parser with three awkward cases is the example. You write those three failing tests. The agent may only turn them green.

[Thoughtworks, in February 2026](https://www.thoughtworks.com/insights/blog/agile-engineering-practices/where-does-the-rigor-go), makes the complementary point. If the agent writes the test after the code, the test can lock in the agent's own bug. A human-written test is a target it cannot quietly move. Birgitta Böckeler's [exploratory study](https://martinfowler.com/articles/exploring-gen-ai/tdd-in-the-agent-loop.html) tried three placements: a person writes the tests, a person reviews the failing test before the agent implements, and the whole red-green loop sits inside the agent. On small greenfield business-logic tasks, with Sonnet 4.6 generating and Opus 4.8 judging, she found no clear quality win for the fully agent-run loop, and none of the runs followed TDD perfectly. She flags the sample as small. It is not a benchmark.

The practice fits behavior you can state as a failing test. The suite then becomes the contract a team reviews.

![Four steps: Gather, Select, Run, Curate. The return arrow says the next turn gets a new cut.](/slides/ai-dev-approaches/context-engineering.svg)

Context engineering: gather, select a high-signal set, run, then curate what the next turn sees. [PNG](/slides/ai-dev-approaches/context-engineering.png).


### Context engineering

Anthropic's September 2025 essay, [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), treats this as the step after prompt engineering. The question is which configuration of context is most likely to produce the behavior you want. Context is every token in the call, not only the prompt you typed. Attention cost grows with the square of the token count, and recall gets worse as the window fills. They call that failure context rot. System prompts, in the same post, have a Goldilocks altitude: too vague and the model wanders, too prescriptive and it becomes brittle.

The loop is curation on every turn. Find the smallest high-signal set. For a long task they describe compaction (summarize the thread and start again), notes kept outside the window, and sub-agents that return a short result, on the order of one or two thousand tokens. Fetching a file just in time is slower than a prepared index, and an agent can waste the window chasing a dead end. Claude Code, in that account, loads `CLAUDE.md` up front and searches for files when it needs them, instead of pasting the repository into the prompt.

Thoughtworks, in the November 2025 piece already cited, describes the same shift away from vibe coding and argues that humans still need the context too. The technologies named there include `agents.md`, Context7, Mem0, the Model Context Protocol, and agent-to-agent protocols. The post says it remains to be seen which of those standards win. OpenSpec's README says the same hygiene in one line: clear the context before implementation.

This fits a session long enough for the window to fill, and any prompt that would otherwise dump the repository. A short checked-in note is the shared form.

![Spec, Plan, and Tasks on the top row. Implement and Verify below. A blue arrow returns from Verify to Spec. A note says where OpenSpec propose, apply, and archive fit.](/slides/ai-dev-approaches/spec-driven.svg)

Spec-driven development, in miniature. The larger cycle is below. [PNG](/slides/ai-dev-approaches/spec-driven.png).


### Spec-driven development

GitHub's September 2025 post defines the practice as starting from a spec, a contract for how the code should behave, and treating that spec as the source of truth for people and for agents. Böckeler, writing on 15 October 2025 in [Understanding Spec-Driven-Development](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html), calls a spec a structured, behavior-oriented artifact, in natural language, that guides the agent. A rules file, a memory bank, or a `CLAUDE.md` is context for every session. A spec is behavior for one feature. Mixing the two is how a rules file gets treated as a specification.

"Add photo sharing" is the failure GitHub uses. The spec says who shares, what success looks like, and what must not happen. The plan then names the stack. Tasks are small enough to review. The tools in the second half of this article are GitHub Spec Kit, OpenSpec, and Kiro. The practice fits when the behavior has to stay specified after the chat scrollback is gone. OpenSpec's README states the motive directly: assistants are unpredictable when requirements live only in chat history.

## How they differ

The table is one reading of the constraints those sources name. Pace here means the speed of the loop they describe. It is not a benchmark.

| Approach | Control | Pace of the loop | What reliability depends on | Best fit | Team scale |
| --- | --- | --- | --- | --- | --- |
| Vibe coding | Low on purpose. Karpathy accepts the diff and does not read it. | Short. See, say, run, paste. | "Mostly works." GitHub finds it weak for serious apps and existing systems. The code can outgrow your understanding. | Throwaway prototypes and side projects. | One person. Shared code has no durable "why." |
| Pair programming | High. You see each suggestion and keep typing if it is wrong. | Line by line, inside the file you have open. | You are still reading the line. This does not review a whole design. | Code you are writing yourself and can judge instantly. | One editor. Team conventions stay yours. |
| Chat-oriented | You accept the reply or you ask again. Kukic: you are the reviewer. | One conversation. You wait on each reply. | You can only catch what you still understand. The model can be wrong in fluent prose. | A change you can describe and check in a sitting. | One author, then an ordinary review. |
| Agentic coding | You delegate, then review. GitHub: branch rules and human approval still apply. | Background. Several issues at once, while you do other work. | Tests check behavior. Anthropic: errors can compound, and review still has to judge the wider system. | A scoped issue, bug, refactor, or test gap. | A repo with review rules. The agent behaves like a teammate who opens a draft pull request. |
| AI-assisted TDD | Highest when a person writes the failing test and freezes it. | Extra red and green steps per behavior. | Thoughtworks: an agent-written test can ratify a bug. Böckeler: agent-run TDD was not clearly better in her small study. | Behavior you can state as a failing test first. | The suite becomes the contract the team reviews. |
| Context engineering | You choose what enters the window, or you set the rules for fetching. | Just-in-time fetch is slower than a prepared index. | Anthropic: recall drops as the window fills. A tight window beats a dumped repository. | Long agent sessions, and any prompt that would otherwise paste the repo. | Shared notes such as `CLAUDE.md`, checked in. |
| Spec-driven | You accept the spec before code. GitHub: each phase is a checkpoint. | Planning artifacts before code. Böckeler found the tools too heavy for a small bug. | Agents still skip instructions. The spec only helps if someone reads it. | A feature whose behavior must outlive the chat. GitHub names greenfield work, features in existing systems, and legacy rebuilds. | Specs can be shared. OpenSpec stores, marked beta, are a separate planning repo for several code repos. |


"Background" and "several issues" come from GitHub's pair-to-peer post and the coding-agent posts. "Too heavy for a small bug" is Böckeler's experience: one Kiro bug became 4 user stories and 16 acceptance criteria, and spec-kit was too verbose for a feature she would have sized at 3 to 5 points. OpenSpec's own pitch is that it is lighter and has no rigid phase gates. Both descriptions can be true of different tools.

## Where the sources say this is changing

These are dated claims from the pieces, not a forecast.

GitHub's June 2025 account moves Copilot from the 2021 pair programmer to agents that plan, edit, and test, with a person still able to interrupt. Anthropic, in December 2024, says to start with a prompt and add an agent only when it beats the simple version. In September 2025 the same organization says to curate context on every turn: smarter models need less prescription, and the window is still finite. GitHub's September 2025 Spec Kit post says intent becomes the source of truth, specs become executable, and code is the last mile. Böckeler, a month later, warns that the word "spec" is already fuzzy, and that sometimes people mean a long prompt. She also warns that spec-as-source resembles model-driven development with two failure modes at once, inflexibility and non-determinism. Thoughtworks, in November 2025, describes a shift from vibes toward context, with humans still critical. In February 2026 the same writer says review effort moves toward specs, tests, types, risk, and ongoing understanding, and that checking in English and deleting the code is not where things are.

Yegge's March 2025 timeline for agent fleets is his prediction. It is not used here as a fact.

A practical reading of those four claims together: use the lightest loop that still leaves a check you trust, and write something durable, a test or a spec or both, when the change will be maintained.

## Three depths, and they are not the same tool

Böckeler separates three depths, and she warns that the tools were moving fast. Her notes are from using them in September 2025. Do not update her account of Tessl past that date.

Spec-first means you write a spec and then use it for the task in front of you. Every approach she found does at least this. Spec-anchored means you keep the spec and edit it when the feature changes. OpenSpec's archive step is built for this: deltas merge into `openspec/specs`. Spec-as-source means people edit the spec only. Code is generated and not hand-edited. She saw that idea explored in the Tessl Framework, then in private beta, with a one-to-one spec-to-file mapping, a generated-from-spec comment, and regeneration that did not always produce the same code.

In her reading at the time, spec-kit looked spec-first for the life of a change rather than spec-anchored for the life of a feature, because a spec lived on a branch. Spec Kit's [current concepts page](https://github.github.io/spec-kit/concepts/sdd.html) says the project does not prescribe how teams keep `spec.md` after requirements change. Kiro, in her reading, was spec-first inside its editor. OpenSpec is the tool here that documents a merge from change deltas back into a lasting specs directory.

## The cycle

GitHub's blog names four phases and says your job at each one is to verify. The diagram adds the return trip, because a wrong spec is fixed by editing the spec and generating again.

![A loop of five phases: Spec, Plan, Tasks, Implement, and Verify. A blue arrow labeled Refine the spec returns from Verify to Spec. A note explains OpenSpec propose, apply, verify, and archive.](/slides/spec-driven-development-cycle.svg)

Spec, plan, tasks, implement, verify, then refine the spec. [SVG](/slides/spec-driven-development-cycle.svg) · [PNG](/slides/spec-driven-development-cycle.png).


The spec says what and why: who uses it, what problem it solves, what success is. User journeys and outcomes, not the stack. The plan says how: stack, architecture, constraints, legacy systems, compliance. You can ask for more than one plan. Tasks are small enough to implement and check. GitHub's example of the right size is "create a user registration endpoint that validates email format," not "build authentication." Implementation is one task at a time, so the review is that change rather than a thousand-line dump. Verification is the point of the phase. If the spec is wrong, change the spec.

The five names on the diagram are this study loop. They are not OpenSpec's five command names. The note on the diagram is the accurate mapping, and it is worth reading before using the picture as a cheat sheet. `propose` drafts the proposal, the delta specs, a design when the change needs one, and the tasks. That covers spec, plan, and tasks together, which is why OpenSpec can say "fluid not rigid" and still have artifacts. `apply` is the implementation. The `verify` command is not in the default core profile. Archive merges an accepted delta into the lasting specs and moves the folder. Archive is how the spec learns what shipped. Checking the code is a different step.

Spec Kit's September 2025 blog used the chat commands `/specify`, `/plan`, and `/tasks`, and its install line was `uvx` from the git URL. The current README uses `/speckit-constitution` once, then `/speckit-specify`, `/speckit-plan`, `/speckit-tasks`, `/speckit-implement`, and `/speckit-converge`. You repeat implement and converge until it reports `Converged`. A longer path adds clarify, checklist, and analyze. Those commands run in the agent's chat, not the terminal. Install is now `uv tool install specify-cli` and `specify init`. The documented requirements are Python 3.11+ and uv. Copilot's default syntax is the slash form. Other agents spell it differently. The README points at an integrations page for that, which is a better source than a guess. Active feature tracking lives in `.specify/feature.json`, overridable with `SPECIFY_FEATURE_DIRECTORY`. Git is not required. A git extension adds numbered branches, but checkout alone does not switch the active feature.

## Beside TDD, BDD, and a plain prompt

|   | What you write first | What done means |
| --- | --- | --- |
| Plain prompting | A chat message. GitHub's example of the failure is "add photo sharing to my app." | Whatever the model assumed. The wrong assumption often shows up late. The same post says these models are exceptional at pattern completion and not at mind reading. |
| TDD | An executable test, then code, then a refactor. The test list comes before the first red bar. | The test passes, and the structure is cleaned up. |
| BDD | A sentence of behavior. Dan North, in September 2006, replaced the word "test" because it was the source of the confusion, and built JBehave around "should." | The behavior you named is the one the system shows. In a later essay he describes scenarios as givens, events, and outcomes, in the language of the business. |
| Spec-driven | A natural-language behavior spec the agent and the person share, then a plan and tasks. | The implementation matches the spec, and the spec is what you change when the intent changes. |


Analogies with TDD and BDD are common. Böckeler adds that spec-as-source should also be compared with model-driven development. The scenario formats are not one format. OpenSpec's schema template, which `openspec validate` is written against, uses WHEN / THEN under a requirement that says SHALL or MUST. Kiro's current requirements-first docs use EARS: WHEN … THE SYSTEM SHALL. Böckeler saw GIVEN / WHEN / THEN in Kiro in September 2025. OpenSpec's concepts doc also shows a GIVEN / WHEN / THEN / AND example. Teach the schema form for OpenSpec. North's essays are about behavior, not about OpenSpec's hash-count rules.

## OpenSpec beside the code

OpenSpec is a spec framework from Fission. The README's philosophy is five lines: fluid not rigid, iterative not waterfall, easy not complex, built for brownfield and not only greenfield, and scalable from personal projects to enterprises. The [concepts doc](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md) states the first four and explains them. Fluid means no phase gates. The README's matching line is that you can update any artifact at any time. Deltas exist so a change can describe a modification of a system you already have. The concepts doc's case for deltas is clarity, fewer conflicts, a review of the change rather than the unchanged text, and a fit for brownfield work. Two changes can touch one spec if they touch different requirements.

The published site no longer serves the old concepts and slash-command URLs. The repository copies above, and the [skills page](https://openspec.dev/docs/skills), are the pages that resolve.

After `openspec init`, the tree looks like this. `specs/` is the source of truth, organized by domain. `changes/` holds one folder per proposed change. Archive merges the delta and moves the folder. The layout is from the setup and spec-driven schema docs.

```text
openspec/
├── config.yaml
├── specs/                 # current behavior
│   └── auth/spec.md
└── changes/
    ├── add-dark-mode/
    │   ├── proposal.md
    │   ├── design.md
    │   ├── tasks.md
    │   └── specs/         # the delta
    └── archive/
```

`config.yaml` is project settings and context for the agent. The schema's drafting order is proposal first, then specs and design in either order, then tasks, then apply. Design can be omitted when none of its conditions apply. A change with no behavior change sets `skip_specs: true` in `.openspec.yaml`. `openspec validate` rejects a zero-delta change without that marker. Stores, marked beta in the README, are a separate planning repo with the same `openspec/` shape, shared by git, for a feature that spans more than one code repository.

The README contrasts OpenSpec with Spec Kit, which it calls heavier, with rigid gates and a Python setup, and with Kiro, which it describes as locked to their IDE and to Claude. Kiro's own docs now list IDE, CLI, and Web. That lock-in sentence is OpenSpec's comparison, not Kiro's current capability list. The table later in this article uses each project's own docs.

Install, from the README, is the binary install script, `npm install -g @fission-ai/openspec@latest` on Node.js 20.19.0 or newer, or `brew install openspec`. The README also mentions pnpm, yarn, bun, and Nix. `openspec update` refreshes the instruction files inside a project. `openspec install` upgrades the standalone CLI. The README recommends Codex 5.5 and Opus 4.7 for planning and implementation. That is the project's recommendation, not a measured result. It also says to clear context before implementation.

### The default path

The [quickstart](https://openspec.dev/docs/quickstart) is five steps in the agent's chat: explore, propose, review, apply, archive. Review is you, reading `proposal.md`, then `specs/`, then `tasks.md`. A fresh chat before apply is recommended, because implementation goes better on a clean window.

Explore, if the idea is still fuzzy. It reads the code and writes nothing unless you ask. Propose stops at the plan. Apply checks off `tasks.md`. Ask again to resume at the first unchecked box. Progress is the checkboxes. Archive, once the boxes are checked, lets the specs absorb the change and moves the folder under `changes/archive/` with a date prefix.

The default profile is `core`: explore, propose, apply, update, sync, and archive. The expanded set, after `openspec config profile` and then `openspec update`, adds new, continue, ff, verify, bulk-archive, and onboard. `openspec config profile` is global per machine. Other projects pick it up on their next `openspec update`. Verify checks that the implementation matches the artifacts. It changes nothing and it does not archive.

The CLI and the chat commands are different surfaces.

```bash
openspec init --tools cursor
openspec new change add-dark-mode
openspec status --change add-dark-mode
openspec validate
openspec archive add-dark-mode -y
```

```text
/opsx:propose add-dark-mode
/opsx:apply
/opsx:archive
```

`openspec new change` creates only `.openspec.yaml`, with the schema and the created date. It does not write the four artifacts. `openspec status --change` tells you the next artifact. Tasks stay blocked until specs and design exist. When planning is complete, the next line points at `openspec instructions apply`. `openspec archive` without a name prompts, and outside a terminal it exits 1. `-y` answers the confirmations. `--skip-specs` archives without touching the main specs. Declining the spec update still archives, and leaves the specs alone. A validation failure blocks archive unless you pass `--no-validate`. Incomplete tasks warn, and `-y` continues.

`/opsx:sync` merges delta specs into the main specs. It does not move the folder. `openspec archive` does both. Git is separate: commit the change folder with the code. OpenSpec does not prune the archive. You can delete an archived change's `specs/` after the merge is committed, if Git is your history. `openspec validate --archived` checks task completion, not the applied deltas.

The README says it supports 30+ tools and that `openspec init` prints the right spelling. The canonical chat name is `/opsx:propose`. Cursor and GitHub Copilot use `/opsx-propose`. Claude Code uses the colon form. Codex uses `$openspec-propose`. Amazon Q, in the README, uses `@opsx-propose`. The same workflows also install as skills, for example `/openspec-apply-change`. The [skills page](https://openspec.dev/docs/skills) is the published list. The [slash-command writeup](https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md) lives in the repository. Skills and commands carry the same instructions. The docs prefer skills and expect commands to be retired later.

`openspec init` asks which tools you use. `--tools cursor,claude` skips the picker. `--tools none` writes only the OpenSpec folder. Restart the editor after init. Re-running init prints Refreshed for tools already set up. The setup doc's example completion line is "Created: Claude Code / 6 skills and 6 commands." If Claude Code does not list the commands, the setup doc says `openspec update`, and if needed `openspec config set delivery both`.

| Tool | What you type for apply | Where init writes |
| --- | --- | --- |
| Cursor | `/opsx-apply` or the skill `/openspec-apply-change` | `.cursor/commands/` and `.cursor/skills/` |
| Claude Code | `/opsx:apply` or `/openspec-apply-change` | `.claude/commands/opsx/` and `.claude/skills/` |
| GitHub Copilot | `/opsx-apply` or the skill form | `.github/prompts/` and `.github/skills/` |
| Codex | `$openspec-apply-change`. Commands are not generated. | `.agents/skills/` |


Propose, explore, archive, and the rest use the same shape. The full matrix is the [supported-tools page](https://openspec.dev/docs/supported-tools).

The README's "see it in action" transcript uses `/opsx:explore`, `/opsx:propose add-dark-mode`, `/opsx:apply`, and `/opsx:archive`, and shows the archive landing at `openspec/changes/archive/2025-01-23-add-dark-mode`. That transcript is illustrative. The assistant replies are the project's demo, not a guaranteed session.

### A worked change

The proposal and delta below are study text, written in the documented template. They are not files from the OpenSpec repository. The dark-mode story, and the requirement sentence, are the ones in the README. The Purpose line is study text written long enough to satisfy the schema's guidance for a new capability.

```markdown
# Proposal

## Why
The app has a single theme. People using it at night have asked for a dark one.

## What Changes
- Add a theme control that follows the system preference until a person chooses.

## Capabilities
### New Capabilities
- ui: theme selection for the application shell

### Modified Capabilities

## Impact
Styling and a small piece of client state. No new dependency.
```

The template sections are Why, What Changes, Capabilities, and Impact. A capability name becomes `specs/<capability-path>/spec.md`. Implementation detail belongs in `design.md`. The Capabilities section is the contract with the specs phase. Before filling it in, the instructions say to run `openspec list --specs`, then `openspec show` for related specs. `openspec list` without `--specs` lists in-flight changes, not the capability inventory. New capabilities use kebab-case path segments. Modified capabilities must be existing paths whose requirements change, not merely whose code changes. Mark breaking changes with BREAKING in What Changes. Keep the proposal to about one or two pages.

```markdown
# Spec Delta

## Purpose
Lets a person choose a light or dark theme and keep that choice on this device.

## ADDED Requirements

### Requirement: Theme selection
The app SHALL let users switch between light and dark themes,
defaulting to the system preference.

#### Scenario: User toggles dark mode
- **WHEN** the user clicks the theme toggle
- **THEN** the app switches to dark mode and persists the choice
```

A new capability wants a Purpose. Archive copies it into the new main spec. Skip it and the main spec is left with a TBD placeholder. A delta for an existing capability must not add a new Purpose. Edit the main spec's Purpose directly. The concepts doc ignores a Purpose on an existing spec.

Other delta sections are `MODIFIED`, `REMOVED`, and `RENAMED`. A modified requirement is the entire existing requirement, pasted and then edited. A partial paste loses detail on archive, because the header match replaces the whole block. A removal includes Reason and Migration. A rename uses FROM and TO. Scenarios use exactly four hashes. Three hashes fail silently. Every requirement needs at least one scenario. Normative lines use SHALL or MUST. `openspec validate` checks the structure. `--strict` also fails a requirement description over 500 characters, and a Purpose under 50.

On archive, ADDED is appended, MODIFIED replaces the requirement whose header matches, and REMOVED is deleted. Removing the last requirement retires the capability and deletes `spec.md` only if the change sets `retire_capabilities: true`. Otherwise archive aborts. Delta sections in files other than `specs/<capability>/spec.md` are not merged.

Before archive, `openspec/specs` does not yet mention the theme. The delta sits inside the change folder. After archive, added requirements are appended, modified ones replace the old block, and removed ones are dropped. The whole change folder, delta included, moves under `changes/archive/` with the date prefixed. The quickstart's pictures use `add-rate-limiting`. A sample CLI transcript uses `add-rate-limit` and reports `Change 'add-rate-limit' archived as '2026-08-11-add-rate-limit'`. Same date-prefix pattern, two example names.

### OpenSpec, Spec Kit, and Kiro

|   | OpenSpec | Spec Kit | Kiro |
| --- | --- | --- | --- |
| Start | `openspec init` | `specify init` with an integration | Create a spec in Kiro's pane, CLI, or web |
| Default flow | explore, propose, apply, archive | constitution once, then specify, plan, tasks, implement, converge | requirements or bug analysis, design, tasks |
| Files | `openspec/specs` and `openspec/changes` | Feature state under the directory in `.specify/feature.json` | `requirements.md`, `design.md`, `tasks.md` in `.kiro/specs/` |
| Behavior language | SHALL / MUST, WHEN / THEN scenarios | Specify is what and why. The plan is where the stack goes. | Current docs: EARS, WHEN … THE SYSTEM SHALL. Also bugfix specs and Quick Spec. |
| After the change | Archive merges the delta into the main specs. | The concepts page does not prescribe how you keep `spec.md` afterward. | Three files per spec. The docs shown here do not describe a cross-feature merge. |


Böckeler's October 2025 article is the published comparison of Kiro, spec-kit, and Tessl. Use it for the three depths. Use each project's current docs for commands.

Kiro's [specs docs](https://kiro.dev/docs/specs/) describe feature specs, bugfix specs, Quick Spec, and parallel task execution on IDE, CLI, and Web. Correctness via property-based testing is IDE only. Analyze requirements is IDE and CLI. Quick Spec generates all three files with no approval gates, after clarifying questions. Requirements-first is for when you have the behavior and the design can flex. Tasks can run one at a time or all at once. Parallel execution builds a dependency graph and runs independent tasks in waves. Spec Kit's concepts page also separates greenfield, creative exploration, and brownfield, and points at contract-driven development when a component has external consumers.

## When the spec is worth writing

The sources say it helps when you and the agent agree before code, which is OpenSpec's line. GitHub names three situations: greenfield work, a feature in a system that already exists, and a legacy rebuild where the original intent is gone. A brownfield edit is a particularly good fit for a delta, because the delta shows the change. Security, compliance, and design-system rules have somewhere the agent will actually read.

The sources also say where it hurts. A small bug can become a sledgehammer. Böckeler's word for one Kiro run is exactly that: 4 user stories and 16 acceptance criteria. A modest feature can produce a pile of markdown she would rather have reviewed as code, and in one spec-kit run the agent ignored research notes and regenerated classes that already existed. A longer context window does not mean the agent uses everything in it, which is how a spec creates a false sense of control. Spec-as-source, if it inherits model-driven development's overhead and the model's non-determinism together, can make the artifact worse while trying to improve it. Her word for that is Verschlimmbesserung. She also asks who these workflows are for. The demos assume a developer writes the user stories. That may be the wrong person for a large, unclear feature. Her conclusion is still that spec-first is valuable, and that the term is semantically diffused.

OpenSpec's documented escape for a refactor, a tooling change, or a docs-only change with no behavior change is `skip_specs: true`. Inventing a requirement so validation will pass is the failure that marker exists to avoid.

If you want to try the lightest serious version this week, the sequence is short. Pick the lightest loop that still leaves a check: a line suggestion, a chat edit, an agent with a draft pull request, a failing test, or a spec. Anthropic's December 2024 advice is to add machinery only when the simpler version is not enough. If the session will be long, write the context down, a short `CLAUDE.md` or the equivalent, rather than pasting the repository into the prompt.

Then, if the change needs a spec:

1. Install OpenSpec from the README.
2. In the repo, run `openspec init --tools cursor` (or `claude`, or the picker) and restart the editor.
3. Explore, or run `/opsx:propose` with a kebab-case name. On Cursor the command is `/opsx-propose`.
4. Read the proposal, the specs, then the tasks. Edit the markdown yourself if the agent missed a case. No code yet.
5. Open a new chat. Apply. If it stops, apply again. It resumes at the first unchecked task.
6. Run `openspec validate`, then archive. Commit the spec with the code.
7. For a pure refactor, set `skip_specs: true` instead of faking a requirement.
8. Turn on the expanded profile only when you want `/opsx:verify` before archive.

## References

OpenSpec: [repository and README](https://github.com/Fission-AI/OpenSpec), [openspec.dev](https://openspec.dev/), [quickstart](https://openspec.dev/docs/quickstart), [setup](https://openspec.dev/docs/setup), [CLI](https://openspec.dev/docs/cli), [slash commands in the repo](https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md), [skills](https://openspec.dev/docs/skills), [supported tools](https://openspec.dev/docs/supported-tools), [spec-driven schema](https://openspec.dev/docs/schemas/spec-driven), [concepts in the repo](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md).

Spec Kit and Kiro: [Spec Kit repository](https://github.com/github/spec-kit), [what SDD is](https://github.github.io/spec-kit/concepts/sdd.html), [GitHub Blog, 2 September 2025](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/), [Kiro specs](https://kiro.dev/docs/specs/), [requirements-first](https://kiro.dev/docs/specs/feature-specs/requirements-first/), [Quick Spec](https://kiro.dev/docs/specs/quick-spec/).

Essays: [Böckeler on spec-driven development, 15 October 2025](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html), [Böckeler on TDD in the agent loop](https://martinfowler.com/articles/exploring-gen-ai/tdd-in-the-agent-loop.html), [Fowler, Test-Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html), [Dan North, Introducing BDD, 2006](https://dannorth.net/blog/introducing-bdd/), [Dan North, BDD with intent](https://dannorth.net/blog/bdd-with-intent/).

Vibe coding, agents, tests, and context: [CACM, Catching the Vibe of Vibe Coding, 6 May 2025](https://cacm.acm.org/news/catching-the-vibe-of-vibe-coding/), [arXiv:2506.23253](https://arxiv.org/html/2506.23253v1), [GitHub, from pair to peer, 25 June 2025](https://github.blog/news-insights/product-news/from-pair-to-peer-programmer-our-vision-for-agentic-workflows-in-github-copilot/), [GitHub, meet the coding agent](https://github.blog/news-insights/product-news/github-copilot-meet-the-new-coding-agent/), [GitHub, coding agent 101](https://github.blog/ai-and-ml/github-copilot/github-copilot-coding-agent-101-getting-started-with-agentic-workflows-on-github/), [Sourcegraph, chat-oriented programming, 27 July 2024](https://sourcegraph.com/blog/chat-oriented-programming-in-action), [Yegge, Revenge of the junior developer, 22 March 2025](https://sourcegraph.com/blog/revenge-of-the-junior-developer), [Anthropic, Building effective agents, 19 December 2024](https://www.anthropic.com/engineering/building-effective-agents), [Anthropic, context engineering, 29 September 2025](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), [Anthropic, Claude Code best practices, 18 April 2025](https://www.anthropic.com/research/claude-code-best-practices), [Claude Code docs, current best practices](https://code.claude.com/docs/en/best-practices), [Thoughtworks, from vibe coding to context engineering, 5 November 2025](https://www.thoughtworks.com/en-us/insights/blog/machine-learning-and-ai/vibe-coding-context-engineering-2025-software-development), [Thoughtworks, Where does the rigor go?, 20 February 2026](https://www.thoughtworks.com/insights/blog/agile-engineering-practices/where-does-the-rigor-go).

Diagrams: [the cycle](/slides/spec-driven-development-cycle.svg) and the [approach diagrams](/slides/ai-dev-approaches/vibe-coding.svg), each with a PNG beside the SVG.
