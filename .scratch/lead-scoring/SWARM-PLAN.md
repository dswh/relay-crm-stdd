# Swarm — one DAG wave, two independent slices

> `/swarm` fans the backlog across parallel git worktrees (plan → sandbox per issue →
> implement → review → merge), where `/afk` would do them one at a time. Runner sketch:
> `scripts/parallel-run.ts`.

## The wave

With the tracer bullet (001) shipped, two slices are unblocked **and independent** —
they touch disjoint modules, so two agents can build them at once without colliding:

| Issue | Branch | Touches | Independent of |
|---|---|---|---|
| 002 · tiers | `relay/002-tiers` | `scoringService` (+`tierOf`/`getTier`), UI badges | decay |
| 003 · decay | `relay/003-decay` | new `decayService`, widens `ScoreEvent.reason` | tiers |

`004 backfill` stays out of this wave — it's blocked by both 002 and 003.

## Pipeline (per `parallel-run.ts`)

1. **Plan** — `nextWave` selects 002 ∥ 003 (afk-able, unblocked, disjoint).
2. **Sandbox** — a git worktree per issue on its own branch, in a container.
3. **Implement** — an agent per worktree runs `/build` + `/tdd` (cheaper model).
4. **Review** — `/review` per branch in a fresh context (stronger model).
5. **Merge** — serially into the trunk; conflicts resolved against an up-to-date tree.

## The honest catch

Swarm produces *reviewed branches*, faster than you can read them — a human still
owns QA and the merge. Parallelism without sandboxing corrupts a shared tree;
worktrees + containers are not optional.

## Result of this wave

Both branches built green in isolation and merged cleanly — they touched disjoint
modules (tiers → `scoringService` + UI; decay → `types` + new `decayService`), so
there was nothing to resolve. 13 tests green on the merged tree. The next wave
unblocks: **004 backfill** (← 001, 002, 003) is now the only remaining slice.
