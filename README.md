# Relay CRM — Stage 09: Triage the inbox (side-demo)

Relay is a tiny CRM. Across this class we add a **Lead Scoring** feature to it, one
stage at a time. Every stage has two branches: `NN_begin` (before the step) and
`NN_end` (after). You are on **`09_begin`**.

> This is a **side-demo** built on the finished feature (`07_end`) plus a raw inbox.

## 1. Where you are right now
- You are on the working scoring code from stage 07.
- Three raw requests have landed in `.scratch/inbox/`:
  - a new feature ask (a weekly digest),
  - a near-duplicate of work you've already planned,
  - a manual tier-override request.
- They are unsorted and not ready for anyone to build.

## 2. The problem to solve next
- A messy inbox stalls the team.
- Your job is to **triage** each request: decide what's in and what's out, and turn the accepted ones into agent-ready briefs.

## 3. The command to run
```
/triage
```

## 4. Steps to follow
1. Run `/triage`.
2. For each inbox item: categorise it and set a state.
3. Write a clear, agent-ready brief for what you accept.
4. Send rejected items to `.out-of-scope/` with a reason. **Don't touch the existing `/slice` issues (001–005).**

## 5. What you should see (expected output)
- One accepted, agent-ready issue: `.scratch/lead-scoring/006-weekly-digest.md`.
- A rejected request moved out: `.out-of-scope/manual-tier-override.md` (with the reason).
- The near-duplicate resolved against the existing plan; the inbox cleared.
- No application code changes — this stage is about sorting work, not building it.

## 6. End state — how to check
```bash
git diff 09_begin..09_end     # the exact changes this stage should produce
git checkout 09_end           # jump straight to the finished version if you get stuck
```
When the stage is done, the inbox is empty: in-scope work is briefed and out-of-scope work is parked with a reason.
