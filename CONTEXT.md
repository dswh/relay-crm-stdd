# CONTEXT — Relay glossary

The shared language for the Relay domain. Skills use these terms exactly. This is
a glossary, not a spec — no implementation details.

> Grow this file during the session: when `/align` sharpens a fuzzy term, or you
> introduce a new concept for Lead Scoring (score, tier, decay…), write it down
> here with `/model`.

**Lead** — a prospective customer Relay is trying to win. Has an owner (a rep), a
status, and a stream of activity. Today the list is ordered only by *recency*.

**Activity** — a recorded thing a lead did, of a fixed `ActivityKind`. The raw
material a score would be computed from.

**ActivityKind** — `email_reply`, `email_open`, `demo_booked`, `pricing_visit`,
`call_logged`. They differ in how much buying intent they signal — deciding which
ones score is an `/align` question. _Avoid_: "event" (too generic; say activity).

**Owner** — the rep responsible for a lead (`priya`, `sam`). Not the same as the
lead's company contact.

**Status** — pipeline stage: `new`, `working`, `qualified`. Distinct from any
score/tier — status is where the rep is in the process; score is how worth-chasing
the lead is right now.

**LeadRepo** — the data seam for leads and activities. Services and tests cross it;
it *is* the test surface. See `/deepen`.

<!-- Terms to be added during the build (don't pre-fill — earn them in /align):
**Score**, **Tier** (hot/warm/cold), **ScoreEvent**, **Decay**, **Backfill**. -->
