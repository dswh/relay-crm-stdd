---
name: slice
description: Break a spec into independently-grabbable vertical-slice (tracer-bullet) issues on the project tracker.
disable-model-invocation: true
---

# Slice

Break a spec into independently-grabbable issues as **vertical slices (tracer bullets)** — a Kanban DAG one or many agents can pick up.

Issue tracker and triage labels should already be set — `/setup` if not.

## Process

### 1. Gather context

Work from the conversation. If the user passes an issue reference (number, URL, path), fetch it and read its full body and comments.

### 2. Explore / prefactor (optional)

If unexplored, explore. Titles and descriptions use the project's domain glossary and respect ADRs in the area. Prefactor where it helps: "make the change easy, then make the easy change."

### 3. Draft vertical slices

Each issue is a thin slice cutting through ALL layers end-to-end (schema → API → logic → UI → tests), NOT a horizontal slice of one layer. Horizontal coding gives zero feedback until the last layer lands; a vertical slice proves the whole stack connects on day one.

Example (Relay CRM, Lead Scoring): first tracer bullet = "a lead replies → scoringService awards points → persist a ScoreEvent → show a score badge on the lead list". Then expand: tiers → decay → retroactive backfill.

<vertical-slice-rules>

- Each slice delivers a narrow but COMPLETE path through every layer (schema, API, UI, tests)
- A completed slice is demoable or verifiable on its own
- Any prefactoring is done first
- The FIRST slice is the thinnest end-to-end path that proves all layers connect

</vertical-slice-rules>

### 4. Quiz the user

Present the breakdown as a numbered list. Per slice show:

- **Title** — short descriptive name
- **Mode** — `human-in-loop` or `afk` (can an agent do it unattended?)
- **Blocked by** — which slices must complete first
- **User stories covered**

Ask:

- Granularity right? (too coarse / too fine)
- Dependencies correct?
- Is the first slice a true end-to-end tracer bullet, or secretly horizontal? (If horizontal, reorder.)
- Should any slices merge or split?

Iterate until approved.

### 5. Publish

Publish each approved slice using the template below. These are AFK-ready — apply the correct triage label unless told otherwise. Publish in dependency order (blockers first) so "Blocked by" can reference real identifiers.

<issue-template>
## Parent

Reference to the parent issue/spec (if any; otherwise omit).

## What to build

Concise description of this vertical slice. Describe end-to-end behavior, not layer-by-layer implementation. Avoid file paths or code snippets — they go stale. Exception: a spike snippet encoding a precise decision (state machine, reducer, schema, type shape) may be inlined, trimmed to the decision-rich parts.

## Mode

`afk` or `human-in-loop`.

## Acceptance criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Blocked by

- Reference to the blocking ticket. Or "None — can start immediately".

</issue-template>

Do NOT close or modify any parent issue. Once shipped, retire issues (close them) rather than leaving stale specs to rot.
