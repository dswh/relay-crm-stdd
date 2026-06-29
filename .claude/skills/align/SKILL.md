---
name: align
description: A relentless one-question-at-a-time interview that drives you and the agent to a shared design concept before any code. The front door to STDD. Use to stress-test a plan, design, or idea — or on any "grill"/"align" trigger.
---

# Align

Interview the user relentlessly about the plan until you reach a **shared design
concept** — you and the agent aligned on what you're building, why, and where the
edges are. That alignment, not a document, is the asset the rest of STDD builds on.

## Rules

- **One question at a time.** Wait for the answer before the next. Several at once is bewildering.
- **Walk the design tree.** Resolve dependencies between decisions one branch at a time.
- **Always recommend an answer.** Momentum beats a blank page; the user corrects or confirms.
- **Self-answer from the code.** If exploring the codebase settles a question, explore instead of asking.

## In a repo — keep the model current

Inside a codebase, `align` is the **front door** and it's stateful: as alignment
crystallises, capture it inline with `/model` — sharpen fuzzy terms into the
glossary (`CONTEXT.md`) and record hard-to-reverse decisions as ADRs. Use the
project's existing domain language throughout.

Keep `align → /write-spec → /slice` in **one unbroken context window** (the smart
zone) so the spec and issues build on the same thinking. If a question needs a
runnable answer (a state machine you must push on, a UI you must see), detour
through `/spike`, then fold the answer back in.

## No repo / stateless

With no codebase yet (or when you don't want to persist anything), run the same
interview without the `/model` doc-keeping — just reach the shared design concept,
then take it into `/write-spec`.
