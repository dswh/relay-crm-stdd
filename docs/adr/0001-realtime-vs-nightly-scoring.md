# 0001 — Score in real time on activity; nightly only for decay

## Status

Accepted

## Context

A lead's **Score** can be recomputed two ways: **real-time** (the moment an
activity lands) or in a **nightly batch**. Reps need the list to reflect a hot lead
*immediately* after it replies — a batch would leave the order stale for up to a
day, which is the exact "hot ones go cold" problem we're fixing. But **Decay** is
time-based: a lead cooling after 14 idle days has *no* triggering activity, so there
is nothing to hang a real-time recompute on.

## Decision

**Real-time on activity.** When an activity is recorded, the scoring service
appends a `ScoreEvent` synchronously, so the score and list order update at once.
The reply → award → badge tracer bullet is therefore purely event-driven.

**Decay is the one exception** — it has no triggering activity, so it runs as a
**nightly batch** that appends negative `ScoreEvent`s to idle leads. Both paths write
through the same `ScoreEvent` ledger (see [0002](./0002-event-sourced-score.md)).

## Consequences

- **Easy:** fresh scores with no staleness window; the live path needs no scheduler.
- **Hard:** we own a nightly job for decay, and there are two write paths — but they
  converge on one ledger, so there is still a single source of truth.
- Retroactive **Backfill** of the ~40k existing leads is neither path: a one-off
  job, off the critical path, run once after launch.
