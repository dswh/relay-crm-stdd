# Relay CRM — Stage 06 complete: Slice reviewed

Relay is a tiny CRM we add a **Lead Scoring** feature to, one stage at a time. You
are on **`06_end`** — the finished version of stage 06 (`/review`).

## What this stage produced
- The must-fix applied in `src/services/leadService.ts` (the quadratic re-sort is gone).
- A review record: `.scratch/lead-scoring/REVIEW-001.md`.
- A follow-up issue filed: `.scratch/lead-scoring/005-unify-reply-path.md`.
- Tests still green: **7 tests pass**.

## What to do next
- Deepen the code and unify the reply path:
  ```bash
  git checkout 07_begin
  ```

See `DEMO-BRANCHES.md` for the full map of every stage.
