---
Status: ready-for-agent
Type: enhancement
Mode: afk
---

# 002 · tiers (hot / warm / cold)

## Parent

`.scratch/lead-scoring/PRD.md`

## What to build

Derive a **Tier** from a lead's score and show it as the badge's label/colour: a
*view* of the score, not a stored field. Launch defaults `hot ≥ 20 · warm 8–19 ·
cold < 8`. The list badge and the detail header both show the tier.

## Mode

`afk`

## Acceptance criteria

- [ ] `tierOf(score)` returns `hot` / `warm` / `cold` at the launch thresholds.
- [ ] The list-row badge shows the tier (label + colour), driven by the lead's score.
- [ ] The lead detail header shows the same tier badge.
- [ ] Tests through the seam: a lead at 20 is `hot`, at 8 is `warm`, at 7 is `cold`
      (boundary cases pinned).

## Blocked by

- 001 (needs `getScore` and the badge home).
