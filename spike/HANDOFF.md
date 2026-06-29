# Handoff — /align → /spike → back

> **Showcase copy.** A real `/handoff` doc is written to the OS temp dir, never the
> workspace. It's kept here only so the class can see what crossed the context
> boundary. STDD prefers to **clear, not compact**: fork the thinking into a doc and
> open a *fresh* session against it (back in the smart zone).

## Why we forked

The `/align` session reached a shared design concept for Lead Scoring, but one
question needed a *runnable* answer rather than more talk: **does the tier + decay
state machine actually feel right?** Pushing a state machine through edge cases on
paper is unreliable — so we handed off into a fresh `/spike` session.

## Suggested skills for the next session

- `/spike` — build the throwaway state-machine driver, answer the question.
- `/handoff` — when done, fork *back* with only the answer (see `NOTES.md`).

## What to carry back (and nothing else)

Don't carry the spike code back — carry the **answer** in `NOTES.md`:
idle-from-last-activity, calendar-day count, no double-decay at a boundary. That
answer lands in the decay issue (003) and the spec (ADR 0001's nightly-decay
decision already stands); then `spike/` is deleted.

## Already recorded elsewhere (don't duplicate)

- Vocabulary → `CONTEXT.md`
- Real-time-vs-nightly + event-sourcing → `docs/adr/0001`, `docs/adr/0002`
