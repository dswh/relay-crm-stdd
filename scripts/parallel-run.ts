/**
 * parallel-run.ts — sketch of the STDD parallel runner for Relay.
 *
 * Plan -> (per issue: sandbox -> implement -> review) -> merge, one DAG wave at a time.
 * This is a readable skeleton, not a finished tool: the `runAgent`, `makeSandbox`,
 * and `mergeBranch` calls are where you wire in your harness (Docker + git worktree).
 * See .claude/skills/swarm/SKILL.md. Backlog lives in .scratch/lead-scoring/.
 */

type Issue = {
  id: string;
  title: string;
  mode: "afk" | "human-in-loop";
  blockedBy: string[];
};

// --- wire these to your harness -------------------------------------------------
/** Read .scratch/lead-scoring/*.md into Issue records (id, title, mode, blockedBy). */
declare function loadBacklog(): Promise<Issue[]>;
declare function isDone(id: string): boolean;
/** Create an isolated git worktree on `branch` inside a Docker sandbox; return its path. */
declare function makeSandbox(branch: string): Promise<{ cwd: string; branch: string }>;
/** Run a coding agent with a prompt inside a sandbox; resolves to commit shas it produced. */
declare function runAgent(opts: { cwd: string; model: string; prompt: string }): Promise<string[]>;
/** Merge a reviewed branch into main, fixing type/test conflicts; resolves on success. */
declare function mergeBranch(branch: string): Promise<void>;
// --------------------------------------------------------------------------------

/** One DAG wave: AFK issues that are unblocked and independent of each other. */
function nextWave(backlog: Issue[]): Issue[] {
  return backlog.filter(
    (i) => i.mode === "afk" && !isDone(i.id) && i.blockedBy.every(isDone),
  );
}

async function implementAndReview(issue: Issue) {
  const branch = `relay/${issue.id}`;
  const sandbox = await makeSandbox(branch);

  const commits = await runAgent({
    cwd: sandbox.cwd,
    model: "sonnet", // cheaper for implementation
    prompt:
      `Implement issue ${issue.id} (${issue.title}) on branch ${branch}.\n` +
      `Use /build: TDD through the LeadRepo seam, run the feedback loops, commit atomically.`,
  });
  if (commits.length === 0) return { issue, branch, merged: false };

  await runAgent({
    cwd: sandbox.cwd,
    model: "opus", // stronger model for review
    prompt:
      `Run /review on the commits on ${branch} in a fresh context. ` +
      `Coding standards are in CLAUDE.md and the relevant skills — compare against them.`,
  });

  return { issue, branch, merged: false as boolean };
}

async function main() {
  const backlog = await loadBacklog();

  // Process the DAG wave by wave until no AFK work remains.
  for (let wave = nextWave(backlog); wave.length > 0; wave = nextWave(backlog)) {
    console.log(`Wave: ${wave.map((i) => i.id).join(", ")}`);

    // Implement + review every issue in the wave in parallel worktrees.
    const results = await Promise.all(wave.map(implementAndReview));

    // Merge serially so conflicts resolve against an up-to-date main.
    for (const r of results) {
      if (r.branch) await mergeBranch(r.branch);
    }
    // isDone() now reflects the merges; the next wave unblocks automatically.
  }

  console.log("No AFK work left. Hand off to human QA.");
}

main();
