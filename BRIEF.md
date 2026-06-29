# The brief

> This is the **only** requirement you start with. It's a real Slack message —
> vague, with a dozen hidden decisions baked in. Do **not** start coding. Run
> `/align` and let it interview you until you reach a shared design concept.

---

**#relay-product** · **Marcus Lee**, Head of Sales · today, 9:14 AM

> Reps work leads in whatever order they feel like and the hot ones go cold. Can we
> add **lead scoring** — sort the list by who's worth calling first, maybe
> hot/warm/cold. Make it obvious who to chase.

---

## What this brief does NOT say (the alignment surfaces it)

These are the kinds of questions `/align` should drive out — don't answer them
here, answer them in the interview:

- **Which signals score, and how much?** Email reply, email open, demo booked,
  pricing-page visit, logged call — they're not equal. Which count? What weights?
- **Real-time or nightly?** Recompute the moment a reply lands, or in a batch?
- **Retroactive?** There are ~40,000 existing leads with history. Do they get
  scored on day one, or only new activity from launch?
- **Where does the score show?** A badge on the list row, the detail header, both?
- **Decay.** A lead with no activity should cool over time — or should it?
- **Tiers.** What are the hot / warm / cold thresholds? Who decides them?
- **Manual override.** Can a rep pin a lead's tier regardless of score?

## The thinnest first slice (where you'll start building)

Once aligned and specced, the **first tracer bullet** is the thinnest end-to-end
path that proves every layer connects:

> a lead replies to an email → `scoringService` awards points → persist a
> `ScoreEvent` → show a score badge on the lead list.

Touches schema · service · event path · UI — demoable on day one. Then expand:
**tiers → decay → retroactive backfill.**

## Where things live today

- `src/domain/` — `Lead`, `Activity`, and the `LeadRepo` seam (the test surface).
- `src/services/leadService.ts` — lists leads **by recency** (the bug: recency ≠ worth).
- `src/ui/` — the leads table and detail panel. The badge has a marked home in both.
- There is **no** score, tier, or `ScoreEvent` yet. That's the feature.
