# Relay CRM — Stage 10: Run the agent unattended (side-demo)

Relay is a tiny CRM. Across this class we add a **Lead Scoring** feature to it, one
stage at a time. Every stage has two branches: `NN_begin` (before the step) and
`NN_end` (after). You are on **`10_begin`**.

> This is a **side-demo** built on the finished feature (`07_end`) plus an "afk" harness.

## 1. Where you are right now
- You are on the working scoring code from stage 07.
- The **afk** (away-from-keyboard) harness is wired up in `scripts/`.
- The backlog (issues 002–004) is sharp and ready to build.

## 2. The problem to solve next
- You want the agent to build the next issue **on its own**, while you watch.
- Your job is to run one autonomous pass and check it did the right thing.

## 3. The command to run
```
./scripts/run-once.sh
```

## 4. Steps to follow
1. Run `./scripts/run-once.sh` — one pass picks the next afk issue, builds it test-first, and commits.
2. **Watch** the run; don't walk away on the first try.
3. Sandbox the run before you ever loop it.
4. Review the commit it produced.

## 5. What you should see (expected output)
- Issue **002 (tiers)** built autonomously: hot / warm / cold tier logic in `src/services/scoringService.ts` (+ tests), with a tier badge in the UI (`src/ui/`, `src/index.css`, `src/ui/format.ts`).
- `002-tiers.md` marked done.
- `npm test` →
  ```
   Test Files  2 passed (2)
        Tests  9 passed (9)
  ```

## 6. End state — how to check
```bash
git diff 10_begin..10_end     # the exact changes this stage should produce
git checkout 10_end           # jump straight to the finished version if you get stuck
```
When the stage is done, the agent has built and committed the tiers issue by itself — 9 green tests.
