# Relay CRM — Stage 04: Slice the spec into issues

Relay is a tiny CRM. Across this class we add a **Lead Scoring** feature to it, one
stage at a time. Every stage has two branches: `NN_begin` (before the step) and
`NN_end` (after). You are on **`04_begin`**.

## 1. Where you are right now
- The spec is written: `.scratch/lead-scoring/PRD.md`.
- It's one big document — too much to build in a single sitting.

## 2. The problem to solve next
- You can't build a whole PRD at once.
- Your job is to **break it into small vertical-slice issues** — each one a thin path through every layer — and put them in the right order so blockers come first.

## 3. The command to run
```
/slice
```

## 4. Steps to follow
1. Run `/slice` against the PRD.
2. It splits the work into numbered issue files.
3. Check the order: issue 001 should be the thinnest end-to-end slice, and it should unblock the rest.

## 5. What you should see (expected output)
- Four new issue files in `.scratch/lead-scoring/`:
  - `001-reply-award-badge.md`  ← the tracer bullet (do this first)
  - `002-tiers.md`
  - `003-nightly-decay.md`
  - `004-retroactive-backfill.md`
- They form a small dependency graph (a DAG): 001 first, the others build on it.

## 6. End state — how to check
```bash
git diff 04_begin..04_end     # the exact changes this stage should produce
git checkout 04_end           # jump straight to the finished version if you get stuck
```
When the stage is done, the work is broken into buildable issues. Continue with stage 05 (`/build`).
