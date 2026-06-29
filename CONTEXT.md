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

<!-- Lead Scoring terms — earned in /align, written down with /model: -->

**Score** — how worth-chasing a lead is *right now*: the running sum of its
`ScoreEvent`s. Distinct from **Status** (pipeline stage).

**ScoreEvent** — an immutable record that a lead's score changed by a `delta`, for a
`reason` (the `ActivityKind` that earned it), at a time. A **Score** is the sum of
them. _Avoid_: "event" alone — it collides with **Activity**; say ScoreEvent.

**Tier** — a coarse band derived from a **Score**: `hot` / `warm` / `cold` (launch
thresholds hot ≥ 20 · warm 8–19 · cold < 8). Per-rep tuning is out of scope for v1.

**Decay** — the gradual cooling of a **Score** when a lead has no activity, so stale
leads stop looking hot.

**Backfill** — retroactively scoring the ~40,000 existing leads from their activity
history.
