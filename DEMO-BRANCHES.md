# STDD demo — branch checkpoints

This repo is the **live-build vehicle** for the STDD master class. Every skill
showcase has a `NN_begin` / `NN_end` branch pair: `_begin` is the exact project
state *before* the skill runs, `_end` is the state *after*. They double as the
demo's safety net — if a live run stalls, `git checkout NN_end` recovers the result.

> `main` (this branch) is the **public starter** — `/setup` done, the brief present,
> no Lead Scoring yet. It's where attendees build along. Phase snapshots are below.

## How to drive any phase

```bash
git checkout NN_begin     # reset to the clean state before the skill
#   ...run the skill live (commands per phase below)...
git diff NN_begin..NN_end # what the skill produced  (or: git checkout NN_end to recover)
```

## The phases (12 pairs, all 17 skills)

The main line **00→07** is continuous — each `_end` is the next `_begin`, so you can
run the whole class unbroken. **02** (spike) and **08–11** are sidebars off the main
line, each seeded with what its skill needs.

| # | Skills | begin → end shows | command |
|---|---|---|---|
| 00 | setup, ask | pre-config repo → `docs/agents/` + CLAUDE.md agent-skills block | `/setup`, then `/ask` |
| 01 | align, model | brief → `CONTEXT.md` grown + 2 ADRs (no code) | `/align add lead scoring (use BRIEF.md)` |
| 02 | spike, handoff | *(sidebar off 01_end)* open Q → throwaway tier/decay state machine + `NOTES.md` | `/spike` (via `/handoff`) |
| 03 | write-spec | aligned → `.scratch/lead-scoring/PRD.md` | `/write-spec` |
| 04 | slice | PRD → issues 001–004 (a DAG) | `/slice` |
| 05 | build, tdd | no scoring → tracer bullet 001 (reply→award→badge), 7 tests | `/build .scratch/lead-scoring/001-*.md` |
| 06 | review | unreviewed → quadratic-sort fix + issue 005 filed | `/review the commits on this slice` |
| 07 | deepen, sweep | → one deep scoring module, reply path unified (`SWEEP-001.md`) | `/sweep`, then `/deepen` |
| 08 | diagnose | *(off 07_end + planted bug)* recency-over-score regression → loop-first fix, 8 tests | `/diagnose` |
| 09 | triage | *(off 07_end + raw inbox)* 3 incoming → ready-for-agent / 2× wontfix | `/triage` |
| 10 | afk | *(off 07_end + harness)* afk backlog → 002 tiers built autonomously, 9 tests | `./scripts/run-once.sh` |
| 11 | swarm | *(off 07_end)* wave → tiers ∥ decay in worktrees, merged, 13 tests | `scripts/parallel-run.ts` |

## Notes

- **Sidebars** (`02`, `08`–`11`) branch off the main line and don't feed back into it,
  except `02`, whose *decision* was already folded into ADR 0001 on the main line.
- The two `/swarm` wave branches are kept as `relay/002-tiers` and `relay/003-decay`.
- Every `_begin`/`_end` runs green: `npm test`, `npm run typecheck`, `npm run dev`.
