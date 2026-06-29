---
name: swarm
description: Fan out multiple coding agents across independent DAG issues — plan a wave, sandbox each in a git worktree, implement, review, merge. Use when your backlog is a DAG with independent slices.
disable-model-invocation: true
---

# Swarm

`/afk` is sequential — one agent, one issue at a time. When your `/slice` backlog is
a real DAG (issues with explicit "blocked by" edges), independent issues can run **at
the same time**. Swarm takes the loop from sequential to parallel.

The runner (working sketch in `scripts/parallel-run.ts`) is a planner → implementer →
reviewer → merger pipeline:

1. **Plan.** Planner reads the backlog and dependency edges, selects issues that are
   unblocked *and* independent — one "wave" of the DAG.
2. **Sandbox per issue.** For each chosen issue, create an isolated **git worktree**
   on its own branch inside a Docker sandbox. A worktree is a separate checkout
   sharing the same history, so agents edit in parallel without colliding.
3. **Implement.** Run an implementer in each sandbox (`/build` → `/tdd` → feedback
   loops → commit), passing the issue number, title, and branch. Use a
   capable-but-cheap model (e.g. Sonnet).
4. **Review.** For each branch with commits, run `/review` in a fresh context with
   coding standards pushed in. Use a stronger model (e.g. Opus) — reviewing well needs
   more reasoning than the first draft.
5. **Merge.** Merger takes the reviewed branches and merges them, resolving type/test
   conflicts. The next wave unblocks; repeat.

## When to use it

- Your acceptance criteria are sharp (same prerequisite as `/afk`).
- The backlog genuinely parallelizes — independent vertical slices, not one
  sequential chain. (A purely sequential plan is a single loop; `/afk` is simpler.)
- You can sandbox. Parallel agents on a shared working tree without isolation is how
  you get corruption — worktrees + containers are not optional.

## Caveat

More parallelism means more code to QA and review, faster than you can read it. The
loop produces reviewed, merged branches — not shipped features. Keep a human in QA,
and let QA findings flow back as new issues on the board.
