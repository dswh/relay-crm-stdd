#!/usr/bin/env bash
# run-once.sh — a single iteration of the STDD AFK (Ralph) loop for Relay.
# Gathers the Lead Scoring backlog + recent commits and runs ONE coding agent pass.
# Run this repeatedly by hand first, tuning PROMPT where the agent struggles,
# before graduating to afk-loop.sh. See .claude/skills/afk/SKILL.md.
set -euo pipefail

ISSUES_DIR="${ISSUES_DIR:-.scratch/lead-scoring}"
COMMITS_TO_SHOW="${COMMITS_TO_SHOW:-5}"

# Cat every issue markdown file into one blob, passed in at the start of context.
ISSUES="$(cat "${ISSUES_DIR}"/*.md 2>/dev/null || echo 'No issue files found.')"
RECENT_COMMITS="$(git log -n "${COMMITS_TO_SHOW}" --oneline 2>/dev/null || echo 'No git history.')"

PROMPT="$(cat <<EOF
You are the STDD night-shift implementer on the Relay Lead Scoring feature. The full
backlog of issue files and the last ${COMMITS_TO_SHOW} commits are provided below.

Work ONLY on issues whose frontmatter says Mode: afk. Skip any issue Blocked by an
unfinished one, and any already marked Status: done. If there are no available AFK
tasks, output exactly: NO MORE TASKS — and stop.

Otherwise, pick the single next task by priority:
  1. critical bug fixes
  2. development infrastructure
  3. tracer-bullet vertical slices
  4. polish / quick wins / refactors

To complete the task:
  - Explore just enough to place the change. Read CONTEXT.md for domain language and
    the relevant docs/adr/ before touching an area.
  - Use /tdd (red -> green -> refactor), one vertical slice at a time, through the
    LeadRepo seam — assert behaviour, not internals.
  - Run the feedback loops: the relevant test file + npm run typecheck; full npm test
    at the end.
  - Commit atomically with a message stating what was built and any deviation.
  - Mark the issue Status: done when its acceptance criteria pass.

=== RECENT COMMITS ===
${RECENT_COMMITS}

=== BACKLOG (issue files) ===
${ISSUES}
EOF
)"

# Run the coding agent. Swap 'claude' for your agent of choice.
# acceptEdits = edit without prompting; safe ONLY inside a sandbox (see afk-loop.sh).
claude --permission-mode acceptEdits "${PROMPT}"
