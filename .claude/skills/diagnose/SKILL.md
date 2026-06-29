---
name: diagnose
description: The diagnosis loop for hard bugs and performance regressions. Use when the user says "diagnose"/"debug this", or reports something broken, throwing, failing, or slow.
---

# Diagnose

A discipline for hard bugs. Skip phases only when explicitly justified. When exploring, read `CONTEXT.md` for the relevant modules and check ADRs in the area.

## Phase 1 — Build a feedback loop

**This is the skill.** Everything else is mechanical. With a **tight** pass/fail signal that goes red on _this_ bug, you will find the cause; bisection, hypothesis-testing, and instrumentation just consume it. Without one, staring at code won't save you. Spend disproportionate effort here. Be aggressive, creative, and refuse to give up.

### Ways to construct one — try in roughly this order

1. **Failing test** at whatever seam reaches the bug — unit, integration, e2e.
2. **Curl / HTTP script** against a running dev server.
3. **CLI invocation** with a fixture input, diffing stdout against known-good.
4. **Headless browser script** (Playwright/Puppeteer) — drives the UI, asserts on DOM/console/network.
5. **Replay a captured trace** — save a real request/payload/event log, replay through the code path in isolation.
6. **Throwaway harness** — minimal subset of the system that hits the bug path with one function call.
7. **Property / fuzz loop** — for "sometimes wrong output", run 1000 random inputs.
8. **Bisection harness** — automate "boot at state X, check, repeat" for `git bisect run`.
9. **Differential loop** — same input through old vs new (or two configs), diff outputs.
10. **HITL bash script.** Last resort. If a human must click, drive *them* with a structured loop script so output still feeds back to you.

### Tighten the loop

Treat the loop as a product. Make it **faster** (cache setup, narrow scope), **sharper** (assert the specific symptom, not "didn't crash"), and **more deterministic** (pin time, seed RNG, isolate filesystem, freeze network). A 2-second deterministic loop is a superpower; a 30-second flaky one is barely better than nothing.

### Non-deterministic bugs

Goal is a **higher reproduction rate**, not a clean repro. Loop 100×, parallelise, add stress, narrow timing windows. 50%-flake is debuggable; 1% is not — raise the rate first.

### Completion criterion

Phase 1 is done when you can name **one command** you've **already run** (paste invocation + output) that is **red-capable** (drives the real bug path, asserts the user's exact symptom), **deterministic**, **fast**, and **agent-runnable**. If you catch yourself reading code to build a theory before this command exists, **stop** — that's the failure this skill prevents.

## Phase 2 — Reproduce + minimise

Run the loop; watch it go red. Confirm it produces the symptom the **user** described (not a nearby one), reproducibly. Then shrink to the **smallest scenario that still goes red** — cut inputs, callers, config, steps one at a time, re-running after each cut. Done when every remaining element is load-bearing.

## Phase 3 — Hypothesise

Generate **3–5 ranked, falsifiable hypotheses** before testing any. Each states a prediction: "If X is the cause, then changing Y makes the bug disappear." If you can't state the prediction, it's a vibe — sharpen or discard. Show the ranked list to the user before testing (cheap checkpoint; they may re-rank instantly). Don't block if they're AFK.

## Phase 4 — Instrument

Each probe maps to a specific prediction. **Change one variable at a time.** Prefer debugger/REPL (one breakpoint beats ten logs); else targeted logs at the boundaries that distinguish hypotheses. **Tag every debug log** with a unique prefix like `[DEBUG-a4f2]` so cleanup is one grep. For performance, measure first (baseline, profiler, query plan), then bisect — logs are usually wrong.

## Phase 5 — Fix + regression test

Write the regression test **before the fix**, but only if there's a **correct seam** — one where the test exercises the real bug pattern as it occurs at the call site. If the only available seam is too shallow, **that itself is the finding**: the architecture is preventing lockdown — flag it. With a correct seam: turn the minimised repro into a failing test → watch it fail → fix → watch it pass → re-run the Phase 1 loop on the original scenario.

## Phase 6 — Cleanup + post-mortem

- [ ] Original repro no longer reproduces
- [ ] Regression test passes (or absence of seam documented)
- [ ] All `[DEBUG-...]` instrumentation removed (grep the prefix)
- [ ] Throwaway harnesses deleted
- [ ] Correct hypothesis stated in the commit/PR message

**Then ask: what would have prevented this bug?** If the answer is architectural (no good seam, tangled callers, hidden coupling — e.g. Relay CRM's lead-scoring path with no seam to assert a score at the call site), hand off to `/sweep` with specifics — after the fix is in, when you know the most.
