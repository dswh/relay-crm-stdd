---
name: review
description: Fresh-context code review of a diff against the standards. Run after implementing, before human QA.
---

# Review

A cheap, high-value pass that catches bugs before a human looks. Models review well — but only in the smart zone.

## Run it in a fresh context

The agent that just implemented is at the tired tail of its context — it reviews in the dumb zone. **Clear the context (or start a fresh session) before reviewing**, so the reviewer reasons sharply over the diff and the standards. Never review in the window you implemented in.

## Push the standards in

Standards are **pushed**, not pulled, for review: hand the reviewer the diff *and* the standards (`CLAUDE.md` rules, relevant skills, conventions). The implementer may pull on demand; the reviewer should have them in front of it. (See "push vs pull" in `CONTEXT.md`.) Consider a stronger model for review than for implementation.

## What to check

- **Behavior vs spec** — does the diff satisfy the spec's acceptance criteria, and nothing it shouldn't (scope creep)?
- **Tests** — testing behavior through public interfaces, or coupled to implementation? Do they exercise the new path? (See `/tdd`.)
- **Module shape** — modules kept deep, or shallow pass-throughs and leaky seams? (See `/deepen`.)
- **Edge cases & error states** the happy path skipped.
- **Domain language** — names match `CONTEXT.md`; no new jargon for existing concepts (e.g. Relay's "Lead Scoring").
- **Footguns** — auth/permission gaps, missing input validation, N+1s, anything irreversible.

## Output

A prioritized list: must-fix → should-fix → nits. For must-fix, point at the behavior and why it's wrong, not just the line. Findings not fixed now become issues on the board.

Review catches what's below the waterline; QA imposes taste on top.
