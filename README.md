# Relay CRM — Stage 02: Spike an open question (side-trip)

Relay is a tiny CRM. Across this class we add a **Lead Scoring** feature to it, one
stage at a time. Every stage has two branches: `NN_begin` (before the step) and
`NN_end` (after). You are on **`02_begin`**.

> This stage is a **side-trip** off the main line (it branches from `01_end`). Take
> it when one decision is too fuzzy to write into a spec without proof. Then return
> to stage 03.

## 1. Where you are right now
- You are aligned: `CONTEXT.md` is grown and the ADRs are written.
- One question is still fuzzy: **how exactly should tier + decay behave over time** (when does a lead move hot → warm → cold)?
- You don't want to write that into the spec until you've seen it actually run.

## 2. The problem to solve next
- Answer that one open question with a small, **throwaway** experiment you can run.
- The goal is a decision you trust — the code is disposable, the learning is the asset.

## 3. The command to run
```
/spike
```
(You can also reach it through `/handoff`, which packages the question for a fresh agent.)

## 4. Steps to follow
1. Run `/spike` and point it at the open question (the tier + decay state machine).
2. Let it build a tiny runnable script that models the behaviour.
3. Run the script, read the results, and decide.
4. Write the **decision** down (it feeds the spec / ADR). Throw the code away.

## 5. What you should see (expected output)
- A `spike/` folder with throwaway artifacts:
  - `spike/score-state-machine.mjs` — the small runnable experiment
  - `spike/NOTES.md` — what you learned
  - `spike/HANDOFF.md` — the question and the answer, ready to fold back in
- No production code changes. The spike is meant to be deleted later.

## 6. End state — how to check
```bash
git diff 02_begin..02_end     # the exact changes this stage should produce
git checkout 02_end           # jump straight to the finished version if you get stuck
```
When the stage is done, the open question is settled. Return to the main line at stage 03 (`/write-spec`).
