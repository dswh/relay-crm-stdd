# Relay CRM — Stage 05 complete: Tracer bullet built

Relay is a tiny CRM we add a **Lead Scoring** feature to, one stage at a time. You
are on **`05_end`** — the finished version of stage 05 (`/build` + `/tdd`).

## What this stage produced
- A new `src/services/scoringService.ts` (with tests), a `ScoreEvent` type, and an updated repo.
- `leadService` now sorts **by score** instead of recency.
- A score badge in the UI and a "Log reply" action in the app.
- The feature works end to end: reply → award → badge. `npm test` →
  ```
   Test Files  2 passed (2)
        Tests  7 passed (7)
  ```

## What to do next
- Review the slice against the project's standards:
  ```bash
  git checkout 06_begin
  ```

See `DEMO-BRANCHES.md` for the full map of every stage.
