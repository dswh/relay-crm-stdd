#!/usr/bin/env bash
# afk-loop.sh — run run-once.sh in a loop until the AFK backlog is exhausted.
# Intended to run SANDBOXED (Docker container and/or a dedicated git worktree on a
# throwaway branch). Never point this at production credentials.
# See .claude/skills/afk/SKILL.md.
set -euo pipefail

MAX_ITERATIONS="${MAX_ITERATIONS:-25}"   # backstop so a misbehaving loop can't run forever
SLEEP_BETWEEN="${SLEEP_BETWEEN:-2}"
STOP_SENTINEL="NO MORE TASKS"

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

for ((i = 1; i <= MAX_ITERATIONS; i++)); do
  echo "=== AFK iteration ${i}/${MAX_ITERATIONS} ==="
  # Capture output so we can detect the stop sentinel.
  out="$("${here}/run-once.sh" 2>&1 | tee /dev/tty)"
  if grep -q "${STOP_SENTINEL}" <<<"${out}"; then
    echo "Backlog exhausted (${STOP_SENTINEL}). Stopping."
    exit 0
  fi
  sleep "${SLEEP_BETWEEN}"
done

echo "Hit MAX_ITERATIONS (${MAX_ITERATIONS}) without a stop sentinel. Stopping for safety."
