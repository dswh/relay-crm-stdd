---
Status: done
Type: enhancement
Mode: human-in-loop
---

> **Done** — built in the `/swarm` wave (branch `relay/003-decay`). `decayService`
> with the spike's rules: idle-from-last-activity, whole calendar days, −2/night,
> floor at 0; `ScoreEvent.reason` widened to include `decay`.

# 003 · nightly decay

## Parent

`.scratch/lead-scoring/PRD.md` · ADR `docs/adr/0001` (decay rules absorbed from a throwaway `/spike`)

## What to build

A nightly job that cools idle leads by appending negative `ScoreEvent`s (−2/night)
once a lead has had no **activity** for 14 days. Idleness is measured from the last
*activity* (a decay `ScoreEvent` must not reset it) and counted in whole calendar days,
reset by any activity — so a lead never decays twice on the same date.

## Mode

`human-in-loop` — touches a scheduled job and time handling; wants a human eye on
the timezone/rollover behaviour before it runs against real data.

## Acceptance criteria

- [ ] A decay pass appends a −2 `ScoreEvent { reason: "decay" }` to each lead idle ≥ 14 days.
- [ ] Idleness is measured from the last non-decay `ScoreEvent`; consecutive nights keep cooling.
- [ ] An activity on the same date as a decay pass resets idleness — no double-decay.
- [ ] A lead's score never goes below 0 via decay.
- [ ] Tests through the seam reproduce the spike's scenarios (cool hot→warm→cold; day-boundary).

## Blocked by

- 001 (needs the `ScoreEvent` ledger and `getScore`).
