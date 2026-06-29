# Review — slice 001 (reply → award → badge)

> Run in a *fresh* context with the standards pushed in from `CLAUDE.md`. Prioritised
> list below; what isn't fixed now becomes a board issue (not silent scope creep).

## Must-fix

- **Quadratic re-sort on read.** `listLeads` called `repo.getScore` twice per
  comparison, and `getScore` scans the whole ScoreEvent ledger — fine for 28 seed
  leads, quadratic on the 40k backfill (issue 004). **Fixed in this slice:** score
  each lead once into a `Map`, then sort by the map.

## Should-fix → filed as issues

- **The reply path is split across two calls.** The Log-reply handler calls
  `service.logReply` *and* `scoring.recordReply` separately; a future caller could
  record the activity and forget the score (or vice-versa). → **issue 005**
  (a `/deepen` question: one path, scoring hangs off activity).

## Nits

- `getScore` returns 0 for an unknown lead while `recordScoreEvent` throws — the
  asymmetry is intentional (no events = score 0) but worth a one-line doc comment.

## Below the waterline (already on the board)

What review/QA can see coming, already covered by sliced issues — no new tickets:

- **Decay** of idle leads → issue 003 (and the `/spike` pinned the day-boundary rule).
- **Retroactive backfill** of 40k leads, and the read-performance it implies → issue 004.

## Verdict

Behaviour matches the slice's acceptance criteria; tests are behaviour-through-the-seam.
Must-fix applied, one should-fix filed. Ready for human QA.
