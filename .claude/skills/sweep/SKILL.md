---
name: sweep
description: Scan a codebase for deepening opportunities, present them as a visual HTML report, then grill the one you pick.
disable-model-invocation: true
---

# Sweep

Surface architectural friction and propose **deepening opportunities** — refactors that turn shallow modules into deep ones, for testability and AI-navigability. Run it every few days.

Use the `/deepen` skill's vocabulary (**module**, **interface**, **depth**, **seam**, **adapter**, **leverage**, **locality**) and principles (deletion test; "the interface is the test surface"; "one adapter = hypothetical seam, two = real"). Don't drift into "component," "service," "API," or "boundary." `CONTEXT.md` names good seams; ADRs in `docs/adr/` record decisions not to re-litigate.

## Process

### 1. Explore

Read `CONTEXT.md` and area ADRs first. Then use the Agent tool with `subagent_type=Explore` to walk the codebase. Don't follow rigid heuristics — explore organically and note friction:

- Where does understanding one concept require bouncing between many small modules?
- Where are modules **shallow** — interface nearly as complex as the implementation?
- Where were pure functions extracted just for testability, but real bugs hide in how they're called (no **locality**)?
- Where do coupled modules leak across their seams?
- What's untested, or hard to test through its current interface?

Apply the **deletion test** to anything suspected shallow: would deleting it concentrate complexity (the signal you want) or just move it?

### 2. Present candidates as an HTML report

Write a **self-contained HTML file to the OS temp directory** so nothing lands in the repo. Resolve the temp dir from `$TMPDIR` (fallback `/tmp`, or `%TEMP%` on Windows) and write `<tmpdir>/architecture-review-<timestamp>.html`. Open it (`open`/`xdg-open`/`start`) and tell the user the absolute path.

Use Tailwind via CDN for layout and Mermaid via CDN for graph-shaped diagrams (call graphs, dependencies); hand-build CSS/SVG for editorial before/after visuals. Each candidate gets a card with:

- **Files** — modules involved
- **Problem** — why the current architecture causes friction
- **Solution** — plain-English description of what changes
- **Benefits** — in terms of locality, leverage, and improved tests
- **Before / After diagram** — side-by-side, showing the shallowness and the deepening
- **Recommendation strength** — `Strong` / `Worth exploring` / `Speculative` badge

End with a **Top recommendation**: which candidate to tackle first and why.

Use `CONTEXT.md` vocabulary for the domain, `/deepen` vocabulary for architecture. If a candidate contradicts an ADR, surface it only when friction genuinely warrants reopening the ADR, and mark it clearly. Don't propose interfaces yet. After writing the file, ask: "Which of these would you like to explore?"

### 3. Grilling loop

Once the user picks a candidate, run `/align` to walk the design tree — constraints, dependencies, the shape of the deepened module, what sits behind the seam, what tests survive. Keep the domain model current inline with `/model`: add new concept names to `CONTEXT.md` (e.g. naming a `LeadScore` seam in Relay CRM's lead-scoring pipeline), sharpen fuzzy terms, and offer an ADR if the user rejects a candidate for a load-bearing reason a future review would re-suggest.

The picked candidate becomes an *idea* you can take into the main flow at `/align`.
