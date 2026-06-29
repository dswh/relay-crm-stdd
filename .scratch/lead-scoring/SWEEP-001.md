# Sweep — deepening candidates (after slice 001)

> `/sweep` scans for **shallow modules** and friction, using the `/deepen` vocabulary
> (module · interface · depth · seam · adapter · leverage · locality). The full visual
> report is written to `$TMPDIR/architecture-review-<timestamp>.html` — **never the
> repo**; this markdown is the captured summary.

## Candidate 1 — the split reply path  ·  Strong  ·  **deepened in this slice**

- **Files:** `services/leadService.ts`, `services/scoringService.ts`, `App.tsx`
- **Problem (shallow/leaky seam):** "a lead replied" was two calls — `logReply`
  (activity) + `scoring.recordReply` (score) — wired together only in the UI. Two
  call sites had to remember both; they could drift. **Deletion test:** removing the
  pairing scatters the invariant across every caller → real complexity, worth locality.
- **Solution:** one deep entry — `leadService.logReply` records the activity *and*
  awards score through the scoring module. Score reads also route through
  `scoringService` (one module owns scoring), instead of leadService reading the
  `ScoreEvent` ledger directly.
- **Benefit:** *locality* (the reply invariant lives in one place), *leverage* (one
  interface, `recordReply`/`getScore`, is the whole test surface). Resolves issue 005.

## Candidate 2 — getScore is a full ledger scan  ·  Worth exploring

- **Files:** `domain/leadRepo.ts`
- **Problem:** `getScore` sums the whole ScoreEvent ledger every call. Fine now;
  on the 40k backfill (issue 004) with full history, reads get heavy.
- **Solution (later):** materialise a cached total *behind the same interface* — ADR
  0002 explicitly leaves room for this; callers and tests don't change.
- Not done now: speculative until backfill lands. Left as a note on issue 004.

## Top recommendation

Candidate 1 — done. It removes a real drift risk and tightens the module that every
later slice (tiers, decay, backfill) builds on. Re-run `/sweep` after decay lands.
