# Matt Pocock Skills — Cheatsheet

A field guide to using [Matt Pocock's skills](https://github.com/mattpocock/skills) inside Claude Code.

> **TL;DR** — Agents are stateless engineers. Skills are how you encode *process* into them so they stop improvising. Use `companyAnnouncements` to keep the menu visible; use the workflow chains below to actually move.

---

## Mental Model

| Mechanism | Loads | Use for |
|---|---|---|
| `CLAUDE.md` / `AGENTS.md` | Every turn | Facts, conventions, repo-wide rules |
| **Skill (`SKILL.md`)** | Only when triggered | Repeatable multi-step procedures |
| MCP server | On tool call | Deterministic external APIs |
| Subagent (`context: fork`) | Isolated context | Long tasks, parallel work |

Matt's framing: *"You have a fleet of middling-to-good engineers you can deploy any time — but they have no memory."* Skills are the memory. Don't push procedures into `CLAUDE.md`; that bloats every turn. Don't ad-lib workflows in chat; they drift.

---

## Install

```bash
# Install Matt's skills
npx skills add https://github.com/mattpocock/skills

# Per-repo scaffolding (runs once, configures issue tracker + CONTEXT.md path + triage labels)
/setup-matt-pocock-skills
```

Then drop the preset into `~/.claude/settings.json` so the menu is always in front of Claude:

```bash
/setup-announcements --harness mattpocock
```

…or paste [`templates/mattpocock.json`](../templates/mattpocock.json) by hand.

---

## The Five Workflow Chains

### 1. Plan — turn an idea into grabbable issues

```
/grill-with-docs   →   /to-prd   →   /to-issues
```

- `/grill-with-docs` — Socratic interview against `CONTEXT.md` and `docs/adr/`. Drives 16–50 questions until shared understanding is reached.
- `/to-prd` — Compacts the conversation into a PRD and posts it as an issue.
- `/to-issues` — Splits the PRD into **vertical-slice tracer-bullet** issues with explicit blocking relationships. Parallel agents can now grab them.

### 2. Bug — disciplined diagnosis loop

```
/diagnose
```

Six phases, in order: feedback loop → reproduce → 3–5 ranked hypotheses → instrument **one** variable → fix + regression test → cleanup + post-mortem. Don't skip the reproduction step. Don't change two variables at once.

### 3. Feature — vertical tracer bullets, not horizontal layers

```
/tdd              # one test → one impl, repeat
/prototype        # throwaway: LOGIC (terminal) or UI variants
```

Rule from Matt: **never write all tests then all code.** Write the test for the next slice, make it pass, refactor, move on. Test through public interfaces only — internals are implementation detail.

### 4. Triage — sort the inbox before handing work to an agent

```
/triage
```

Routes each new issue into one of four lanes:

| Lane | Meaning |
|---|---|
| `needs-info` | Ask reporter; missing reproduction or scope |
| `ready-for-agent` | An AFK agent can grab it |
| `ready-for-human` | Judgment call required |
| `wontfix` | Closed with reasoning |

Run when issues pile up, or before launching any autonomous loop.

### 5. Explore — onboard or refactor

```
/zoom-out                          # unfamiliar code → module + caller map
/improve-codebase-architecture     # shallow → deep modules; HTML report in $TMPDIR
```

---

## Skill Authoring Rules (when you write your own)

### Frontmatter

```yaml
---
name: skill-name
description: What it does. Use when [specific triggers].
disable-model-invocation: true   # required for destructive workflows
allowed-tools: Read Grep          # optional pre-approval
---
```

- `name` is a label; the **directory name** is what gets invoked.
- `description` is the **only signal** Claude sees when picking which skill to load. Truncated at 1,024 chars in the picker.
- `disable-model-invocation: true` for anything with side effects (deploy, send message, write to prod).

### Description rules (Matt's spec)

- Third person.
- Sentence 1: what the skill does.
- Sentence 2: `"Use when [specific triggers]"` — name the trigger words verbatim.
- Bad: *"Helps with documents."* — gives Claude no signal.
- Good: *"Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when user mentions PDFs, forms, or document extraction."*

### Progressive disclosure

| Limit | Where |
|---|---|
| **100 lines** | Matt's hard cap for `SKILL.md` |
| 500 lines | Anthropic's more lenient official cap |

When you outgrow it, split:

```
skill-name/
├── SKILL.md          ← entry point, ≤100 lines
├── REFERENCE.md      ← loaded on demand
├── EXAMPLES.md       ← loaded on demand
└── scripts/
    └── helper.js     ← executed, not loaded into context
```

Reference supporting files from `SKILL.md` (`See [REFERENCE.md](REFERENCE.md)…`) so Claude only pulls them when needed.

### Bundled scripts

Add `scripts/` when:
- The operation is deterministic (validation, parsing, formatting).
- The same code would be regenerated every run.
- Errors need explicit handling Claude generates inconsistently.

Reference scripts with `${CLAUDE_SKILL_DIR}/scripts/helper.js` so paths resolve regardless of the working directory.

---

## When to Write a Skill — and When Not

**Write one when:**
- You keep pasting the same instructions into chat.
- A section of `CLAUDE.md` has grown into a procedure rather than a fact.
- Agents repeatedly diverge at the same steering moment (e.g., jumping to code before design).
- The workflow is repeatable across projects → put it in `~/.claude/skills/` globally.
- You need a quality gate (TDD, architecture review, test-first).

**Don't, when:**
- It's a one-off.
- It's a standing fact or convention → `CLAUDE.md`/`AGENTS.md`.
- It should run silently every turn → that's a `CLAUDE.md` rule, not a skill.
- The work is really an external API call → that's an MCP tool.

---

## Common Pitfalls

1. **Verbose SKILL.md** — narrating reasoning instead of instructing action. Cut hard.
2. **Vague description** — Claude can't pick the right skill. Use trigger words verbatim.
3. **Procedures in `CLAUDE.md`** — bloats every turn. Move them to skills.
4. **Implementation before alignment** — fix with `/grill-with-docs` in the chain.
5. **Garbage-in architecture** — *"If you have a garbage code base, the AI will produce garbage within that code base."* Skills don't fix coupling.
6. **Horizontal testing** — tests per layer instead of per behavior. Use `/tdd`.
7. **Issues with no blocking relationships** — parallel agents collide. `/to-issues` encodes the DAG.
8. **Missing `disable-model-invocation: true`** on destructive skills — production incident waiting to happen.

---

## Quick Reference — Canonical Skills

| Command | Phase | Notes |
|---|---|---|
| `/grill-me` | Pre-plan | 3-sentence skill; interviews until aligned. The viral example. |
| `/grill-with-docs` | Plan | Same, against `CONTEXT.md` + ADRs. |
| `/to-prd` | Plan | Conversation → PRD issue. |
| `/to-issues` | Plan | PRD → vertical-slice issues with deps. |
| `/tdd` | Feature | Red-green-refactor, public-interface only. |
| `/prototype` | Feature | Throwaway terminal or UI variants. |
| `/diagnose` | Bug | 6-phase structured loop. |
| `/triage` | Inbox | 4-lane router. |
| `/zoom-out` | Explore | Module + caller map. |
| `/improve-codebase-architecture` | Refactor | Shallow → deep modules; HTML report. |
| `/handoff` | Session | Compact context for next agent. |
| `/caveman` | Cost | ~75% token reduction mode. |
| `/write-a-skill` | Meta | Scaffolds a new skill to Matt's rules. |
| `/setup-matt-pocock-skills` | Setup | Per-repo scaffolding (one-time). |

---

## Sources

- [`mattpocock/skills`](https://github.com/mattpocock/skills) — canonical repo, MIT
- [`write-a-skill` SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/productivity/write-a-skill/SKILL.md) — primary source for the authoring rules above
- [AI Hero — 5 Agent Skills I Use Every Day](https://www.aihero.dev/5-agent-skills-i-use-every-day)
- [AI Hero — Skills landing](https://www.aihero.dev/skills)
- [AI Hero — Why 'grill-me' went viral](https://www.aihero.dev/my-grill-me-skill-has-gone-viral)
- [AI Hero — A Complete Guide to AGENTS.md](https://www.aihero.dev/a-complete-guide-to-agents-md)
- [AI Hero — Claude Code for Real Engineers (cohort)](https://www.aihero.dev/cohorts/claude-code-for-real-engineers-2026-04)
- [Anthropic — Extend Claude with Skills](https://code.claude.com/docs/en/skills)
- [Anthropic — Agent Skills Overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)

---

## Matt's Take vs. Anthropic's Stock Guidance

Anthropic frames skills as a *format* — where files go, what frontmatter exists, how invocation works. Permissive: 500-line cap, description "recommended."

Matt's take is **opinionated and workflow-first**: 100-line cap, `"Use when [triggers]"` is mandatory, description is the *only* discovery signal that matters, and the skills compose into a pipeline (`grill → to-prd → to-issues → tdd`) where each one hands off to the next. Skills as **guardrails against agent anti-patterns** — premature implementation, horizontal testing, context bloat — not as a customization convenience.
