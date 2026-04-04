# Contributing

Thanks for your interest in contributing!

## Adding a New Preset

1. Fork this repo
2. Create a JSON file in `templates/` (e.g., `templates/my-harness.json`)
3. Follow the format:

```json
{
  "_comment": "Description of the harness",
  "_source": "https://github.com/...",
  "companyAnnouncements": [
    "[Prefix] Category: /cmd1 -> /cmd2 | /alt-cmd"
  ]
}
```

4. Update `SKILL.md` with the new harness in the Supported Harnesses table
5. Open a PR with a description of the harness and a link to the source project

## Guidelines

- Keep each announcement line under ~120 characters
- Use consistent syntax: `->` (sequential), `|` (alternatives), `,` (related)
- Use a `[Prefix]` tag to namespace your harness
- Test that the JSON is valid before submitting
- Maximum 10 announcement lines per preset

## Reporting Issues

Open an issue if you find a bug or have a feature request. Include:
- Your Claude Code version
- Your OS
- The preset you're using
- Expected vs actual behavior
