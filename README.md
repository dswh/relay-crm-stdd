# Relay CRM — Stage 00: Set up the repo

Relay is a tiny CRM. Across this class we add a **Lead Scoring** feature to it, one
stage at a time. Every stage has two branches: `NN_begin` (the state *before* the
step) and `NN_end` (the state *after*). You are on **`00_begin`**.

## 1. Where you are right now
- You have just cloned the repo.
- The STDD skills are installed (in `.claude/skills/`) but the repo is **not set up** for them yet.
- There is no issue tracker, no triage labels, and no agent docs.
- The app runs and the existing tests pass (3 service tests).

## 2. The problem to solve next
- The other skills expect a few things to exist first: a place to track issues, a set of triage labels, and domain docs.
- Your job in this stage is to **configure the repo** so those skills have what they need.

## 3. The command to run
```
/setup
```
Then, to see how the whole flow works:
```
/ask
```

> First time in the repo, run this once: `npm install`. Then confirm the baseline is green with `npm test` (you should see **3 tests pass**).

## 4. Steps to follow
1. Run `npm install`.
2. Run `npm test` and confirm 3 tests pass.
3. Run `/setup` — it wires up the issue tracker, the triage labels, and the agent docs.
4. Run `/ask` to get a tour of the flow you are about to follow.

## 5. What you should see (expected output)
- A new folder `docs/agents/` with three files:
  - `docs/agents/domain.md`
  - `docs/agents/issue-tracker.md`
  - `docs/agents/triage-labels.md`
- `CLAUDE.md` gains an **agent-skills** configuration block.
- No application code changes. Tests still pass (3 tests).

## 6. End state — how to check
```bash
git diff 00_begin..00_end     # the exact changes this stage should produce
git checkout 00_end           # jump straight to the finished version if you get stuck
```
When the stage is done, the repo is configured and ready for `/align`. Continue with stage 01.
