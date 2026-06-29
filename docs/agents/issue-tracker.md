# Issue tracker — local markdown

Issues for this repo live as **markdown files**, so the project is self-contained
(no GitHub/GitLab needed — clone and go).

## Layout

```
.scratch/
  <feature-slug>/
    PRD.md          # the spec (from /write-spec)
    001-<title>.md  # one issue per vertical slice (from /slice)
    002-<title>.md
```

For Lead Scoring, the feature slug is `lead-scoring`.

## Create / update an issue

- **Create:** write `.scratch/<feature>/NNN-title.md` using the issue template
  from `/slice`. Number in dependency order (blockers first).
- **Label:** issues carry one triage **state** role in their frontmatter or a
  `Status:` line — see `docs/agents/triage-labels.md`.
- **Close / retire:** when a slice ships, mark the issue `done` (or move it to
  `.scratch/<feature>/done/`). Don't leave stale specs to rot.

## Out of scope

Rejected enhancement requests go in `.out-of-scope/<slug>.md` so future triage
doesn't re-litigate them.
