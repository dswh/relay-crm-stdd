---
Status: ready-for-agent
Type: enhancement
Feature: lead-scoring
---

# Lead Scoring — spec

> The destination document. Synthesised from the `/align` session — not re-interviewed.
> A living hint of direction, not a contract to perfect. Vocabulary: `CONTEXT.md`.
> Decisions already locked: `docs/adr/0001`, `docs/adr/0002`.

## Problem Statement

Reps work leads in whatever order they feel like, so hot leads go cold. Relay's list
is ordered only by **recency**, which is not the same as *worth* — a brand-new lead
that did nothing sits above a lead that replied and booked a demo. Reps can't see at
a glance who to chase first.

## Solution

Give every lead a **Score** that reflects how worth-chasing it is right now, derived
from its **Activity**, and sort the list by it. Surface a **Tier** badge (hot / warm
/ cold) so the right call is obvious. Scores rise in real time as activity lands and
**Decay** when a lead goes quiet, so the order stays honest without anyone tending it.

## User Stories

1. As a rep, I want a lead's **Score** to rise the moment it replies to an email, so I can call the hottest leads first.
2. As a rep, I want the leads list **sorted by score**, not recency, so the order reflects worth.
3. As a rep, I want a **tier badge** (hot/warm/cold) on each list row, so I can triage at a glance without reading numbers.
4. As a rep, I want the same badge on the **lead detail header**, so the tier is visible while I work the lead.
5. As a rep, I want different activities to count differently (a reply means more than an open), so the score tracks real buying intent.
6. As a rep, I want a lead to **cool over time** when nothing happens, so stale leads stop masquerading as hot.
7. As a rep, I want a lead that just replied to **immediately reclaim** its score, so decay never punishes an active lead.
8. As a sales manager, I want **launch-default thresholds** for the tiers, so the team shares one definition of "hot".
9. As a rep, I want to understand **why** a lead is hot (which activities earned it), so I can prepare for the call. *(enabled by the ScoreEvent ledger; surfaced later)*
10. As a sales manager, I want our **~40,000 existing leads** scored from their history, so the feature is useful on day one and not only for new activity.

## Implementation Decisions

- **Event-sourced score** (ADR 0002). Persist immutable `ScoreEvent { id, leadId,
  delta, reason, at }`; `Score = sum of deltas`. No stored mutable total.
- **Real-time on activity; nightly only for decay** (ADR 0001). Recording an activity
  appends a `ScoreEvent` synchronously. Decay is the nightly exception.
- **Scoring lives behind one deep module** — `createScoringService(repo)` over the
  `LeadRepo` seam (`/deepen`). Interface: `recordReply(leadId)` (and siblings per
  kind) + `getScore(leadId)`. The interface is the test surface.
- **Weights** (rep-tunable later, placeholders now): `email_reply 10 · demo_booked 8
  · pricing_visit 5 · email_open 1`.
- **Tiers** are a *view* of the score, not a stored field: `hot ≥ 20 · warm 8–19 ·
  cold < 8` (launch defaults).
- **Decay** = −2/night after 14 idle days, idleness measured from the last *activity*
  and counted in whole calendar days, reset by any activity (from the `/spike` —
  avoids double-decay at a day boundary).
- **`LeadRepo` gains** `recordScoreEvent(event)` and `getScore(leadId)`; the list
  read sorts by score.

## Testing Decisions

- Test **behaviour through the `LeadRepo` seam**, never internals — mirror
  `src/services/leadService.test.ts`. A test reads like a story: "a lead gains points
  when it replies to an email."
- Drive the scoring service through `makeTestRepo`; assert on `getScore` and list
  order, not on which method was called.
- Modules tested: `scoringService` (scoring + tiers + decay) and the list sort.
- Prior art: the existing recency sort test in `leadService.test.ts`.

## Out of Scope

This is the **definition of done** — guard it. Anything below becomes a *new* issue,
not silent scope creep.

- **Manual tier override** — a rep pinning a lead's tier regardless of score.
- **Per-rep / per-team threshold tuning** — launch defaults only.
- **Weight configuration UI** — weights are constants for v1.
- **Notifications** when a lead turns hot.
- **Analytics / reporting** on score distribution.

## Further Notes

- The first tracer bullet is the thinnest end-to-end path: *a lead replies → score
  awarded → ScoreEvent persisted → badge on the list*. Then expand: tiers → decay →
  retroactive backfill. See the issues from `/slice`.
- Backfill of the 40k existing leads is off the critical path: a one-off job, run
  once after the live path ships.
