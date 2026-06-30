# Relay CRM — Stage 06: Review the slice

Relay is a tiny CRM. Across this class we add a **Lead Scoring** feature to it, one
stage at a time. Every stage has two branches: `NN_begin` (before the step) and
`NN_end` (after). You are on **`06_begin`**.

## 1. Where you are right now
- The tracer bullet works end to end: reply → award → badge, and the list sorts by score.
- 7 tests pass.
- But the code has **not been reviewed** against the project's standards yet.

## 2. The problem to solve next
- Working code isn't the same as good code.
- Your job is to **review the slice** against the standards in `CLAUDE.md`, fix what truly matters now, and file the rest as follow-up issues.

## 3. The command to run
```
/review
```

## 4. Steps to follow
1. Clear context, then run `/review` over the commits on this slice.
2. Read its findings. Apply the **must-fix** (the list re-sorts on every read — a quadratic re-sort).
3. Turn other findings into new issues instead of fixing everything at once.
4. QA in the browser: `npm run dev`, click **"Log reply"**, and watch a lead climb the list.

## 5. What you should see (expected output)
- A fix in `src/services/leadService.ts` (the quadratic re-sort is removed).
- A review record: `.scratch/lead-scoring/REVIEW-001.md`.
- A new follow-up issue filed: `.scratch/lead-scoring/005-unify-reply-path.md`.
- Tests still green (7 tests).

## 6. End state — how to check
```bash
git diff 06_begin..06_end     # the exact changes this stage should produce
git checkout 06_end           # jump straight to the finished version if you get stuck
```
When the stage is done, the slice is reviewed, the must-fix is applied, and the rest is filed. Continue with stage 07 (`/sweep` + `/deepen`).
