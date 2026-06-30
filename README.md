# Relay CRM — Stage 05: Build the tracer bullet

Relay is a tiny CRM. Across this class we add a **Lead Scoring** feature to it, one
stage at a time. Every stage has two branches: `NN_begin` (before the step) and
`NN_end` (after). You are on **`05_begin`**.

## 1. Where you are right now
- The work is sliced into issues 001–004.
- **Nothing is built yet** — there is still no score, no badge. The list is sorted only by recency.

## 2. The problem to solve next
- Build issue **001**, the *tracer bullet*: the thinnest path that touches every layer at once.
- The behaviour: **a lead replies to an email → a score is awarded → a badge shows on the lead list → the list sorts by score.**

## 3. The command to run
```
/build .scratch/lead-scoring/001-reply-award-badge.md
```
Drive it with `/tdd` — build one behaviour at a time, red → green.

## 4. Steps to follow
1. Start in a **fresh context** so the agent only sees this one issue.
2. Run the `/build` command above.
3. For each behaviour: write a failing test (red), make it pass (green), repeat.
4. Run `npm test` and `npm run typecheck` to confirm green.

## 5. What you should see (expected output)
- New service `src/services/scoringService.ts` with `src/services/scoringService.test.ts`.
- A `ScoreEvent` type and updated repo (`src/domain/types.ts`, `src/domain/leadRepo.ts`).
- `leadService` now sorts **by score**, not recency.
- A score badge in the UI (`src/ui/LeadRow.tsx`, `LeadList.tsx`, `index.css`) and a "Log reply" action in `src/App.tsx`.
- `npm test` →
  ```
   Test Files  2 passed (2)
        Tests  7 passed (7)
  ```

## 6. End state — how to check
```bash
git diff 05_begin..05_end     # the exact changes this stage should produce
git checkout 05_end           # jump straight to the finished version if you get stuck
```
When the stage is done, the feature works end to end with 7 green tests. Continue with stage 06 (`/review`).
