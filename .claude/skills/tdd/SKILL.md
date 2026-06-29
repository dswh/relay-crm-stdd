---
name: tdd
description: Test-driven development, vertical slices. Use to build features or fix bugs test-first, for red-green-refactor, or integration tests.
---

# Test-Driven Development

A failing-then-passing signal is the agent's only feedback loop. Without it, the agent codes blind. The quality of your tests is the ceiling on code quality.

## Philosophy

**Test behavior through public interfaces, not implementation details.** Code can change entirely; tests shouldn't.

**Good tests** are integration-style: they exercise real code paths through public APIs and describe _what_ the system does, not _how_. A good test reads like a spec — "a lead gains points when it replies to an email" tells you exactly what capability exists. These survive refactors.

**Bad tests** couple to implementation: they mock internal collaborators, test private methods, or verify through external means (querying the DB directly instead of the interface). The warning sign: the test breaks on a refactor while behavior is unchanged. Rename an internal function and tests fail → those tests test implementation.

See [tests.md](tests.md) for examples and [refactoring.md](refactoring.md) for refactor candidates.

## Anti-Pattern: Horizontal Slices

**DO NOT write all tests first, then all implementation.** Treating RED as "write all tests" and GREEN as "write all code" produces **crap tests**:

- Bulk tests verify _imagined_ behavior, not _actual_ behavior.
- You test the _shape_ of things (data structures, signatures) instead of user-facing behavior.
- Tests go insensitive: they pass when behavior breaks, fail when it's fine.
- You commit to test structure before understanding the implementation.

**Correct approach**: vertical slices via tracer bullets. One test → one implementation → repeat. Each test responds to what the previous cycle taught you.

```
WRONG (horizontal):
  RED:   test1, test2, test3, test4, test5
  GREEN: impl1, impl2, impl3, impl4, impl5

RIGHT (vertical):
  RED→GREEN: test1→impl1
  RED→GREEN: test2→impl2
  ...
```

## Workflow

### 1. Planning

Read `CONTEXT.md` (if present) so test names and interface vocabulary match the project's domain language, and respect ADRs in the area you're touching.

Before writing code:

- [ ] Confirm with the user what interface changes are needed
- [ ] Confirm and prioritize which behaviors to test
- [ ] Identify deep modules (small interface, deep implementation) — run `/deepen` for vocabulary and testability checks
- [ ] List behaviors to test (not implementation steps)
- [ ] Get user approval on the plan

Ask: "What should the public interface look like? Which behaviors matter most?" **You can't test everything** — focus on critical paths and complex logic.

### 2. Tracer Bullet

Write ONE test that confirms ONE thing, proving the path works end-to-end:

```
RED:   Write test for first behavior → fails
GREEN: Minimal code to pass → passes
```

### 3. Incremental Loop

For each remaining behavior:

```
RED:   Write next test → fails
GREEN: Minimal code to pass → passes
```

Rules: one test at a time · only enough code to pass the current test · don't anticipate future tests · keep tests on observable behavior.

### 4. Refactor

Once all tests pass, look for [refactor candidates](refactoring.md): extract duplication, deepen modules (move complexity behind simple interfaces), apply SOLID where natural. Run tests after each step.

**Never refactor while RED.** Get to GREEN first.

## Checklist Per Cycle

```
[ ] Test describes behavior, not implementation
[ ] Test uses public interface only
[ ] Test would survive internal refactor
[ ] Code is minimal for this test
[ ] No speculative features added
```
