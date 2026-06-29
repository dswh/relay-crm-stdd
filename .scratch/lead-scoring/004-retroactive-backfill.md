---
Status: ready-for-agent
Type: enhancement
Mode: human-in-loop
---

# 004 · retroactive backfill (~40k leads)

## Parent

`.scratch/lead-scoring/PRD.md` · ADR `docs/adr/0002`

## What to build

A one-off job that scores the ~40,000 existing leads from their **activity history**:
replay each lead's activities through the same scoring rules, appending the resulting
`ScoreEvent`s, so the feature is useful on day one and not only for new activity.
Off the critical path — run once after the live path ships.

## Mode

`human-in-loop` — a bulk one-off against real data; wants a human to dry-run on a
sample, check totals, and decide batching before the full run.

## Acceptance criteria

- [ ] A backfill routine replays a lead's historical activities into `ScoreEvent`s
      using the same weights as the live path.
- [ ] Running it is idempotent — re-running does not double-score a lead.
- [ ] A dry-run mode reports what *would* be written without persisting.
- [ ] Verified on a sample of leads: backfilled scores match a hand calculation.

## Blocked by

- 001 (the ledger + scoring rules), 002 (tiers, so backfilled leads land in the right band).
