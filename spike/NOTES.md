# Spike notes — tier + decay state machine

> Throwaway. The **answer** is the only thing worth keeping — it folds into the
> spec and the decay issue (003). Delete `spike/` once that's done.

## Question (from /align)

Does the tier + decay model feel right when you actually push it?
- cold → warm → hot as the score climbs?
- does a hot lead cool sensibly when it goes quiet?
- does "14 idle days" behave at a day-boundary, or do we double-count?

## What we ran

`node spike/score-state-machine.mjs` — walks three scenarios and prints the full
state after each step. Weights `reply 10 · demo 8 · pricing 5 · open 1`; tiers
`hot ≥ 20 · warm 8–19 · cold < 8`; decay `−2/night after 14 idle days`.

## Answer

1. **The tier bands feel right.** A reply + a demo (10 + 8) lands a lead `hot`; a
   lone open (1) stays `cold`. The thresholds match a rep's intuition of who to chase.

2. **Decay must measure idleness from the last _activity_, not the last score
   change.** First naive model let a *decay* event reset the idle clock, so a lead
   only cooled once every 14 days instead of nightly. Fix: idle = days since last
   non-decay event. → a hot lead now cools hot → warm → cold over ~10 nights.

3. **Count idle in whole calendar days, reset by any activity.** At a day-boundary
   where the nightly job and a new activity land on the same date, the lead decays
   *once* (it was idle 14 days) and the activity then resets it — it does **not**
   decay twice. This is the rule to encode; raw 24h windows would double-count.

## Folds into

- **ADR 0001** (real-time vs nightly): confirms its decision — decay is the nightly
  exception (no change needed to the ADR).
- The **spec / issue 003 (nightly decay)** acceptance criteria — this is where the
  detailed rules land: "decay measured from last activity" and "no double-decay on
  the activity date".

Decision captured → `spike/` can be deleted. It is **not** on the main build line.
