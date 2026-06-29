---
Status: ready-for-agent
Type: enhancement
Mode: afk
---

# 005 · unify the reply path (review finding)

## Parent

`.scratch/lead-scoring/PRD.md` · review `.scratch/lead-scoring/REVIEW-001.md`

## What to build

Today the Log-reply handler records the activity (`leadService.logReply`) and awards
score (`scoringService.recordReply`) as two separate calls. They can drift — a caller
might do one and not the other. Make the reply path a single call so activity and
score can't get out of sync. This is a `/deepen` question: the cleanest shape is
probably scoring reacting to a recorded activity, so there's one way to "log a reply".

## Mode

`afk`

## Acceptance criteria

- [ ] There is a single entry point for "a lead replied" that both records the
      activity and awards score.
- [ ] It's impossible to record a reply activity without the matching ScoreEvent
      (no two-call drift).
- [ ] Behaviour unchanged from a caller's view: the existing tests stay green.

## Blocked by

- None — refactor on top of 001.
