# Relay CRM — STDD master-class starter

> ### 📍 Checkpoint 1 · Setup done — time to Align
> The repo is configured (tracker, labels, domain docs). You have one messy brief and no plan.
>
> **▶ Do now:** read **[`BRIEF.md`](./BRIEF.md)**, then run **`/align`** — let it interview you to a shared design concept (it grows `CONTEXT.md` and writes ADRs as you go).
> **✓ Compare / recover:** `git diff 01_begin..01_end` · or `git checkout 01_end`.
>
> _Map of every step → [`DEMO-BRANCHES.md`](./DEMO-BRANCHES.md)._

A tiny CRM, and the repo we build **Lead Scoring** into, live, during the class.
Clone it, run it, and build alongside the instructor using the STDD skills that
ship in this repo.

```bash
npm install
npm run dev        # http://localhost:5173 — the Relay leads list
npm test           # vitest — existing service tests are green
npm run typecheck
```

## Your job today

1. Read **[`BRIEF.md`](./BRIEF.md)** — the one messy Slack message you start from.
2. Run **`/align`** and let it interview you to a shared design concept.
3. **`/write-spec`** → **`/slice`** → **`/build`** (with **`/tdd`**) → **`/review`**.
4. Ship the first tracer bullet: *a lead replies → score awarded → badge on the list.*

Everything you need is already wired (`/setup` has been run): the issue tracker
(local markdown in `.scratch/`), the triage labels, and the domain docs
(`CONTEXT.md`, `docs/adr/`). Lost? Run **`/ask`**.

## What's here

```
src/
  domain/      Lead, Activity, the LeadRepo seam (the test surface), seed data
  services/    leadService — lists leads BY RECENCY (the bug: recency ≠ worth)
  ui/          the leads table + detail panel (the badge has a marked home)
  test/        makeTestRepo — the test-side adapter; copy its pattern
.claude/skills/ the full STDD skill set (align, write-spec, slice, build, tdd, …)
CLAUDE.md       agent-skills config + the coding standards /review checks against
CONTEXT.md      the Relay domain glossary (grow it with /model)
BRIEF.md        the brief
```

There is deliberately **no** score, tier, or `ScoreEvent` yet — that's the feature.

## The STDD skills in this repo

`align` · `spike` · `write-spec` · `slice` · `build` · `tdd` · `review` ·
`deepen` · `model` · `sweep` · `diagnose` · `triage` · `handoff` · `afk` ·
`swarm` · `setup` · `ask`

Methodology adapted from [Matt Pocock's skills](https://github.com/mattpocock/skills)
(MIT), distilled into the STDD vocabulary.
