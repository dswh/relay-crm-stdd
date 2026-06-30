# Relay CRM — Stage 08 complete: Bug diagnosed

Relay is a tiny CRM we add a **Lead Scoring** feature to, one stage at a time. You
are on **`08_end`** — the finished version of stage 08 (`/diagnose`), a side-demo.

## What this stage produced
- A new test in `src/services/leadService.test.ts` that reproduces the recency regression (it failed before the fix).
- The fix in `src/services/leadService.ts`.
- The bug write-up updated with the diagnosis.
- `npm test` →
  ```
   Test Files  2 passed (2)
        Tests  8 passed (8)
  ```

## What to do next
- Try another side-demo (`09_begin`, `10_begin`, `11_begin`), or return to the finished feature with `git checkout 07_end`.

See `DEMO-BRANCHES.md` for the full map of every stage.
