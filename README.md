# Relay CRM — Stage 01 complete: Aligned on the design

Relay is a tiny CRM we add a **Lead Scoring** feature to, one stage at a time. You
are on **`01_end`** — the finished version of stage 01 (`/align`).

## What this stage produced
- `CONTEXT.md` (the glossary) grown with the agreed terms (score, tier, etc.).
- Two decision records: `docs/adr/0001-realtime-vs-nightly-scoring.md` and `docs/adr/0002-event-sourced-score.md`.
- Still no application code — alignment produces decisions, not code.

## What to do next
- Turn the decisions into a single spec:
  ```bash
  git checkout 03_begin
  ```
- Optional: if one decision still feels too fuzzy to spec, take the spike side-trip first (`git checkout 02_begin`).

See `DEMO-BRANCHES.md` for the full map of every stage.
