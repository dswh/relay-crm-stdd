---
name: handoff
description: Fork the current conversation into a handoff document a fresh agent can pick up.
argument-hint: "What will the next session be used for?"
disable-model-invocation: true
---

# Handoff

Write a handoff document summarising the current conversation so a fresh agent can continue. Save it to the OS temp directory — never the workspace.

This is the bridge between context windows. STDD prefers to **clear, not compact**: rather than degrade in place, fork the thinking into a doc and open a fresh session against it (back in the smart zone). Use `/handoff` whenever a thread fills up or you need to branch off (e.g. into a `/spike` session and back).

Include a "suggested skills" section naming which skills the next agent should invoke.

Don't duplicate content already in other artifacts (PRDs, plans, ADRs, issues, commits, diffs) — reference them by path or URL.

Redact anything sensitive (API keys, passwords, PII).

If the user passed arguments, treat them as the next session's focus and tailor the doc accordingly.
