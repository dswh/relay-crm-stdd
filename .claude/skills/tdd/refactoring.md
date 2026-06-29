# Refactor candidates (GREEN only)

Refactor only when the bar is green. Run tests after each step. The moment a test goes red, stop and fix before continuing.

## What to look for

- **Duplication** — the same logic in two slices. Extract it, but only once you've seen it twice (one adapter = hypothetical seam, two = real one).
- **Deepen modules** — move complexity behind a smaller interface. If a caller must know five things to use a module, can it know two? (See `/deepen`.)
- **Shallow extractions** — pure functions pulled out "for testability" while the real bug risk lives in how they're *called*. Prefer testing the deep module through its interface over the helper in isolation.
- **Leaky seams** — two modules reaching into each other's internals. Tighten the interface between them.
- **What the new code reveals about the old** — a fresh slice often shows an existing abstraction is wrong. Note it; fix it if cheap, or write an issue.

## Discipline

```
[ ] Bar is green before starting
[ ] One refactor at a time
[ ] Tests run (and pass) after each step
[ ] No behavior change — if behavior must change, that's a new RED→GREEN cycle
[ ] Interfaces got smaller or clearer, not larger
```

**Never refactor while RED.** Tempted to "just clean this up" mid-failure? Stop — get to GREEN, then refactor.
