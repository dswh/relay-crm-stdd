# Relay CRM — STDD master-class starter

Relay is a tiny CRM. In this class we add a **Lead Scoring** feature to it, live,
one stage at a time, using the STDD skills that ship in this repo.

This is the **`main`** branch — the public starting point. The repo is already set
up (`/setup` has been run) and there is deliberately **no** score, tier, or
`ScoreEvent` yet. That's the feature you build.

## Run it
```bash
npm install
npm run dev        # http://localhost:5173 — the Relay leads list
npm test           # the existing service tests are green
npm run typecheck
```

## How the class is organised
- Every step is a stage with two branches: `NN_begin` (before the step) and `NN_end` (after).
- Each `begin` branch has a README that tells you exactly what to do: the current state, the next problem, the command to run, the steps, the expected output, and the end state.
- The full map of stages is in **[`DEMO-BRANCHES.md`](./DEMO-BRANCHES.md)**.

## Where to start
1. Read **[`BRIEF.md`](./BRIEF.md)** — the one messy Slack message the feature starts from.
2. Start at the first stage:
   ```bash
   git checkout 00_begin
   ```
3. Follow each stage's README in order. The main line runs 00 → 07; stages 08–11 are side-demos.

## The flow you'll follow
`/setup` → `/align` → (`/spike`) → `/write-spec` → `/slice` → `/build` (`/tdd`) →
`/review` → `/sweep` → `/deepen`, plus the side-demos `/diagnose`, `/triage`,
`/afk`, `/swarm`. Lost at any point? Run **`/ask`**.

## What's here
```
src/
  domain/      Lead, Activity, the LeadRepo seam (the test surface), seed data
  services/    leadService — lists leads BY RECENCY (the bug: recency ≠ worth)
  ui/          the leads table + detail panel (the badge has a marked home)
  test/        makeTestRepo — the test-side adapter; copy its pattern
.claude/skills/ the full STDD skill set
CLAUDE.md       agent-skills config + the coding standards /review checks against
CONTEXT.md      the Relay domain glossary (grow it with /model)
BRIEF.md        the brief
```
