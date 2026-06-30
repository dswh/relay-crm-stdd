# Relay CRM — Stage 03: Write the spec

Relay is a tiny CRM. Across this class we add a **Lead Scoring** feature to it, one
stage at a time. Every stage has two branches: `NN_begin` (before the step) and
`NN_end` (after). You are on **`03_begin`**.

## 1. Where you are right now
- You are aligned and the decisions are recorded: `CONTEXT.md` is grown and the ADRs are written.
- If you took the `/spike` side-trip, the open tier/decay question is also settled.
- The thinking is done — but it's **spread across** the glossary, the ADRs, and the alignment thread.

## 2. The problem to solve next
- A builder can't follow scattered notes.
- Your job is to **gather everything into one spec** (a PRD) that the build can follow directly. No new interview — just synthesise what you already decided.

## 3. The command to run
```
/write-spec
```

## 4. Steps to follow
1. Run `/write-spec`.
2. It reads `CONTEXT.md`, the ADRs, and the alignment, and writes them up as one document.
3. Skim the PRD and confirm it matches what you agreed — especially what is **out of scope**.

## 5. What you should see (expected output)
- One new file:
  - `.scratch/lead-scoring/PRD.md`
- It states the goal, the in-scope behaviour, the out-of-scope list, and the decisions from the ADRs.
- No application code yet.

## 6. End state — how to check
```bash
git diff 03_begin..03_end     # the exact changes this stage should produce
git checkout 03_end           # jump straight to the finished version if you get stuck
```
When the stage is done, you have a single spec to build from. Continue with stage 04 (`/slice`).
