---
name: setup
description: Configure this repo for the STDD skills — issue tracker, triage label vocabulary, and domain-doc layout. Run once before first use.
disable-model-invocation: true
---

# Setup

Scaffold the per-repo config the STDD skills assume:

- **Issue tracker** — where issues live (GitHub default; GitLab and local markdown supported)
- **Triage labels** — strings for the five canonical triage roles
- **Domain docs** — where `CONTEXT.md` and ADRs live, plus the consumer rules for reading them

Prompt-driven, not a script. Explore, present, confirm, write.

## Process

### 1. Explore

Read the starting state (don't assume): `git remote -v` / `.git/config` (GitHub? which?); `AGENTS.md` and `CLAUDE.md` at root (exist? already an `## Agent skills` section?); `CONTEXT.md` / `CONTEXT-MAP.md`; `docs/adr/`; `docs/agents/` (prior output of this skill); `.scratch/` (sign of a local-markdown convention).

### 2. Present findings and ask — one decision at a time

Summarise present/missing, then walk the three decisions **one at a time**. Assume the user doesn't know the terms; lead each with a short explainer, then choices + default.

**A — Issue tracker.** Where issues live; `/slice`, `/triage`, `/write-spec`, `/review` read/write it. Propose GitHub for a GitHub remote, GitLab for a GitLab remote; else offer:
- **GitHub** (`gh` CLI) · **GitLab** (`glab`) · **Local markdown** (files under `.scratch/<feature>/`, good for solo repos) · **Other** (Jira/Linear — record the workflow as freeform prose).
If GitHub/GitLab, ask one follow-up: **PRs as a request surface?** (default no — if yes, `/triage` pulls *external* PRs into the same queue). Skip for local/other.

**B — Triage labels.** The `/triage` state machine applies labels matching configured strings. Canonical roles: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. Default: each role's string equals its name. Ask whether to override any (e.g. an existing `bug:triage`).

**C — Domain docs.** Some skills read `CONTEXT.md` (domain language) and `docs/adr/` (decisions). Confirm layout: **Single-context** (one `CONTEXT.md` + `docs/adr/` at root — most repos) or **Multi-context** (`CONTEXT-MAP.md` at root pointing to per-context files — typically a monorepo).

### 3. Confirm and edit

Show drafts of the `## Agent skills` block and the three docs (`docs/agents/issue-tracker.md`, `docs/agents/triage-labels.md`, `docs/agents/domain.md`). Let the user edit before writing.

### 4. Write

**Pick the file:** if `CLAUDE.md` exists, edit it; else if `AGENTS.md` exists, edit it; if neither, ask which to create. Never create one when the other exists. If an `## Agent skills` block exists, update it in place — don't append a duplicate.

The block:

```markdown
## Agent skills

### Issue tracker
[where issues are tracked, + whether external PRs are a triage surface]. See `docs/agents/issue-tracker.md`.

### Triage labels
[one-line summary of the label vocabulary]. See `docs/agents/triage-labels.md`.

### Domain docs
[single-context or multi-context]. See `docs/agents/domain.md`.
```

Then write the three docs:

- **`docs/agents/issue-tracker.md`** — which tracker, exact commands to create/label/close an issue (e.g. `gh issue create`, or "write `.scratch/<feature>/NNN-title.md`"), and whether external PRs are in scope.
- **`docs/agents/triage-labels.md`** — a table mapping each canonical role to its real label string.
- **`docs/agents/domain.md`** — the layout (single/multi-context) and the consumer rule: "skills read `CONTEXT.md` for domain language and `docs/adr/` for decisions before touching an area."

### 5. Done

Tell the user setup is complete and which skills now read these files. They can edit `docs/agents/*.md` directly later; re-run only to switch trackers or restart.
