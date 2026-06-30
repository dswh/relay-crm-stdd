# Relay CRM — Stage 11 complete: Built in parallel

Relay is a tiny CRM we add a **Lead Scoring** feature to, one stage at a time. You
are on **`11_end`** — the finished version of stage 11 (`/swarm`), a side-demo.

## What this stage produced
- **Tiers (002)** and **decay (003)** built at the same time in separate git worktrees, then merged:
  - `src/services/decayService.ts` (with tests)
  - tier logic in `src/services/scoringService.ts` (with tests) and the tier badge in the UI
- Both issues marked done; the two wave branches are kept as `relay/002-tiers` and `relay/003-decay`.
- `npm test` →
  ```
   Test Files  3 passed (3)
        Tests  13 passed (13)
  ```

## What to do next
- Try another side-demo (`08_begin`, `09_begin`, `10_begin`), or return to the finished feature with `git checkout 07_end`.

See `DEMO-BRANCHES.md` for the full map of every stage.
