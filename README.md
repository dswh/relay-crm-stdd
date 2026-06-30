# Relay CRM — Stage 07 complete: Code deepened

Relay is a tiny CRM we add a **Lead Scoring** feature to, one stage at a time. You
are on **`07_end`** — the finished version of stage 07 (`/sweep` + `/deepen`).

## What this stage produced
- The reply path is unified through one module (`src/services/scoringService.ts`); both callers route through it.
- A sweep record: `.scratch/lead-scoring/SWEEP-001.md`.
- Issue `005-unify-reply-path.md` marked done.
- Tests still green: **7 tests pass**.

This is the finished, clean feature — and the base for the four side-demos.

## What to do next — pick a side-demo
- `git checkout 08_begin` — `/diagnose` a planted bug
- `git checkout 09_begin` — `/triage` a messy inbox
- `git checkout 10_begin` — `/afk` let the agent build unattended
- `git checkout 11_begin` — `/swarm` build two slices in parallel

See `DEMO-BRANCHES.md` for the full map of every stage.
