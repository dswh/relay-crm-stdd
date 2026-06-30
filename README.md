# Relay CRM — Stage 08: Diagnose a bug (side-demo)

Relay is a tiny CRM. Across this class we add a **Lead Scoring** feature to it, one
stage at a time. Every stage has two branches: `NN_begin` (before the step) and
`NN_end` (after). You are on **`08_begin`**.

> This is a **side-demo** built on the finished feature (`07_end`) plus one planted bug.

## 1. Where you are right now
- You are on the working, unified scoring code from stage 07.
- A bug has been **planted**. The symptom is written up in `.scratch/lead-scoring/BUG-recency-regression.md`: a hot lead dropped *below* a fresh, cold one.
- The 7 existing tests are all green — they do **not** catch this bug.

## 2. The problem to solve next
- Don't jump straight to a fix.
- Your job is to **reproduce the exact symptom with a failing test first**, then make that test pass.

## 3. The command to run
```
/diagnose
```

## 4. Steps to follow
1. Read the symptom in `.scratch/lead-scoring/BUG-recency-regression.md`.
2. Run `/diagnose`.
3. It writes a new test that fails **for the same reason** the bug happens (red).
4. It fixes the code so that test (and all the others) pass (green).

## 5. What you should see (expected output)
- A new test added to `src/services/leadService.test.ts` that reproduces the regression.
- A fix in `src/services/leadService.ts`.
- The bug write-up updated with the diagnosis.
- `npm test` →
  ```
   Test Files  2 passed (2)
        Tests  8 passed (8)
  ```

## 6. End state — how to check
```bash
git diff 08_begin..08_end     # the exact changes this stage should produce
git checkout 08_end           # jump straight to the finished version if you get stuck
```
When the stage is done, the bug is reproduced, fixed, and locked in by a test — 8 green tests.
