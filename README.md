# Relay CRM — Stage 11: Build in parallel (side-demo)

Relay is a tiny CRM. Across this class we add a **Lead Scoring** feature to it, one
stage at a time. Every stage has two branches: `NN_begin` (before the step) and
`NN_end` (after). You are on **`11_begin`**.

> This is a **side-demo** built on the finished feature (`07_end`) plus a wave plan.

## 1. Where you are right now
- You are on the working scoring code from stage 07.
- The wave plan is set in `.scratch/lead-scoring/SWARM-PLAN.md`: build **tiers (002)** and **decay (003)** at the same time. They are independent slices that don't touch the same files.

## 2. The problem to solve next
- Two independent slices done one after the other is slower than it needs to be.
- Your job is to **build both at once** — each in its own isolated git worktree — then merge them back together.

## 3. The command to run
```
scripts/parallel-run.ts
```
This runs the `/swarm` pipeline: a worktree per issue, implement → review → merge.

## 4. Steps to follow
1. Run the swarm pipeline (`scripts/parallel-run.ts`).
2. It creates one git worktree per issue so the two builds never collide.
3. Each issue is implemented and reviewed in its own worktree.
4. The pipeline merges both back into this branch.

## 5. What you should see (expected output)
- **Tiers (002)** and **decay (003)** both built and merged:
  - `src/services/decayService.ts` (+ `decayService.test.ts`)
  - tier logic in `src/services/scoringService.ts` (+ tests) and the tier badge in `src/ui/`
- Both issues marked done; two wave branches kept as `relay/002-tiers` and `relay/003-decay`.
- `npm test` →
  ```
   Test Files  3 passed (3)
        Tests  13 passed (13)
  ```

## 6. End state — how to check
```bash
git diff 11_begin..11_end     # the exact changes this stage should produce
git checkout 11_end           # jump straight to the finished version if you get stuck
```
When the stage is done, both slices are built in parallel and merged — 13 green tests.
