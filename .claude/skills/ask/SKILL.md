---
name: ask
description: Ask which STDD skill or flow fits your situation. A router over the skills in this repo.
disable-model-invocation: true
---

# Ask

You don't remember every skill, so ask. A **flow** is a path through the skills.
Most work runs along one **main flow**; a couple of **on-ramps** merge onto it; the
rest are standalone.

## Main flow: idea → ship

1. **`/align`** — sharpen the idea by relentless interview until you reach a shared
   design concept. The front door. In a repo it's stateful (maintains `CONTEXT.md`
   + ADRs via `/model`); with no repo it's stateless.
2. **Branch — can every question be settled in conversation?** If one needs a
   runnable answer (state, business logic, a UI you must see), detour through a
   spike, bridged by **`/handoff`** both ways: `/handoff` out → fresh session →
   **`/spike`** (throwaway code) → `/handoff` back what you learned.
3. **Branch — multi-session build?**
   - **Yes** → **`/write-spec`** (turn the thread into a spec) → **`/slice`** (split
     it into independently-grabbable vertical slices). Then **clear context between
     each issue**: fresh session per issue, kick off **`/build`** with the spec + the
     single issue.
   - **No** → **`/build`** right here, same window.

**Context hygiene:** keep steps 1–3 in one unbroken window — don't compact or clear
until after `/slice` — so align, spec, and issues build on the same thinking. Each
`/build` starts fresh. The limit is the **smart zone** (~120k tokens): approaching it
before `/slice`, `/handoff` and continue fresh rather than push on degraded.

## On-ramp

- **Bugs/requests piling up** → **`/triage`**. Moves issues through triage roles into
  agent-ready briefs that `/build` later picks up. Only for issues **you didn't
  create** — issues from `/slice` are already agent-ready.

## Codebase health

- **`/sweep`** — run whenever you have a spare moment to keep the codebase good for
  agents. Surfaces deepening opportunities; picking one generates an idea you take
  back into `/align`.

## Build & review (inside `/build`)

- **`/tdd`** — red → green → refactor, one vertical slice at a time.
- **`/review`** — automated review in a fresh context, standards pushed in, before human QA.
- **`/deepen`** / **`/model`** — pulled by other skills for deep-module and glossary vocabulary.
- **`/diagnose`** — stuck on a bug: build a tight failing loop first, then hypothesise.

## Advanced (AFK & parallel)

- **`/afk`** — autonomous night-shift loop over your AFK-tagged backlog, sandboxed.
- **`/swarm`** — fan out agents across independent issues, then review + merge.

Use these once the human-in-the-loop flow is solid and your acceptance criteria are
sharp — vague specs break autonomous loops immediately.

## Crossing sessions

- **`/handoff`** — fork the conversation into a file and continue in a *new* session.
- **`/compact`** (built-in) — stay in the same conversation, summarising earlier turns.
  Use only at intentional breaks between phases, never mid-phase.

## Precondition

**`/setup`** — run once before your first flow to configure the issue tracker, triage
labels, and doc layout the other skills assume.
