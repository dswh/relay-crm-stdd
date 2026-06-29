---
name: build
description: Build one spec slice end-to-end, test-first. Use when the user wants to build a specced feature with TDD, type checks, review, and a commit.
---

# Build

Build one vertical slice from the spec. This is where the human steps back and the
agent does the work — start it in a **fresh context window** (the smart zone), pass
it the spec plus the single issue, and let it run.

## Inputs

- The **spec** (destination) and **one issue** (the slice). Handed a whole backlog,
  pick the next unblocked issue — prefer the tracer-bullet slice that proves all
  layers, then `afk`-tagged work by priority.
- The domain glossary (`CONTEXT.md`) and any ADRs in the area.

## Loop

1. **Explore** just enough to place the change. Read `CONTEXT.md` so names match the
   domain language.
2. **Build test-first** with `/tdd`: one behavior at a time, RED → GREEN, vertical
   slices through every layer. Don't write all tests then all code.
3. **Run the feedback loops continuously** — types and the relevant test file after
   each slice, the full suite at the end. The feedback loop is the agent's eyesight;
   weak loop, weak output.
4. **Keep modules deep** (`/deepen`): a small interface over real behaviour, testable
   at that interface. Don't scatter shallow helpers.
5. **Self-review** with `/review` in a *fresh* context, so the reviewer reasons in the
   smart zone, not the tired tail of implementation.
6. **Commit** per slice — atomic, one per slice, with a message stating what was built
   and any deviation from the plan.

## Done

The issue's acceptance criteria pass, types are green, the suite is green, and a human
can QA it. Example: "a lead gains points when it replies to an email" works end-to-end
in Relay's Lead Scoring. Anything QA turns up becomes a *new* issue — don't silently
expand this slice.

## Notes

- Build is the AFK-friendly stage. Run it unattended over a backlog with `/afk`;
  parallelise across independent issues with `/swarm`.
- Stuck on a bug? Switch to `/diagnose` — build a tight failing loop before theorising.
