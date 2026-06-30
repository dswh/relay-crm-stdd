# Relay CRM — Stage 04 complete: Sliced into issues

Relay is a tiny CRM we add a **Lead Scoring** feature to, one stage at a time. You
are on **`04_end`** — the finished version of stage 04 (`/slice`).

## What this stage produced
- Four issue files in `.scratch/lead-scoring/`:
  - `001-reply-award-badge.md` (the tracer bullet — do first)
  - `002-tiers.md`
  - `003-nightly-decay.md`
  - `004-retroactive-backfill.md`
- They form a dependency graph (a DAG): 001 first, the rest build on it.
- No application code yet.

## What to do next
- Build the tracer bullet, issue 001:
  ```bash
  git checkout 05_begin
  ```

See `DEMO-BRANCHES.md` for the full map of every stage.
