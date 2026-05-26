# claude-code-workflow-cheatsheet

**Never forget a slash command again.** Auto-generated workflow cheatsheets that live inside Claude Code.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude_Code-Skill-blueviolet)](https://docs.anthropic.com/en/docs/claude-code)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## The Problem

You installed [Superpowers](https://github.com/obra/superpowers), [Everything Claude Code](https://github.com/anthropics/everything-claude-code), [Oh My Claude Code](https://github.com/yeachan-heo/oh-my-claudecode), or built your own commands — then forgot half of them exist. You end up using the same 3 commands while 40+ sit unused.

## The Solution

This skill scans your installed commands and generates a **persistent cheatsheet** that Claude sees at the start of every session — via the `companyAnnouncements` field in `settings.json`.

```
┌─────────────────────────────────────────────────────────────────────┐
│  What Claude sees every session:                                    │
│                                                                     │
│  [Workflows] Dev: /orchestrate feature "desc" -> /e2e               │
│  [Workflows] Quality: /code-review -> /refactor-clean -> /verify    │
│  [Workflows] Multi: /multi-plan -> /multi-execute | /devfleet       │
│  [Workflows] Learn: /learn -> /learn-eval -> /skill-create          │
│  [OMC] Auto: autopilot: desc | Persist: ralph: desc                 │
│  [Superpowers] Design: /brainstorming -> /writing-plans             │
│  ...                                                                │
│                                                                     │
│  Claude now proactively suggests the RIGHT command for your task.   │
└─────────────────────────────────────────────────────────────────────┘
```

**Before:** You type `/plan` for everything.
**After:** Claude suggests `/orchestrate bugfix "login crash" -> /e2e` because it knows the full workflow.

---

## Quick Start

### Option 1: Claude Code Skill (Recommended)

```bash
# Copy the skill into your Claude Code skills directory
cp -r . ~/.claude/skills/company-announcements
```

Then in Claude Code:

```
/setup-announcements                        # Auto-detect your installed commands
/setup-announcements --harness superpowers  # Superpowers preset
/setup-announcements --harness ecc          # Everything Claude Code preset
/setup-announcements --harness omcc         # Oh My Claude Code preset
/setup-announcements --harness mattpocock   # Matt Pocock's engineering skills preset
```

### Option 2: Manual Install (30 seconds)

Pick a preset and paste it into `~/.claude/settings.json`:

<details>
<summary><b>Superpowers (obra)</b> - 5 workflow categories</summary>

```json
{
  "companyAnnouncements": [
    "[Superpowers] Design: /brainstorming -> /writing-plans\n[Superpowers] Execute: /using-git-worktrees -> (/executing-plans or /subagent-driven-development)\n[Superpowers] Per Task: /test-driven-development -> /requesting-code-review -> /receiving-code-review\n[Superpowers] Finish: /verification-before-completion -> /finishing-a-development-branch\n[Superpowers] Tools: /systematic-debugging (bugs) | /dispatching-parallel-agents (parallel) | /writing-skills (meta)"
  ]
}
```

</details>

<details>
<summary><b>Everything Claude Code (ECC)</b> - 7 workflow categories</summary>

```json
{
  "companyAnnouncements": [
    "[Workflows] Dev: /orchestrate feature|bugfix \"desc\" -> /e2e | Manual: /plan -> /tdd -> /code-review -> /verify\n[Workflows] Reproduce: /e2e (as-is) -> /orchestrate bugfix -> /e2e (to-be) | Build: /build-fix -> /verify\n[Workflows] Quality: /code-review -> /refactor-clean -> /verify | /quality-gate | /eval define|check|report\n[Workflows] Multi: /multi-plan -> /multi-execute | /devfleet \"task\" | /model-route \"task\" --budget low|med|high\n[Workflows] Docs: /update-docs, /update-codemaps | Ref: /docs \"lib\" | Loop: /loop-start sequential|continuous-pr\n[Workflows] Learn: /learn -> /learn-eval -> /skill-create | Instincts: /instinct-status -> /evolve -> /promote\n[Workflows] Session: /save-session, /resume-session | Meta: /harness-audit, /skill-health, /context-budget"
  ]
}
```

</details>

<details>
<summary><b>Oh My Claude Code (OMCC)</b> - 6 workflow categories</summary>

```json
{
  "companyAnnouncements": [
    "[OMC] Auto: autopilot: desc | Persist: ralph: desc | Parallel: ulw tasks\n[OMC] Team: /oh-my-claudecode:team 3:executor \"task\" | Plan: ralplan | QA: /oh-my-claudecode:ultraqa\n[OMC] Clarify: deep-interview \"idea\" -> omc-plan --consensus -> autopilot: desc\n[OMC] Investigate: /oh-my-claudecode:trace | Tri-Model: ccg \"query\" | Visual: /oh-my-claudecode:visual-verdict\n[OMC] Cleanup: deslop | Skills: /oh-my-claudecode:skill list | Learn: /oh-my-claudecode:learner\n[OMC] Session: /oh-my-claudecode:psm | Release: /oh-my-claudecode:release | Diag: /oh-my-claudecode:omc-doctor"
  ]
}
```

</details>

<details>
<summary><b>Vanilla Claude Code</b> - Built-in commands only</summary>

```json
{
  "companyAnnouncements": [
    "[Workflows] Dev: /plan -> /code-review | Bug: /build-fix\n[Workflows] Docs: /docs \"lib\" | Session: /save-session, /resume-session"
  ]
}
```

</details>

<details>
<summary><b>Matt Pocock's skills</b> - 6 disciplined workflows (plan, bug, feature, triage, explore)</summary>

```json
{
  "companyAnnouncements": [
    "[Matt] Plan: /grill-with-docs -> /to-prd -> /to-issues (interview against CONTEXT.md, synthesize PRD, split into vertical-slice tracer-bullet issues)\n[Matt] Bug: /diagnose (feedback loop -> reproduce -> 3-5 ranked hypotheses -> instrument one variable -> fix + regression test -> cleanup + post-mortem)\n[Matt] Feature: /tdd (vertical tracer bullets one test -> one impl; NEVER write all tests then all code) | /prototype (throwaway: LOGIC terminal app or UI variants)\n[Matt] Triage: /triage — sort a new/unsorted issue into needs-info (ask reporter) / ready-for-agent (AFK can grab it) / ready-for-human (judgment call) / wontfix. Use when issues pile up or before handing one to an agent.\n[Matt] Explore: /zoom-out (unfamiliar code -> module + caller map) | /improve-codebase-architecture (shallow -> deep modules; HTML report in $TMPDIR)"
  ]
}
```

Install Matt's skills first: `npx skills add https://github.com/mattpocock/skills`. Run `/setup-matt-pocock-skills` once per repo before first use — this configures the issue tracker (GitHub/GitLab/local), maps your 5 triage labels, and locates `CONTEXT.md`/`docs/adr/`.

</details>

---

## How It Works

Claude Code's `companyAnnouncements` field in `settings.json` is designed for team-wide messages. This skill repurposes it as a **persistent workflow memory** — a cheatsheet that Claude reads at the start of every session.

> **Important:** `companyAnnouncements` must be a `string[]` (array). If the array has **multiple items**, Claude Code picks **one at random per session** (rotating banner). To show all lines every session, use a **single array item** with `\n` for line breaks.

```
settings.json                          Claude's System Prompt
┌──────────────────────────┐          ┌──────────────────────────┐
│ "companyAnnouncements": [ │   ────> │ Company announcements:   │
│   "line1\nline2\nline3"   │         │ line1                    │
│ ]                         │         │ line2                    │
└──────────────────────────┘          │ line3                    │
                                      └──────────────────────────┘
                                              │
                                              v
                                      Claude proactively suggests
                                      the right workflow chain
```

### Syntax Convention

| Symbol | Meaning | Example |
|--------|---------|---------|
| `->` | Sequential steps | `/plan -> /tdd -> /verify` |
| `\|` | Alternative commands | `/verify \| /quality-gate` |
| `,` | Related commands | `/save-session, /resume-session` |

---

## Supported Harnesses

| Harness | Commands | Style | Preset |
|---------|----------|-------|--------|
| [Superpowers](https://github.com/obra/superpowers) | 14 skills | `/brainstorming`, `/writing-plans`, `/executing-plans` | `superpowers` |
| [Everything Claude Code](https://github.com/anthropics/everything-claude-code) | 40+ | `/plan`, `/tdd`, `/verify` | `ecc` |
| [Oh My Claude Code](https://github.com/yeachan-heo/oh-my-claudecode) | 20+ | `/oh-my-claudecode:*` + magic keywords | `omcc` |
| Vanilla Claude Code | Built-in | `/plan`, `/code-review` | `minimal` |
| Custom | Your own | Any combination | `custom` |

---

## Create Your Own Preset

1. Create a JSON file in `templates/`:

```json
{
  "_comment": "My team's workflow",
  "companyAnnouncements": [
    "[MyTeam] Deploy: /build -> /test -> /deploy-staging -> /deploy-prod\n[MyTeam] Review: /lint -> /code-review -> /security-scan -> /approve"
  ]
}
```

2. Each workflow line should be under ~120 characters
3. Use `[Prefix]` to group related workflows
4. Submit a PR to share with the community!

---

## Writing Effective Announcements

**Do:**
- Group by workflow phase (Dev, Quality, Docs, etc.)
- Show the complete chain with `->` arrows
- Include alternatives with `|` pipes
- Keep each line scannable at a glance

**Don't:**
- List every flag and option (keep it high-level)
- Exceed 7-10 announcement lines (Claude's attention is finite)
- Mix harness styles in the same config

---

## Examples

### Mixed Harness Setup

Using both ECC and OMCC? Combine presets:

```json
{
  "companyAnnouncements": [
    "[ECC] Dev: /orchestrate feature \"desc\" -> /e2e -> /verify\n[ECC] Quality: /code-review -> /refactor-clean -> /quality-gate\n[OMC] Auto: autopilot: desc | Persist: ralph: desc\n[OMC] Team: /oh-my-claudecode:team 3:executor \"task\""
  ]
}
```

### Project-Specific Workflows

Add project-level workflows alongside harness defaults:

```json
{
  "companyAnnouncements": [
    "[Project] PR: /plan -> /tdd -> /code-review -> gh pr create\n[Project] Hotfix: /orchestrate bugfix \"desc\" -> /e2e -> git push\n[Workflows] Quality: /code-review -> /refactor-clean -> /verify"
  ]
}
```

---

## FAQ

**Q: Does this slow down Claude Code?**
A: No. `companyAnnouncements` is injected into the system prompt — it costs a few hundred tokens at most and adds zero latency.

**Q: Can I use this without any harness?**
A: Yes! Use the `minimal` preset for vanilla Claude Code, or create your own custom workflows.

**Q: What happens if I have too many announcements?**
A: Keep it under 10 lines. More than that dilutes Claude's attention. Focus on workflows you actually use.

**Q: Does this work with Claude Code in VS Code / JetBrains?**
A: Yes. `settings.json` is shared across all Claude Code interfaces — CLI, desktop app, IDE extensions.

---

## Contributing

Contributions welcome! The most valuable additions are:

1. **New presets** for popular harnesses or team workflows
2. **Auto-detection improvements** for command discovery
3. **Documentation** and workflow recipes

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## Related Projects

- [Superpowers](https://github.com/obra/superpowers) — Agentic skills framework & dev methodology
- [Everything Claude Code](https://github.com/anthropics/everything-claude-code) — Comprehensive skill/command harness
- [Oh My Claude Code](https://github.com/yeachan-heo/oh-my-claudecode) — Autonomous agent workflows
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) — Official documentation

---

## License

[MIT](LICENSE)
