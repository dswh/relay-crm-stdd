# Rejected — manual tier override

**Request:** let a rep pin a lead's tier by hand, regardless of score
(`inbox/manual-pin-tier.md`, Marcus).

**Decision:** wontfix for now. Explicitly **out of scope** in the Lead Scoring spec
(`.scratch/lead-scoring/PRD.md` → Out of Scope: "Manual tier override").

**Why recorded here:** so future triage doesn't re-litigate it. The score is meant
to be the *objective* signal; a manual pin reintroduces exactly the gut-feel ordering
the feature replaced. If we revisit, it needs its own `/align` on how a pin interacts
with decay and the digest — not a quick toggle.
