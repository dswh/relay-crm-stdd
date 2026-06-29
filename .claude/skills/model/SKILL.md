---
name: model
description: Actively build and sharpen the project's domain model — the glossary (CONTEXT.md) and ADRs (docs/adr/). Pulled by /align, /sweep, and /triage.
---

# Model

This is the *active* discipline: challenge terms, invent edge-case scenarios, and write the glossary and decisions down the moment they crystallise. (Merely *reading* `CONTEXT.md` for vocabulary is a one-line habit any skill can do — this skill is for changing the model, not consuming it.)

## File structure

Most repos have a single context:

```
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-event-sourced-lead-scores.md
│   └── 0002-nightly-decay-job.md
└── src/
```

If a `CONTEXT-MAP.md` exists at the root, the repo has multiple contexts; the map points to where each one lives (per-context `CONTEXT.md` + `docs/adr/`). Create files lazily — only when you have something to write.

## During the session

- **Challenge against the glossary.** When a term conflicts with `CONTEXT.md`, call it out: "Your glossary defines 'cancellation' as X, but you seem to mean Y — which is it?"
- **Sharpen fuzzy language.** Propose a precise canonical term: "You say 'account' — do you mean the Customer or the User? Those are different things."
- **Discuss concrete scenarios.** Stress-test relationships with specific edge-case scenarios that force precision about boundaries between concepts.
- **Cross-reference with code.** If the code disagrees with what the user just said, surface the contradiction.
- **Update `CONTEXT.md` inline.** When a term resolves, write it down right there — don't batch.

`CONTEXT.md` is a glossary and nothing else — totally devoid of implementation details. Not a spec, not a scratchpad.

### CONTEXT.md entry format

```markdown
**Term** — one-sentence definition in domain language. Optionally: _Avoid_: words that mean something else.
```

## Offer ADRs sparingly

Only offer an ADR when all three are true:

1. **Hard to reverse** — changing your mind later is costly.
2. **Surprising without context** — a future reader will wonder "why this way?"
3. **A real trade-off** — there were genuine alternatives and you picked one for reasons.

If any is missing, skip it.

### ADR format

```markdown
# NNNN — <decision title>

## Status
Accepted | Superseded by NNNN

## Context
What forced a decision; the constraints and alternatives.

## Decision
What we chose.

## Consequences
What this makes easy, what it makes hard, what we're now committed to.
```
