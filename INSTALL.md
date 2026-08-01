# Install claude-code-workflow-cheatsheet

<details>
<summary><strong>Claude Code</strong></summary>

### Install

```bash
claude plugin marketplace add cskwork/claude-code-announcements
claude plugin install claude-code-workflow-cheatsheet@claude-code-workflow-cheatsheet
```

Type `/claude-code-workflow-cheatsheet`.

### Verify

```bash
claude plugin list
```

### Update

```bash
claude plugin marketplace update claude-code-workflow-cheatsheet
```

### Uninstall

```bash
claude plugin uninstall claude-code-workflow-cheatsheet
claude plugin marketplace remove claude-code-workflow-cheatsheet
```

</details>

<details>
<summary><strong>Codex</strong></summary>

### Install

```bash
codex plugin marketplace add cskwork/claude-code-announcements --ref main
codex plugin add claude-code-workflow-cheatsheet@claude-code-workflow-cheatsheet
```

Type `$claude-code-workflow-cheatsheet`.

### Verify

```bash
codex plugin list
```

### Uninstall

```bash
codex plugin remove claude-code-workflow-cheatsheet
codex plugin marketplace remove claude-code-workflow-cheatsheet
```

</details>

<details>
<summary><strong>Gemini CLI</strong></summary>

### Install (extension, always-on)

```bash
gemini extensions install https://github.com/cskwork/claude-code-announcements
```

### Install (command, opt-in)

```bash
mkdir -p ~/.gemini/commands
curl -fsSL https://raw.githubusercontent.com/cskwork/claude-code-announcements/main/skills/claude-code-announcements/agents/gemini.toml \
  -o ~/.gemini/commands/claude-code-workflow-cheatsheet.toml
```

Type `/claude-code-workflow-cheatsheet` in a new session.

### Verify

```bash
gemini extensions list
```

### Uninstall

```bash
gemini extensions uninstall claude-code-workflow-cheatsheet
```

</details>

<details>
<summary><strong>Cursor, OpenCode, Amp, and other agent-skills harnesses</strong></summary>

### Install

```bash
npx skills add cskwork/claude-code-announcements
npx skills add cskwork/claude-code-announcements -g
```

Type `/claude-code-workflow-cheatsheet` in a new agent chat.

### Verify

```bash
npx skills list
```

### Update

```bash
npx skills update claude-code-workflow-cheatsheet
```

### Uninstall

```bash
npx skills remove claude-code-workflow-cheatsheet
```

</details>

<details>
<summary><strong>Antigravity (agy)</strong></summary>

### Install

```bash
agy plugin install https://github.com/cskwork/claude-code-announcements
```

### Verify

```bash
agy plugin list
```

### Uninstall

```bash
agy plugin uninstall claude-code-workflow-cheatsheet
```

</details>
