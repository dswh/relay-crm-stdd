---
Status: needs-triage
Type: bug
---

# BUG · a hot lead dropped below a fresh cold one

## Reported by

Priya (rep), in #relay-product:

> "Lead Scoring is live but the list looks wrong again. Hugo Martin replied and
> booked a demo last week — he's my hottest lead — but he's sitting *below* a brand
> new lead that's only opened one email. Thought we fixed the ordering?"

## What I expected

The list sorts by **score** (worth), highest first — that's the whole feature. A hot
lead should outrank a fresh-but-cold one regardless of who was active more recently.

## What happens

A lead with a recent activity but a low score sorts above a lead with an older last
activity but a high score. It *looks* like the old recency ordering sneaking back in.

## Notes

- The service tests are all green, so whatever it is, the tests don't see it.
- Run `/diagnose`: build a feedback loop that goes red on *this* symptom first
  (a hot, stale lead vs a fresh, cold one) before theorising.
