# Domain docs — single-context

This repo uses a **single context**: one glossary and one decision log at the root.

- **`CONTEXT.md`** — the domain glossary (ubiquitous language). Read it before
  naming anything; sharpen it with `/model` as the design firms up.
- **`docs/adr/`** — Architecture Decision Records. One file per hard-to-reverse,
  non-obvious, real-trade-off decision (e.g. real-time vs nightly scoring;
  event-sourced score vs stored total). Format: `NNNN-title.md`.

## Consumer rule

Skills read `CONTEXT.md` for domain language and `docs/adr/` for decisions before
touching an area, and respect what's recorded there rather than re-litigating it.
