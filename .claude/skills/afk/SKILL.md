---
name: afk
description: Run an autonomous "night shift" loop over your AFK-tagged backlog, one issue at a time, sandboxed. Needs sharp acceptance criteria.
disable-model-invocation: true
---

# AFK — the night shift (Ralph loop)

Day shift (you) plans: /align → /write-spec → /slice. Night shift (an agent) implements unattended — the "Ralph" pattern: small, verifiable changes toward the goal until the backlog is empty.

**Prerequisite, not optional:** vague requirements break autonomous loops. Only run AFK once acceptance criteria are sharp enough that the agent knows exactly what "done" means. Earn autonomy incrementally.

## How it works

The `scripts/` (also at the repo's `/scripts`) do three things:

1. **Gather the backlog.** `cat` every issue file (or fetch from the tracker) plus recent commits, passed in at the *start* of context — so the agent starts each run with the full backlog and history.
2. **Pick the next task.** Work **`afk`-tagged issues only**, skip blocked, prioritise: critical bug fixes → dev infrastructure → tracer-bullet slices → polish/quick wins/refactors. If none remain, print a stop sentinel (`NO MORE TASKS`) and exit.
3. **Do the task with feedback loops.** Explore → `/tdd` → run tests + typecheck → commit. Then `/review` in a fresh context. One issue per iteration.

Run it **sandboxed** (Docker container and/or git worktree) so an autonomous run can't make irreversible changes. See /swarm to fan this out across independent issues.

## Run it

```bash
# one iteration (human-in-the-loop — watch it, then tune the prompt):
./scripts/run-once.sh

# loop until the backlog's AFK tasks are exhausted (sandboxed):
./scripts/afk-loop.sh
```

Start with `run-once.sh` repeatedly: watch the agent, tune the prompt where it struggles before letting the full loop run. The loop is only as good as the single iteration.

## Guardrails

- Run inside a sandbox; never point an unattended loop at production credentials.
- Permission mode `acceptEdits` (edits without prompting) — paired with the sandbox, not push access. Keep `main` clean; merge deliberately.
- QA is still human. The loop produces commits to review, not shipped features. QA findings become new issues on the board.
