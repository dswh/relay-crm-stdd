# Relay CRM

A tiny CRM, and the live-build starter for the **STDD master class**. The goal of
the session is to ship **Lead Scoring** end-to-end — from a messy Slack brief to a
working feature — using the STDD skills installed in this repo.

Start by reading [`BRIEF.md`](./BRIEF.md), then run `/align`.

## Agent skills

This repo is pre-configured for the STDD skills (`/setup` has already been run).

### Issue tracker
Issues live as **local markdown** under `.scratch/<feature>/NNN-title.md` (no
GitHub needed — clone and go). See `docs/agents/issue-tracker.md`.

### Triage labels
The five canonical triage roles map to their own names (`needs-triage`,
`needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See
`docs/agents/triage-labels.md`.

### Domain docs
Single-context: `CONTEXT.md` (glossary) + `docs/adr/` (decisions) at the root.
Skills read these before touching an area. See `docs/agents/domain.md`.

## Coding standards

These are **pushed** to `/review` (the reviewer compares the diff against them).
Implementers may pull them on demand.

- **TypeScript, strict.** No `any`. Model the domain with precise types; let the
  compiler carry invariants.
- **Test behaviour through public interfaces**, never internals. A good test reads
  like a line from the spec and survives a refactor. Drive services through the
  `LeadRepo` seam; assert on observable outcomes, not on which method was called.
  See `src/services/leadService.test.ts` for the pattern.
- **Deep modules.** Small interface, real behaviour behind it. Don't scatter
  shallow pass-through helpers. The interface is the test surface (`/deepen`).
- **Vertical slices.** Build a thin path through every layer (schema → service →
  UI) before widening any one layer. No "all the types, then all the UI."
- **Use the domain language** from `CONTEXT.md`. If you introduce a new concept
  (e.g. a score, a tier), add it to the glossary as you go (`/model`).
- **Atomic commits**, one per slice, present-tense imperative subject. State any
  deviation from the spec in the body.
- **Out-of-scope is the definition of done.** Anything QA turns up becomes a *new*
  issue in `.scratch/`, not silent scope creep.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173 — the Relay leads list
npm test           # vitest — the existing service tests are green
npm run typecheck
```
