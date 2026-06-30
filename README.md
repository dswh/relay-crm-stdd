# Relay CRM — Stage 07: Deepen the code

Relay is a tiny CRM. Across this class we add a **Lead Scoring** feature to it, one
stage at a time. Every stage has two branches: `NN_begin` (before the step) and
`NN_end` (after). You are on **`07_begin`**.

## 1. Where you are right now
- The slice has been reviewed and the must-fix is applied.
- One review finding became issue **005**: the "a lead replied" logic is duplicated in two places.
- 7 tests pass.

## 2. The problem to solve next
- Duplicated logic drifts apart over time.
- Your job is to find the highest-value place to improve, then **unify the reply path into one scoring module** so there is a single source of truth.

## 3. The command to run
```
/sweep
```
Then deepen the candidate you pick:
```
/deepen
```

## 4. Steps to follow
1. Run `/sweep` to list good "deepening" candidates across the code.
2. Pick the one worth doing now (issue 005, the duplicated reply path).
3. Run `/deepen` on it — pull the logic into one module and route both callers through it.
4. Run `npm test` to confirm nothing broke.

## 5. What you should see (expected output)
- The reply path is unified through `src/services/scoringService.ts` (callers in `src/services/leadService.ts` and `src/App.tsx` updated).
- A sweep record: `.scratch/lead-scoring/SWEEP-001.md`.
- Issue `005-unify-reply-path.md` marked done.
- Tests updated and still green (7 tests).

## 6. End state — how to check
```bash
git diff 07_begin..07_end     # the exact changes this stage should produce
git checkout 07_end           # jump straight to the finished version if you get stuck
```
When the stage is done, the scoring logic lives in one clean module. This is the jumping-off point for the side-demos: stage 08 (`/diagnose`), 09 (`/triage`), 10 (`/afk`), 11 (`/swarm`).
