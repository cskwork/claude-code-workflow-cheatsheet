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
│  [Superpowers] Dev: /brainstorming -> /writing-plans -> /tdd        │
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
/setup-announcements                       # Auto-detect your installed commands
/setup-announcements --harness superpowers # Superpowers preset
/setup-announcements --harness ecc         # Everything Claude Code preset
/setup-announcements --harness omcc        # Oh My Claude Code preset
```

### Option 2: Manual Install (30 seconds)

Pick a preset and paste it into `~/.claude/settings.json`:

<details>
<summary><b>Superpowers (obra)</b> - 5 workflow categories</summary>

```json
{
  "companyAnnouncements": [
    "[Superpowers] Dev: /brainstorming -> /writing-plans -> /test-driven-development -> /verification-before-completion",
    "[Superpowers] Execute: /executing-plans (review checkpoints) | /subagent-driven-development (parallel, same session)",
    "[Superpowers] Quality: /requesting-code-review -> /receiving-code-review | Debug: /systematic-debugging",
    "[Superpowers] Git: /using-git-worktrees -> /finishing-a-development-branch (merge|PR|cleanup)",
    "[Superpowers] Parallel: /dispatching-parallel-agents (2+ independent tasks) | Meta: /writing-skills"
  ]
}
```

</details>

<details>
<summary><b>Everything Claude Code (ECC)</b> - 7 workflow categories</summary>

```json
{
  "companyAnnouncements": [
    "[Workflows] Dev: /orchestrate feature|bugfix \"desc\" -> /e2e | Manual: /plan -> /tdd -> /code-review -> /verify",
    "[Workflows] Reproduce: /e2e (as-is) -> /orchestrate bugfix -> /e2e (to-be) | Build: /build-fix -> /verify",
    "[Workflows] Quality: /code-review -> /refactor-clean -> /verify | /quality-gate | /eval define|check|report",
    "[Workflows] Multi: /multi-plan -> /multi-execute | /devfleet \"task\" | /model-route \"task\" --budget low|med|high",
    "[Workflows] Docs: /update-docs, /update-codemaps | Ref: /docs \"lib\" | Loop: /loop-start sequential|continuous-pr",
    "[Workflows] Learn: /learn -> /learn-eval -> /skill-create | Instincts: /instinct-status -> /evolve -> /promote",
    "[Workflows] Session: /save-session, /resume-session | Meta: /harness-audit, /skill-health, /context-budget"
  ]
}
```

</details>

<details>
<summary><b>Oh My Claude Code (OMCC)</b> - 6 workflow categories</summary>

```json
{
  "companyAnnouncements": [
    "[OMC] Auto: autopilot: desc | Persist: ralph: desc | Parallel: ulw tasks",
    "[OMC] Team: /oh-my-claudecode:team 3:executor \"task\" | Plan: ralplan | QA: /oh-my-claudecode:ultraqa",
    "[OMC] Clarify: deep-interview \"idea\" -> omc-plan --consensus -> autopilot: desc",
    "[OMC] Investigate: /oh-my-claudecode:trace | Tri-Model: ccg \"query\" | Visual: /oh-my-claudecode:visual-verdict",
    "[OMC] Cleanup: deslop | Skills: /oh-my-claudecode:skill list | Learn: /oh-my-claudecode:learner",
    "[OMC] Session: /oh-my-claudecode:psm | Release: /oh-my-claudecode:release | Diag: /oh-my-claudecode:omc-doctor"
  ]
}
```

</details>

<details>
<summary><b>Vanilla Claude Code</b> - Built-in commands only</summary>

```json
{
  "companyAnnouncements": [
    "[Workflows] Dev: /plan -> /code-review | Bug: /build-fix",
    "[Workflows] Docs: /docs \"lib\" | Session: /save-session, /resume-session"
  ]
}
```

</details>

---

## How It Works

Claude Code's `companyAnnouncements` field in `settings.json` is designed for team-wide messages. This skill repurposes it as a **persistent workflow memory** — a cheatsheet that Claude reads at the start of every session.

```
settings.json                          Claude's System Prompt
┌─────────────────────┐               ┌──────────────────────────┐
│ "companyAnnouncements": [    ──────>│ Company announcements:   │
│   "[Workflows] ..."  │              │ [Workflows] Dev: /orch.. │
│   "[Workflows] ..."  │              │ [Workflows] Quality: ... │
│ ]                    │              │                          │
└─────────────────────┘               └──────────────────────────┘
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
    "[MyTeam] Deploy: /build -> /test -> /deploy-staging -> /deploy-prod",
    "[MyTeam] Review: /lint -> /code-review -> /security-scan -> /approve"
  ]
}
```

2. Each line should be under ~120 characters
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
    "[ECC] Dev: /orchestrate feature \"desc\" -> /e2e -> /verify",
    "[ECC] Quality: /code-review -> /refactor-clean -> /quality-gate",
    "[OMC] Auto: autopilot: desc | Persist: ralph: desc",
    "[OMC] Team: /oh-my-claudecode:team 3:executor \"task\""
  ]
}
```

### Project-Specific Workflows

Add project-level workflows alongside harness defaults:

```json
{
  "companyAnnouncements": [
    "[Project] PR: /plan -> /tdd -> /code-review -> gh pr create",
    "[Project] Hotfix: /orchestrate bugfix \"desc\" -> /e2e -> git push",
    "[Workflows] Quality: /code-review -> /refactor-clean -> /verify"
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
