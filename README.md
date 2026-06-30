# Relay CRM — Stage 01: Align on the design

Relay is a tiny CRM. Across this class we add a **Lead Scoring** feature to it, one
stage at a time. Every stage has two branches: `NN_begin` (before the step) and
`NN_end` (after). You are on **`01_begin`**.

## 1. Where you are right now
- The repo is set up: the issue tracker, triage labels, and agent docs all exist.
- You have one thing to start from: a short, messy brief in `BRIEF.md` (a real Slack message asking for "lead scoring").
- You have **no plan and no code** for the feature yet.

## 2. The problem to solve next
- The brief is vague. It hides a dozen decisions (which signals score, how much, real-time or nightly, where the score shows, decay, tiers, manual override).
- Your job is to **turn the brief into a shared design concept** — surface those decisions and agree on answers. Do **not** start coding.

## 3. The command to run
```
/align add lead scoring (use BRIEF.md)
```

## 4. Steps to follow
1. Read `BRIEF.md` first.
2. Run the `/align` command above.
3. Answer its interview questions one at a time — it drives out the hidden decisions.
4. As you go, it grows the domain glossary and records each decision as an ADR.

## 5. What you should see (expected output)
- `CONTEXT.md` (the glossary) is **grown** with the new terms you agreed on (score, tier, etc.).
- Two new decision records:
  - `docs/adr/0001-realtime-vs-nightly-scoring.md`
  - `docs/adr/0002-event-sourced-score.md`
- **Still no application code** — alignment produces decisions, not code.

## 6. End state — how to check
```bash
git diff 01_begin..01_end     # the exact changes this stage should produce
git checkout 01_end           # jump straight to the finished version if you get stuck
```
When the stage is done, the design is agreed and written down. Continue with stage 03 (`/write-spec`). Stage 02 is an optional `/spike` side-trip you can take first.
