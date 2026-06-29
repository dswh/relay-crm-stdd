---
name: spike
description: Build a throwaway spike to settle a design question — a runnable terminal app for state/logic questions, or several radically different UI variations on one route.
disable-model-invocation: true
---

# Spike

A spike is throwaway code that answers a question. The question decides the shape.

Spike off an /align session when a question needs a runnable answer — a state machine you have to push on, a UI you have to see. Build the smallest thing that answers it, learn, fold the answer back in, delete the code.

## Pick a branch

Identify the question — from the prompt, the surrounding code, or by asking:

- **"Does this logic / state model feel right?"** → tiny interactive terminal app that pushes the state machine through cases hard to reason about on paper. _E.g. a lead-score state machine: cold→warm→hot, decaying without activity._
- **"What should this look like?"** → several radically different UI variations on one route, switchable via a URL search param and a floating bottom bar. _E.g. score-badge placement: list-row pill vs detail-header._

If genuinely ambiguous and the user isn't reachable, default by surrounding code (backend module → logic; page/component → UI) and state the assumption at the top of the spike.

## Rules (both branches)

1. **Throwaway and clearly marked.** Place it next to the module/page it spikes for. Name it so a reader sees it's throwaway, not production. UI routes obey the project's routing convention.
2. **One command to run.** Whatever the project's task runner supports.
3. **No persistence by default.** State in memory. If a DB is truly part of the question, use a scratch DB or file named "PROTOTYPE — wipe me".
4. **Skip polish.** No tests, no error handling beyond runnable, no abstractions.
5. **Surface the state.** After every action (logic) or variant switch (UI), render the full relevant state.
6. **Delete or absorb when done.**

## When done

The answer is the only thing worth keeping. Capture it durably (commit message, ADR, issue, or a `NOTES.md` next to the spike) with the question it answered — then take it into `/align` or straight into `/write-spec`. If the spike produced a snippet that encodes a decision more precisely than prose (state machine, reducer, schema, type shape), inline that snippet into the spec/issue, trimmed to the decision-rich parts.
