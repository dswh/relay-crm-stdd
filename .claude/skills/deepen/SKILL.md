---
name: deepen
description: The shared vocabulary and discipline for designing deep modules. Use when shaping a module's interface, placing a seam, making code testable or AI-navigable, or when another skill needs the deep-module vocabulary.
---

# Deepen

Design **deep modules**: a lot of behaviour behind a small interface, placed at a clean seam, testable through that interface. Use this language and these principles wherever code is designed or restructured. The payoff: leverage for callers, locality for maintainers, testability for everyone.

Bad codebases make bad agents. The harder code is to navigate and test, the worse an agent does in it. Designing for depth is designing for AI effectiveness.

## Glossary

Use these terms exactly — don't substitute "component," "service," "API," or "boundary." The consistent language is the point.

**Module** — anything with an interface and an implementation. Scale-agnostic by design: a function, class, package, or tier-spanning slice. _Avoid_: unit, component, service.

**Interface** — everything a caller must know to use the module correctly: type signature, but also invariants, ordering constraints, error modes, required configuration, performance characteristics. _Avoid_: API, signature (too narrow — they name only the type-level surface).

**Implementation** — what's inside a module, its body of code. Distinct from **Adapter**: a thing can be a small adapter with a large implementation (a Postgres repo) or a large adapter with a small implementation (an in-memory fake).

**Depth** — leverage at the interface: how much behaviour a caller (or test) exercises per unit of interface learned. **Deep** = a lot of behaviour behind a small interface. **Shallow** = the interface is nearly as complex as the implementation.

**Seam** _(Michael Feathers)_ — a place where you can alter behaviour without editing in that place; the *location* of a module's interface. Where to put the seam is its own design decision, separate from what goes behind it. _Avoid_: boundary (overloaded with DDD's bounded context).

**Adapter** — a concrete thing that satisfies an interface at a seam. Describes *role* (what slot it fills), not substance (what's inside).

**Leverage** — what callers get from depth: more capability per unit of interface learned. One implementation pays back across N call sites and M tests.

**Locality** — what maintainers get from depth: change, bugs, knowledge, and verification concentrate in one place instead of spreading across callers. Fix once, fixed everywhere.

## Deep vs shallow

**Deep module** = small interface + lots of implementation:

```
┌─────────────────────┐
│   Small Interface   │  ← Few methods, simple params
├─────────────────────┤
│  Deep Implementation│  ← Complex logic hidden
└─────────────────────┘
```

**Shallow module** = large interface + little implementation (avoid):

```
┌─────────────────────────────────┐
│       Large Interface           │  ← Many methods, complex params
├─────────────────────────────────┤
│  Thin Implementation            │  ← Just passes through
└─────────────────────────────────┘
```

When designing an interface, ask: Fewer methods? Simpler parameters? More complexity hidden inside?

## Principles

- **Depth is a property of the interface, not the implementation.** A deep module can be internally composed of small, swappable parts — they just aren't part of the interface. A module can have **internal seams** (for its own tests) as well as the **external seam** at its interface.
- **The deletion test.** Imagine deleting the module. If complexity vanishes, it was a pass-through. If complexity reappears across N callers, it was earning its keep.
- **The interface is the test surface.** Callers and tests cross the same seam. If you need to test *past* the interface, the module is the wrong shape.
- **One adapter means a hypothetical seam. Two adapters means a real one.** Don't introduce a seam unless something actually varies across it.

## Designing for testability

1. **Accept dependencies, don't create them.**

   ```typescript
   // Testable
   function scoreLead(lead, scoringService) {}
   // Hard to test
   function scoreLead(lead) { const svc = new ScoringService(); }
   ```

2. **Return results, don't produce side effects.**

   ```typescript
   // Testable
   function calculateScore(lead): Score {}
   // Hard to test
   function applyScore(lead): void { lead.score += delta; }
   ```

3. **Small surface area.** Fewer methods = fewer tests. Fewer params = simpler setup.

## A mental trick for retaining your codebase

Design the **interface** for a deep module yourself, then delegate the **implementation** to the agent. The module becomes a gray box: you know its shape and behaviour without holding every line in your head. This is how you move fast with agents while keeping a real sense of your own codebase.

## Relationships

- A **Module** has exactly one **Interface**.
- **Depth** is a property of a **Module**, measured against its **Interface**.
- A **Seam** is where a **Module**'s **Interface** lives; an **Adapter** sits at a **Seam** and satisfies the **Interface**.
- **Depth** produces **Leverage** for callers and **Locality** for maintainers.

## Rejected framings

- **Depth as ratio of implementation-lines to interface-lines**: rewards padding the implementation. Use depth-as-leverage instead.
- **"Interface" as the TypeScript `interface` keyword or a class's public methods**: too narrow.
- **"Boundary"**: overloaded with DDD's bounded context. Say **seam** or **interface**.
