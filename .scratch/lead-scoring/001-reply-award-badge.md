---
Status: ready-for-agent
Type: enhancement
Mode: afk
---

# 001 · reply → award → badge (tracer bullet)

## Parent

`.scratch/lead-scoring/PRD.md`

## What to build

The thinnest end-to-end path that proves every layer connects: when a lead replies
to an email, it earns score, the score is persisted as a `ScoreEvent`, and a score
badge shows on the lead list — which now sorts by score instead of recency.

Cuts through every layer: schema (`ScoreEvent`, repo methods) → service
(`scoringService`) → reply path (the reply hook) → UI (badge + sort). Demoable on
its own: click "Log reply" on a low lead and watch it gain points and climb.

## Mode

`afk`

## Acceptance criteria

- [ ] A `ScoreEvent { id, leadId, delta, reason, at }` type exists; `LeadRepo` gains
      `recordScoreEvent(event)` and `getScore(leadId)` (sum of deltas).
- [ ] `createScoringService(repo)` exposes `recordReply(leadId)` (awards +10) and
      `getScore(leadId)`.
- [ ] Recording a reply through the existing reply path also records the `ScoreEvent`.
- [ ] The lead list renders a score badge per row and is **sorted by score**, not recency.
- [ ] Test (through the `LeadRepo` seam): "a lead gains points when it replies to an
      email" → `getScore` returns 10. Existing service tests stay green.

## Blocked by

- None — can start immediately. This is the tracer bullet; everything else builds on it.
