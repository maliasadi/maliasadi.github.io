---
title: "Building software with AI, specs, and OpenSpec"
description: "Agents, specs, and the OpenSpec change loop."
date: 2026-10-26
tags: ["software", "ai"]
---

I have been keeping notes on coding agents, and on what still has to hold in review. The practices below are the ones the sources describe. The detail is spec-driven development, and OpenSpec.

Paths, commands, and numbers come from the linked pages. The comparison is the constraint each source names. It is not a measurement.

Steve Yegge's March 2025 essay treats vibe coding as a stance. The AI writes. That stance can sit on a chat or on an agent. Karpathy's February 2025 description is a loop, so it gets its own note. The other practices are autocomplete, chat-oriented programming, agentic coding, AI-assisted test-driven development, context engineering, and spec-driven development. People mix them.

![Four steps in a loop: See, Say, Run, Paste the error, then again until it mostly works.](/slides/ai-dev-approaches/vibe-coding.svg)

See, say, run, paste the error. [PNG](/slides/ai-dev-approaches/vibe-coding.png).

Karpathy's line, quoted by [Communications of the ACM](https://cacm.acm.org/news/catching-the-vibe-of-vibe-coding/) in May 2025, is to give in to the vibes and forget that the code exists. He accepts the diff and does not read it. The motion is see, say, run, and paste the error back with no comment. The code grows past ordinary comprehension.

A [2025 study of those sessions](https://arxiv.org/html/2506.23253v1) quotes the same post, including "I Accept All always, I don't read the diffs anymore." The sessions it watched are tighter than the slogan. Prompt, a rapid scan, a run, a manual edit. What moves is judgment: context, evaluation, and when to take the keyboard back.

The tools those pages name are Cursor, Replit, Windsurf, Bolt, and GitHub Copilot's agent mode. A weekend UI is the shape that fits. Describe the screen, run it, paste the stack trace. [GitHub's September 2025 Spec Kit post](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/) puts this on a prototype, and off a serious application or an existing codebase. [Thoughtworks](https://www.thoughtworks.com/en-us/insights/blog/machine-learning-and-ai/vibe-coding-context-engineering-2025-software-development), in November 2025, says the phrase was meant flippantly, and that complacency with generated code showed up quickly.

On a team the failure is review. The diff was accepted unread, and there is no durable why. A large codebase is the case GitHub already marks as weak. Maintainership has nothing to attach to once the chat is gone.

![Four steps: Type, Suggest, Choose, Repeat. The return arrow says still your keystrokes.](/slides/ai-dev-approaches/pair-programming.svg)

Type, suggestion, choose, repeat. The keystrokes stay yours. [PNG](/slides/ai-dev-approaches/pair-programming.png).

GitHub introduced Copilot in 2021 as an "AI pair programmer." The [June 2025 account](https://github.blog/news-insights/product-news/from-pair-to-peer-programmer-our-vision-for-agentic-workflows-in-github-copilot/) is explicit, and it treats later agent mode and the cloud coding agent as separate loops. CACM describes the first generation as autocomplete. The assistant finishes a line already under way.

Control stays on the line. Accept it, or keep typing. This does not review a design, and it does not govern a change that spans a codebase. Team conventions stay with the author. The failure mode is treating a later agent, the one that opens a pull request, as this same loop.

The same CACM piece summarizes a field experiment of about 5,000 developers at Microsoft, Accenture, and a Fortune 100 company. Copilot completions raised completed tasks by more than 25 percent. Less-experienced developers gained about 27 to 39 percent. Senior developers gained about 8 to 13 percent. That is that study of completions. It is not a claim about every codebase, and it is not a claim about an agent.

![Four steps: Prompt, Read, Revise, Test. The return arrow says ask a sharper question.](/slides/ai-dev-approaches/chat-oriented.svg)

Prompt, read, revise, test, ask again. [PNG](/slides/ai-dev-approaches/chat-oriented.png).

Sourcegraph, July 2024, calls this [chat-oriented programming](https://sourcegraph.com/blog/chat-oriented-programming-in-action): coding by iterative prompt refinement. The person commissions the change and reviews it. The assistant writes. Yegge's name is CHOP. He separates chat from agents because a chat rendezvous happens on every turn.

Ado Kukic's example is adding a model to the Cody VS Code extension. Ask where models are defined, take the in-editor edit, ask again when the diff is wrong. Tests, in that piece, can act as a contract of correctness. Familiarity with the code is what makes a fluent wrong answer visible. The tools named are Cody there, and the in-editor chats in Copilot, Cursor, Sourcegraph, and Windsurf in Yegge's March 2025 essay. His productivity multiples are his estimates. They are not used here.

This holds for a change one person can describe and check in a sitting, then put through ordinary review. It breaks when the reviewer no longer knows the code well enough to catch the reply. On a large codebase that is the default, not the exception. The model can be wrong in prose that reads as finished.

![Four steps: Delegate, Works, Review, Decide. The return arrow is another pass on the same task.](/slides/ai-dev-approaches/agentic-coding.svg)

Delegate, let it work, review, merge or send it back. [PNG](/slides/ai-dev-approaches/agentic-coding.png).

Anthropic, December 2024, [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents): a workflow follows a path written in advance. An agent directs its own process and its own tools. The September 2025 context post shortens that to LLMs using tools in a loop. The December page now says the tooling landscape has changed. The definitions here are from that post. Start with a prompt. Add an agent only when it beats the simpler version. Agents cost more, and errors compound. A coding agent fits when tests can check the result. A person still has to judge whether the change fits the rest of the system. Their example is SWE-bench tasks taken from a pull-request description.

GitHub's coding agent is the loop that meets review and CI. Assign an issue, or ask from Copilot Chat. It opens a draft pull request, pushes commits, and runs tests and linters if the repository has them. `@copilot` sends it around again. Branch protection still applies. The pull request needs a person's approval before CI runs. The agent does not merge its own work. The posts describe this as background work: several issues in flight while other work continues. "Background" and "several issues" are from those posts, not a timed benchmark.

Claude Code is Anthropic's agentic coding CLI. Boris Cherny's [April 2025 post](https://www.anthropic.com/research/claude-code-best-practices) says the tool is low-level and does not force one workflow. A community pattern there is explore, plan, code, commit. The first two steps matter, because otherwise it jumps to code. The post says it is no longer the maintained copy and points at the [current Claude Code docs](https://code.claude.com/docs/en/best-practices). The workflows here were read from the April post.

The fit is a scoped issue, bug, refactor, or test gap, in a repo that already has review rules. The agent behaves like a teammate who opens a draft pull request. It breaks when the task is not checkable, when the sandbox is not trusted, or when review cannot judge system fit. Compounding errors are the failure Anthropic names. A draft that is rubber-stamped is the failure the GitHub loop is built to refuse.

![Four steps: Red, Code, Green, Refactor, then the next behavior.](/slides/ai-dev-approaches/ai-assisted-tdd.svg)

Red, code, green, refactor, then the next behavior. [PNG](/slides/ai-dev-approaches/ai-assisted-tdd.png).

Martin Fowler's bliki, updated December 2023, records Kent Beck's three steps and a list. Write a failing test, make it pass, refactor. The list comes before the first red bar. The original page is 5 March 2005. Skipping the refactor is the usual way to do it badly. The suite is what a team can review when the diff is too large to read line by line.

An agent does not settle who writes the test. Anthropic's Claude Code post, for changes tests can check: ask for tests from input and output pairs, run them and confirm they fail, commit the tests, then implement without modifying the tests until they pass. A parser with three awkward cases is the example. A person writes the three failing tests. The agent may only turn them green.

[Thoughtworks, February 2026](https://www.thoughtworks.com/insights/blog/agile-engineering-practices/where-does-the-rigor-go): if the agent writes the test after the code, the test can lock in the agent's own bug. A human-written test is a target it cannot quietly move. Birgitta Böckeler's [exploratory study](https://martinfowler.com/articles/exploring-gen-ai/tdd-in-the-agent-loop.html) tried three placements. A person writes the tests. A person reviews the failing test before implementation. The whole red-green loop sits inside the agent. On small greenfield business-logic tasks, Sonnet 4.6 generated and Opus 4.8 judged. She found no clear quality win for the fully agent-run loop, and none of the runs followed TDD perfectly. The sample is small. It is not a benchmark.

The practice fits behavior that can be stated as a failing test first. The highest control is a frozen human test. It breaks when the agent is allowed to edit the test to get to green, and when the refactor is skipped and the suite ratifies a mess.

![Four steps: Gather, Select, Run, Curate. The return arrow says the next turn gets a new cut.](/slides/ai-dev-approaches/context-engineering.svg)

Gather, select, run, then cut the next turn. [PNG](/slides/ai-dev-approaches/context-engineering.png).

Anthropic, 29 September 2025, [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents). After prompt engineering, the question is which context is most likely to produce the behavior you want. Context is every token in the call, not only the prompt. Attention cost grows with the square of the token count. Recall gets worse as the window fills. They call that context rot. System prompts have a Goldilocks altitude. Too vague and the model wanders. Too prescriptive and it turns brittle.

Curate on every turn. Keep the smallest high-signal set. For a long task they describe compaction, a summary and a restart, notes outside the window, and sub-agents that return a short result, on the order of one or two thousand tokens. Just-in-time fetch is slower than a prepared index, and an agent can waste the window on a dead end. Claude Code, in that account, loads `CLAUDE.md` up front and searches for files when it needs them.

Thoughtworks, in the November 2025 piece, describes the shift away from vibe coding and says humans still need the context. The names there are `agents.md`, Context7, Mem0, the Model Context Protocol, and agent-to-agent protocols. It remains to be seen which standards win. OpenSpec's README says the same hygiene in one line: clear the context before implementation.

This is the governance layer for a long session and for any prompt that would paste a repository. A checked-in note is the shared form. The failure on a large codebase is the dump, or a fetch loop that fills the window before the change is specified. A tight window beats a dumped tree. Pace suffers when every fact is fetched just in time.

![Spec, Plan, and Tasks on the top row. Implement and Verify below. A blue arrow returns from Verify to Spec. A note says where OpenSpec propose, apply, and archive fit.](/slides/ai-dev-approaches/spec-driven.svg)

Spec, plan, tasks, implement, verify, then back to the spec. [PNG](/slides/ai-dev-approaches/spec-driven.png). The larger cycle is below.

GitHub, 2 September 2025: start from a spec, a contract for how the code should behave, and treat it as the source of truth for people and for agents. Böckeler, 15 October 2025, [Understanding Spec-Driven-Development](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html): a structured, behavior-oriented artifact, in natural language, that guides the agent. A rules file, a memory bank, or a `CLAUDE.md` is context for every session. A spec is behavior for one feature. Mixing the two is how a rules file gets treated as a specification.

"Add photo sharing" is the failure GitHub uses. The spec says who shares, what success looks like, and what must not happen. The plan names the stack. Tasks are small enough to review. The same post says these models are exceptional at pattern completion and not at mind reading. The tools in the rest of these notes are GitHub Spec Kit, OpenSpec, and Kiro. The practice fits when the behavior has to outlive the chat scrollback. OpenSpec's README: assistants are unpredictable when requirements live only in chat history.

The differences, as those sources describe them:

| Approach | Control | Pace of the loop | What reliability depends on | Best fit | Team scale |
| --- | --- | --- | --- | --- | --- |
| Vibe coding | Low on purpose. Karpathy accepts the diff and does not read it. | Short. See, say, run, paste. | "Mostly works." GitHub finds it weak for serious apps and existing systems. The code can outgrow your understanding. | Throwaway prototypes and side projects. | One person. Shared code has no durable "why." |
| Pair programming | High. You see each suggestion and keep typing if it is wrong. | Line by line, inside the file you have open. | You are still reading the line. This does not review a whole design. | Code you are writing yourself and can judge instantly. | One editor. Team conventions stay yours. |
| Chat-oriented | You accept the reply or you ask again. Kukic: you are the reviewer. | One conversation. You wait on each reply. | You can only catch what you still understand. The model can be wrong in fluent prose. | A change you can describe and check in a sitting. | One author, then an ordinary review. |
| Agentic coding | You delegate, then review. GitHub: branch rules and human approval still apply. | Background. Several issues at once, while you do other work. | Tests check behavior. Anthropic: errors can compound, and review still has to judge the wider system. | A scoped issue, bug, refactor, or test gap. | A repo with review rules. The agent behaves like a teammate who opens a draft pull request. |
| AI-assisted TDD | Highest when a person writes the failing test and freezes it. | Extra red and green steps per behavior. | Thoughtworks: an agent-written test can ratify a bug. Böckeler: agent-run TDD was not clearly better in her small study. | Behavior you can state as a failing test first. | The suite becomes the contract the team reviews. |
| Context engineering | You choose what enters the window, or you set the rules for fetching. | Just-in-time fetch is slower than a prepared index. | Anthropic: recall drops as the window fills. A tight window beats a dumped repository. | Long agent sessions, and any prompt that would otherwise paste the repo. | Shared notes such as `CLAUDE.md`, checked in. |
| Spec-driven | You accept the spec before code. GitHub: each phase is a checkpoint. | Planning artifacts before code. Böckeler found the tools too heavy for a small bug. | Agents still skip instructions. The spec only helps if someone reads it. | A feature whose behavior must outlive the chat. GitHub names greenfield work, features in existing systems, and legacy rebuilds. | Specs can be shared. OpenSpec stores, marked beta, are a separate planning repo for several code repos. |

"Too heavy for a small bug" is Böckeler's experience. One Kiro bug became 4 user stories and 16 acceptance criteria. Spec-kit was too verbose for a feature she would have sized at 3 to 5 points. OpenSpec's own pitch is that it is lighter and has no rigid phase gates. Both can be true of different tools.

The dated claims, not a forecast. GitHub, June 2025, moves Copilot from the 2021 pair programmer to agents that plan, edit, and test, with a person still able to interrupt. Anthropic, December 2024, says to start with a prompt and add an agent only when it beats the simple version. In September 2025 the same organization says to curate context on every turn. Smarter models need less prescription. The window is still finite. GitHub, September 2025, says intent becomes the source of truth, specs become executable, and code is the last mile. Böckeler, a month later, says the word "spec" is already fuzzy, and that sometimes people mean a long prompt. Spec-as-source, in her reading, resembles model-driven development with inflexibility and non-determinism together. Thoughtworks, November 2025, describes a shift from vibes toward context, with humans still critical. In February 2026 the same writer says review effort moves toward specs, tests, types, risk, and ongoing understanding. Checking in English and deleting the code is not where that piece says things are.

Yegge's March 2025 timeline for agent fleets is his prediction. It is not used here as a fact. A practical reading of those four claims: use the lightest loop that still leaves a check, and write a test or a spec, or both, when the change will be maintained. That sentence is a reading. It is not one of the sources.

Böckeler separates three depths. Her notes are from using the tools in September 2025, and she warns they were moving fast. Do not update her account of Tessl past that date.

Spec-first: write a spec, then use it for the task in front of you. Every approach she found does at least this. Spec-anchored: keep the spec and edit it when the feature changes. OpenSpec's archive step is built for this. Deltas merge into `openspec/specs`. Spec-as-source: people edit the spec only. Code is generated and not hand-edited. She saw that explored in the Tessl Framework, then in private beta, with a one-to-one spec-to-file mapping, a generated-from-spec comment, and regeneration that did not always produce the same code.

In her reading then, spec-kit looked spec-first for the life of a change, not spec-anchored for the life of a feature, because a spec lived on a branch. Spec Kit's [current concepts page](https://github.github.io/spec-kit/concepts/sdd.html) does not prescribe how teams keep `spec.md` after requirements change. Kiro, in her reading, was spec-first inside its editor. OpenSpec is the tool here that documents a merge from change deltas back into a lasting specs directory. That is the maintainability difference. A spec that dies with the branch does not govern the next change.

![A loop of five phases: Spec, Plan, Tasks, Implement, and Verify. A blue arrow labeled Refine the spec returns from Verify to Spec. A note explains OpenSpec propose, apply, verify, and archive.](/slides/spec-driven-development-cycle.svg)

Spec, plan, tasks, implement, verify, then refine the spec. [SVG](/slides/spec-driven-development-cycle.svg). [PNG](/slides/spec-driven-development-cycle.png).

GitHub's blog names four phases and says the job at each one is to verify. The diagram adds the return, because a wrong spec is fixed by editing the spec and generating again.

The spec is what and why. Who uses it, what problem it solves, what success is. Journeys and outcomes, not the stack. The plan is how. Stack, architecture, constraints, legacy systems, compliance. More than one plan is allowed. Tasks are small enough to implement and check. GitHub's example of the right size is "create a user registration endpoint that validates email format," not "build authentication." Implementation is one task. Review is that change, not a thousand-line dump. If the spec is wrong, change the spec.

The five names on the diagram are this loop. They are not OpenSpec's command names. Read the note on the diagram before using it as a command map. `propose` drafts the proposal, the delta specs, a design when the change needs one, and the tasks. That is spec, plan, and tasks together, which is how OpenSpec can say "fluid not rigid" and still have artifacts. `apply` is implementation. The `verify` command is not in the default core profile. Archive merges an accepted delta into the lasting specs and moves the folder. Archive is how the spec learns what shipped. Checking the code is a different step. Human review of the plan happens before apply. If the plan is wrong mid-implementation, the quickstart says fix the artifacts and keep applying. Progress lives in the `tasks.md` checkboxes.

Spec Kit's September 2025 blog used `/specify`, `/plan`, and `/tasks`, and its install line was `uvx` from the git URL. The current README uses `/speckit-constitution` once, then `/speckit-specify`, `/speckit-plan`, `/speckit-tasks`, `/speckit-implement`, and `/speckit-converge`. Repeat implement and converge until it reports `Converged`. A longer path adds clarify, checklist, and analyze. Those commands run in the agent's chat, not the terminal. Install is `uv tool install specify-cli`, then `specify init`. Python 3.11+ and uv. Copilot's default syntax is the slash form. Other agents spell it differently. The README points at an integrations page. Active feature tracking is `.specify/feature.json`, overridable with `SPECIFY_FEATURE_DIRECTORY`. Git is not required. A git extension adds numbered branches. Checkout alone does not switch the active feature. The concepts page also separates greenfield, creative exploration, and brownfield, and points at contract-driven development when a component has external consumers.

|  | What you write first | What done means |
| --- | --- | --- |
| Plain prompting | A chat message. GitHub's example of the failure is "add photo sharing to my app." | Whatever the model assumed. The wrong assumption often shows up late. |
| TDD | An executable test, then code, then a refactor. The test list comes before the first red bar. | The test passes, and the structure is cleaned up. |
| BDD | A sentence of behavior. Dan North, in September 2006, replaced the word "test" because it was the source of the confusion, and built JBehave around "should." | The behavior you named is the one the system shows. In a later essay he describes scenarios as givens, events, and outcomes, in the language of the business. |
| Spec-driven | A natural-language behavior spec the agent and the person share, then a plan and tasks. | The implementation matches the spec, and the spec is what you change when the intent changes. |

Analogies with TDD and BDD are common. Böckeler adds that spec-as-source should also be compared with model-driven development. The scenario formats are not one format. OpenSpec's schema template, which `openspec validate` is written against, uses WHEN / THEN under a requirement that says SHALL or MUST. Kiro's current requirements-first docs use EARS: WHEN … THE SYSTEM SHALL. Böckeler saw GIVEN / WHEN / THEN in Kiro in September 2025. OpenSpec's concepts doc also shows GIVEN / WHEN / THEN / AND. The schema form is the one to use with OpenSpec. North's essays are about behavior, not about OpenSpec's hash-count rules. [Introducing BDD](https://dannorth.net/blog/introducing-bdd/), 20 September 2006. [BDD with intent](https://dannorth.net/blog/bdd-with-intent/).

OpenSpec is a spec framework from Fission. The README's philosophy is five lines: fluid not rigid, iterative not waterfall, easy not complex, built for brownfield and not only greenfield, and scalable from personal projects to enterprises. The [concepts doc](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md) states the first four and explains them. Fluid means no phase gates. The README's matching line is that any artifact can be updated at any time. Deltas exist so a change can describe a modification of a system that already exists.

The concepts doc's case for deltas is clarity, fewer conflicts, a review of the change rather than the unchanged text, and a fit for brownfield work. Two changes can touch one spec if they touch different requirements. That is the governance property. Review reads the delta. A full restatement hides the change and collides with the next branch.

The published site no longer serves the old concepts and slash-command URLs. The repository copies, and the [skills page](https://openspec.dev/docs/skills), are the pages that resolve.

After `openspec init` the tree is `openspec/config.yaml`, `specs/` for current behavior, and `changes/` with one folder per proposed change plus `archive/`. `specs/` is the source of truth, organized by domain. Archive merges the delta and moves the folder. Layout from the setup and spec-driven schema docs.

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

`config.yaml` is project settings and context for the agent. Drafting order in the schema is proposal first, then specs and design in either order, then tasks, then apply. Design can be omitted when none of its conditions apply. A change with no behavior change sets `skip_specs: true` in `.openspec.yaml`. `openspec validate` rejects a zero-delta change without that marker. Stores, marked beta in the README, are a separate planning repo with the same `openspec/` shape, shared by git, for a feature that spans more than one code repository. That is the multi-repo form. It is beta.

The README contrasts OpenSpec with Spec Kit, which it calls heavier, with rigid gates and a Python setup, and with Kiro, which it describes as locked to their IDE and to Claude. Kiro's own docs now list IDE, CLI, and Web. That lock-in sentence is OpenSpec's comparison, not Kiro's current capability list. The table below uses each project's own docs.

Install, from the README: the binary install script, `npm install -g @fission-ai/openspec@latest` on Node.js 20.19.0 or newer, or `brew install openspec`. Also pnpm, yarn, bun, and Nix. `openspec update` refreshes the instruction files inside a project. `openspec install` upgrades the standalone CLI. The README recommends Codex 5.5 and Opus 4.7 for planning and implementation. That is the project's recommendation, not a measured result. Clear context before implementation.

The [quickstart](https://openspec.dev/docs/quickstart) is five steps in the agent's chat: explore, propose, review, apply, archive. Review is a person, reading `proposal.md`, then `specs/`, then `tasks.md`, before any code. A fresh chat before apply is recommended. Implementation goes better on a clean window.

Explore, if the idea is still fuzzy. It reads the code and writes nothing unless asked. Propose stops at the plan. Apply checks off `tasks.md`. Ask again to resume at the first unchecked box. Progress is the checkboxes. Archive, once the boxes are checked, lets the specs absorb the change and moves the folder under `changes/archive/` with a date prefix.

The default profile is `core`: explore, propose, apply, update, sync, and archive. The expanded set, after `openspec config profile` and then `openspec update`, adds new, continue, ff, verify, bulk-archive, and onboard. `openspec config profile` is global per machine. Other projects pick it up on their next `openspec update`. Verify checks that the implementation matches the artifacts. It changes nothing and it does not archive. Turn it on when that check should happen before archive. Leave it off otherwise.

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

`openspec new change` creates only `.openspec.yaml`, with the schema and the created date. It does not write the four artifacts. `openspec status --change` tells you the next artifact. Tasks stay blocked until specs and design exist. When planning is complete, the next line points at `openspec instructions apply`. `openspec archive` without a name prompts, and outside a terminal it exits 1. `-y` answers the confirmations. `--skip-specs` archives without touching the main specs. Declining the spec update still archives, and leaves the specs alone. A validation failure blocks archive unless `--no-validate` is passed. Incomplete tasks warn, and `-y` continues.

`/opsx:sync` merges delta specs into the main specs. It does not move the folder. `openspec archive` does both. Git is separate. Commit the change folder with the code. OpenSpec does not prune the archive. An archived change's `specs/` can be deleted after the merge is committed, if Git is the history. `openspec validate --archived` checks task completion, not the applied deltas.

The README says 30+ tools, and that `openspec init` prints the right spelling. The canonical chat name is `/opsx:propose`. Cursor and GitHub Copilot use `/opsx-propose`. Claude Code uses the colon form. Codex uses `$openspec-propose`. Amazon Q, in the README, uses `@opsx-propose`. The same workflows also install as skills, for example `/openspec-apply-change`. The [skills page](https://openspec.dev/docs/skills) is the published list. The [slash-command writeup](https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md) lives in the repository. Skills and commands carry the same instructions. The docs prefer skills and expect commands to be retired later.

`openspec init` asks which tools to set up. `--tools cursor,claude` skips the picker. `--tools none` writes only the OpenSpec folder. Restart the editor after init. Re-running init prints Refreshed for tools already set up. The setup doc's example completion line is "Created: Claude Code / 6 skills and 6 commands." If Claude Code does not list the commands, the setup doc says `openspec update`, and if needed `openspec config set delivery both`.

| Tool | What you type for apply | Where init writes |
| --- | --- | --- |
| Cursor | `/opsx-apply` or the skill `/openspec-apply-change` | `.cursor/commands/` and `.cursor/skills/` |
| Claude Code | `/opsx:apply` or `/openspec-apply-change` | `.claude/commands/opsx/` and `.claude/skills/` |
| GitHub Copilot | `/opsx-apply` or the skill form | `.github/prompts/` and `.github/skills/` |
| Codex | `$openspec-apply-change`. Commands are not generated. | `.agents/skills/` |

Propose, explore, archive, and the rest use the same shape. The full matrix is the [supported-tools page](https://openspec.dev/docs/supported-tools).

The README's "see it in action" transcript uses `/opsx:explore`, `/opsx:propose add-dark-mode`, `/opsx:apply`, and `/opsx:archive`, and shows the archive landing at `openspec/changes/archive/2025-01-23-add-dark-mode`. That transcript is illustrative. The assistant replies are the project's demo, not a guaranteed session.

The proposal and delta below are study text, written in the documented template. They are not files from the OpenSpec repository. The dark-mode story, and the requirement sentence, are the ones in the README. The Purpose line is study text written long enough for a new capability.

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

Template sections: Why, What Changes, Capabilities, Impact. A capability name becomes `specs/<capability-path>/spec.md`. Implementation detail belongs in `design.md`. Capabilities is the contract with the specs phase. Before filling it in, run `openspec list --specs`, then `openspec show` for related specs. `openspec list` without `--specs` lists in-flight changes, not the capability inventory. New capabilities use kebab-case path segments. Modified capabilities must be existing paths whose requirements change, not merely whose code changes. Mark breaking changes with BREAKING in What Changes. Keep the proposal to about one or two pages.

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

|  | OpenSpec | Spec Kit | Kiro |
| --- | --- | --- | --- |
| Start | `openspec init` | `specify init` with an integration | Create a spec in Kiro's pane, CLI, or web |
| Default flow | explore, propose, apply, archive | constitution once, then specify, plan, tasks, implement, converge | requirements or bug analysis, design, tasks |
| Files | `openspec/specs` and `openspec/changes` | Feature state under the directory in `.specify/feature.json` | `requirements.md`, `design.md`, `tasks.md` in `.kiro/specs/` |
| Behavior language | SHALL / MUST, WHEN / THEN scenarios | Specify is what and why. The plan is where the stack goes. | Current docs: EARS, WHEN … THE SYSTEM SHALL. Also bugfix specs and Quick Spec. |
| After the change | Archive merges the delta into the main specs. | The concepts page does not prescribe how you keep `spec.md` afterward. | Three files per spec. The docs shown here do not describe a cross-feature merge. |

Böckeler's October 2025 article is the published comparison of Kiro, spec-kit, and Tessl. Use it for the three depths. Use each project's current docs for commands.

Kiro's [specs docs](https://kiro.dev/docs/specs/) describe feature specs, bugfix specs, Quick Spec, and parallel task execution on IDE, CLI, and Web. Correctness via property-based testing is IDE only. Analyze requirements is IDE and CLI. Quick Spec generates all three files with no approval gates, after clarifying questions. Requirements-first is for when the behavior is known and the design can flex. Tasks can run one at a time or all at once. Parallel execution builds a dependency graph and runs independent tasks in waves.

The spec pays when the person and the agent agree before code. GitHub names greenfield work, a feature in a system that already exists, and a legacy rebuild where the original intent is gone. A brownfield edit fits a delta, because the delta shows the change. Security, compliance, and design-system rules then have a place the agent will actually read. That is the governance use. The artifact is in the repo, reviewed with the plan, and merged back into `openspec/specs` when the change ships.

It fails as a sledgehammer. Böckeler's word for one Kiro run: 4 user stories and 16 acceptance criteria, for one bug. A modest feature can produce a pile of markdown she would rather have reviewed as code. In one spec-kit run the agent ignored research notes and regenerated classes that already existed. A longer context window does not mean the agent uses everything in it. That is the false sense of control. Spec-as-source, if it inherits model-driven overhead and the model's non-determinism together, can make the artifact worse while trying to improve it. Her word is Verschlimmbesserung. She also asks who these workflows are for. The demos assume a developer writes the user stories. That may be the wrong person for a large, unclear feature. Her conclusion is still that spec-first is valuable, and that the term is semantically diffused.

OpenSpec's escape for a refactor, a tooling change, or a docs-only change with no behavior change is `skip_specs: true`. Inventing a requirement so validation will pass is the failure that marker exists to avoid.

Anthropic's December 2024 line: add machinery only when the simpler version is not enough. A line suggestion, a chat edit, an agent with a draft pull request, a failing test, or a spec. A long session wants a short `CLAUDE.md`, not the repository pasted into the prompt. When the change needs OpenSpec: install from the README, run `openspec init --tools cursor` (or `claude`, or the picker), and restart the editor. Explore, or `/opsx:propose` with a kebab-case name. On Cursor that is `/opsx-propose`. Read the proposal, the specs, then the tasks, and edit the markdown before any code. A new chat for apply. If it stops, apply again. It resumes at the first unchecked task. `openspec validate`, then archive, and commit the spec with the code. A pure refactor sets `skip_specs: true`. The expanded profile is for `/opsx:verify` before archive.

The pages. OpenSpec: [repository and README](https://github.com/Fission-AI/OpenSpec), [openspec.dev](https://openspec.dev/), [quickstart](https://openspec.dev/docs/quickstart), [setup](https://openspec.dev/docs/setup), [CLI](https://openspec.dev/docs/cli), [slash commands in the repo](https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md), [skills](https://openspec.dev/docs/skills), [supported tools](https://openspec.dev/docs/supported-tools), [spec-driven schema](https://openspec.dev/docs/schemas/spec-driven), [concepts in the repo](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md).

Spec Kit and Kiro: [Spec Kit repository](https://github.com/github/spec-kit), [what SDD is](https://github.github.io/spec-kit/concepts/sdd.html), [GitHub Blog, 2 September 2025](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/), [Kiro specs](https://kiro.dev/docs/specs/), [requirements-first](https://kiro.dev/docs/specs/feature-specs/requirements-first/), [Quick Spec](https://kiro.dev/docs/specs/quick-spec/).

Essays: [Böckeler on spec-driven development, 15 October 2025](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html), [Böckeler on TDD in the agent loop](https://martinfowler.com/articles/exploring-gen-ai/tdd-in-the-agent-loop.html), [Fowler, Test-Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html), [Dan North, Introducing BDD, 2006](https://dannorth.net/blog/introducing-bdd/), [Dan North, BDD with intent](https://dannorth.net/blog/bdd-with-intent/).

Vibe coding, agents, tests, and context: [CACM, Catching the Vibe of Vibe Coding, 6 May 2025](https://cacm.acm.org/news/catching-the-vibe-of-vibe-coding/), [arXiv:2506.23253](https://arxiv.org/html/2506.23253v1), [GitHub, from pair to peer, 25 June 2025](https://github.blog/news-insights/product-news/from-pair-to-peer-programmer-our-vision-for-agentic-workflows-in-github-copilot/), [GitHub, meet the coding agent](https://github.blog/news-insights/product-news/github-copilot-meet-the-new-coding-agent/), [GitHub, coding agent 101](https://github.blog/ai-and-ml/github-copilot/github-copilot-coding-agent-101-getting-started-with-agentic-workflows-on-github/), [Sourcegraph, chat-oriented programming, 27 July 2024](https://sourcegraph.com/blog/chat-oriented-programming-in-action), [Yegge, Revenge of the junior developer, 22 March 2025](https://sourcegraph.com/blog/revenge-of-the-junior-developer), [Anthropic, Building effective agents, 19 December 2024](https://www.anthropic.com/engineering/building-effective-agents), [Anthropic, context engineering, 29 September 2025](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), [Anthropic, Claude Code best practices, 18 April 2025](https://www.anthropic.com/research/claude-code-best-practices), [Claude Code docs, current best practices](https://code.claude.com/docs/en/best-practices), [Thoughtworks, from vibe coding to context engineering, 5 November 2025](https://www.thoughtworks.com/en-us/insights/blog/machine-learning-and-ai/vibe-coding-context-engineering-2025-software-development), [Thoughtworks, Where does the rigor go?, 20 February 2026](https://www.thoughtworks.com/insights/blog/agile-engineering-practices/where-does-the-rigor-go).

Diagrams: [the cycle](/slides/spec-driven-development-cycle.svg) and the [approach diagrams](/slides/ai-dev-approaches/vibe-coding.svg), each with a PNG beside the SVG.
