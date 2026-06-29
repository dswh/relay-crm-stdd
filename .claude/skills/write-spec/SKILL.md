---
name: write-spec
description: Synthesize the current conversation into a spec and publish it to the issue tracker. No interview — just write down what you already decided.
disable-model-invocation: true
---

# Write-Spec

Turn the current conversation and codebase understanding into a spec — the **destination document**. Do NOT interview; you already ran /align. Just synthesise. The spec is a living hint of direction, not a contract to perfect.

Issue tracker and triage label vocabulary should already be provided — /setup if not.

## Process

1. Explore the repo for current state, if you haven't. Use the domain glossary (`CONTEXT.md`) vocabulary throughout, and respect ADRs in the area you touch.

2. Sketch the **seams** at which you'll test. Prefer existing seams; use the highest possible. Propose any new seams at the highest point you can — fewer seams is better, one is ideal. Confirm the seams match the user's expectations. (Seam/depth vocabulary: /deepen.)

3. Write the spec from the template below, then publish to the issue tracker. Apply the `ready-for-agent` triage label — no further triage.

<spec-template>

## Problem Statement

The problem the user faces, from the user's perspective.

## Solution

The solution, from the user's perspective.

## User Stories

A LONG, numbered list, each:

1. As an <actor>, I want a <feature>, so that <benefit>

<user-story-example>
1. As a sales rep, I want a lead's score to rise the moment it replies to an email, so I can call the hottest leads first.
</user-story-example>

Be extensive — cover all aspects.

## Implementation Decisions

May include:

- Modules built/modified, and their interfaces
- Technical clarifications from the developer
- Architectural decisions, schema changes, API contracts, specific interactions

No file paths or code snippets — they go stale. Exception: a spike-produced snippet encoding a decision more precisely than prose (state machine, reducer, schema, type shape) may be inlined in the relevant decision, trimmed to the decision-rich parts and noted as spike-sourced.

## Testing Decisions

- What makes a good test here (test external behaviour through public interfaces, not implementation details)
- Which modules will be tested
- Prior art (similar tests in the codebase)

## Out of Scope

What is explicitly NOT being built. This is your definition of done — guard it.

## Further Notes

Anything else worth recording.

</spec-template>

Don't re-read the spec obsessively to "perfect" it — you reached the shared design in /align. Spend effort on QA, not spec polishing.
