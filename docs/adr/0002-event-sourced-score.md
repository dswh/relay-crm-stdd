# 0002 — Event-source the score (a ScoreEvent ledger), don't store a total

## Status

Accepted

## Context

We can persist a lead's **Score** as a single mutable total on the lead, or as an
append-only ledger of **ScoreEvent**s summed on read. The total is cheaper to read;
the ledger keeps history. Three forces push on this: reps want to know *why* a lead
is hot (which activities earned it); **Decay** and **Backfill** both produce many
score changes over time; and real-time writes (0001) must not clobber each other.

## Decision

**Event-source the score.** Persist immutable `ScoreEvent { id, leadId, delta,
reason, at }` records. `Score = sum of deltas`; `getScore(leadId)` sums the ledger.
There is no stored total to keep in sync.

## Consequences

- **Easy:** a full audit trail (every reason a lead is hot); Decay and Backfill are
  just more `ScoreEvent`s, not special cases; concurrent activity writes append
  rather than race on a counter; and the whole thing is testable through the
  `LeadRepo` seam — `recordScoreEvent` then assert `getScore`.
- **Hard:** `getScore` is a sum over history. Fine at Relay's size; if the 40k ×
  full-history backfill ever makes reads slow, materialise a cached total *behind*
  the same interface — callers and tests don't change.
