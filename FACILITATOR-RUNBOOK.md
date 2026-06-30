# FACILITATOR RUNBOOK — STDD live build (Relay · Lead Scoring)

A hand-off-able, **branch-by-branch** runbook for driving the STDD master class
live. A fresh chat — or Harshit — can execute it top to bottom: for every branch,
**click it, read the begin state, set the stage, name the problem, run the skill,
explain what it does, and watch the work land on a live Linear board.**

The class ships **Lead Scoring** in Relay CRM, from a messy Slack brief to a scaled
feature, across 12 phases (`00`…`11`). Each phase has a `NN_begin` / `NN_end` branch
pair — `_begin` is the state before the skill runs, `_end` after — and the pairs
double as the demo's safety net (`git checkout NN_end` recovers the result).

> **The board is the story.** Linear is the *real* tracker the skills drive (not a
> parallel manual board). `/slice`, `/triage`, `/write-spec`, `/build`, `/afk`,
> `/swarm` create and move **Linear** issues via the Linear MCP. The board populating
> and advancing in front of the room *is* the audience-facing "how we get from one
> step to the next." Domain docs (`CONTEXT.md`, `docs/adr/`) and the spike stay as
> repo files; only **issues** and the **PRD** live in Linear.

**Repo:** `relay-crm-standalone/` (branches `00_begin`…`11_end`, plus `relay/002-tiers`
and `relay/003-decay` for the swarm wave).
**Linear:** team **Agentiwise** (`AGE`), project **`Relay · Lead Scoring`**.

---

## How to use this runbook

1. **Before the room arrives** — do the pre-flight (below): create the Linear project,
   states, labels, and pre-seed the 3 inbox cards. Confirm the repo is green.
2. **Per phase** — work the 8-field template (section C). Each phase entry in section D
   fills it in: checkout → begin state → stage/problem → the skill → run & showcase →
   Linear actions → end state/verify → fallback.
3. **If a live run stalls** — fall back: `git checkout NN_end` to recover the code,
   advance the Linear board by hand, or show the baked transcript. Keep moving.

**Cross-references** (the talk track and timing):
- **Deck:** `deck/slides.md` (Slidev). Slide titles are quoted per phase.
- **Lecture script:** `lecture-script.html` — Parts 0–4 + Close, with per-slide
  `.notes`, `▶ Live demo` runbooks, and `? ask the room` prompts.
- **Run-of-show / timing / fallbacks:** `session-rundown.html`.
- **The problem / grilling answers:** `BRIEF.md` + the grilling cheat-sheet in
  `session-rundown.html`.

---

## Pre-flight (before the session) — ~10 min

1. **Create the Linear project** `Relay · Lead Scoring` in team **Agentiwise** (`AGE`)
   from section A below.
2. **Confirm workflow states** exist: Triage/Backlog, Todo, In Progress, In Review,
   Done, Canceled (section A maps each to its STDD role).
3. **Create the labels:** `enhancement`, `bug`, `afk`, `human-in-loop`,
   `ready-for-agent`, `ready-for-human`, `needs-info` (section A).
4. **Pre-seed the inbox** — drop the **3 inbox cards** into **Backlog**, unlabeled
   (text in section A; source `.scratch/inbox/*.md` on `09_begin`). Nothing else is
   pre-seeded; every other card is created live by a skill.
5. **Confirm the repo is green** on the starter:
   ```bash
   cd relay-crm-standalone
   git checkout main && npm install
   npm test && npm run typecheck   # green
   npm run dev                     # http://localhost:5173 — the leads list
   ```
6. **Confirm the live agent targets Linear:** open `docs/agents/issue-tracker.md` and
   `CLAUDE.md` — both point at Linear (team Agentiwise, project Relay · Lead Scoring).

---

## A. Linear project structure (create this in Agentiwise)

**Project:** `Relay · Lead Scoring` (team Agentiwise). The **PRD** becomes a Linear
project **Document** titled **"Lead Scoring — Spec"** (written live by `/write-spec`).

### Workflow states ⇄ STDD triage roles

| Linear state (type) | STDD role it represents |
|---|---|
| Triage / Backlog (backlog) | `needs-triage` — raw incoming, not yet evaluated |
| Todo (unstarted) | `ready-for-agent` / `ready-for-human` (tell apart by label) |
| In Progress (started) | being built (`/build`, `/afk`, `/swarm`) |
| In Review (started) | `/review` running |
| Done (completed) | shipped |
| Canceled (canceled) | `wontfix` — out-of-scope or already-built |

### Labels

`enhancement`, `bug` (category) · `afk`, `human-in-loop` (mode) · `ready-for-agent`,
`ready-for-human`, `needs-info` (state nuance).

### Issue set

Text for every card comes from the `.scratch/` files on the branches (reproduce as the
Linear issue description). **Pre-seed only the inbox items** (in Backlog); everything
else is **created live** by a skill. Use Linear **issue relations** (*blocked by*) for
the DAG edges.

| Linear issue | labels | when it appears | lifecycle in the demo |
|---|---|---|---|
| (inbox) "Let me manually mark a lead as hot" | — | **pre-seed**, Backlog | `/triage` (09) → **Canceled** (out of scope) + `.out-of-scope/` note |
| (inbox) "Sort leads by how good they are" | — | **pre-seed**, Backlog | `/triage` (09) → **Canceled** (already-built = it *is* Lead Scoring) |
| (inbox) "Weekly digest of hottest leads" | — | **pre-seed**, Backlog | `/triage` (09) → becomes **006** (ready-for-agent, Todo) |
| 001 · reply → award → badge | enhancement, afk | created by `/slice` (04) | Todo → In Progress (05) → In Review (06) → **Done** |
| 002 · tiers (hot/warm/cold) | enhancement, afk, *blocked by 001* | `/slice` (04) | Todo → **Done** via `/afk` (10) *or* `/swarm` (11) |
| 003 · nightly decay | enhancement, human-in-loop, *blocked by 001* | `/slice` (04) | Todo → **Done** via `/swarm` (11) |
| 004 · retroactive backfill (40k) | enhancement, human-in-loop, *blocked by 001,002* | `/slice` (04) | stays **Todo** (out of demo scope) |
| 005 · unify reply path | enhancement, afk | created by `/review` (06) | Todo (optionally In Progress at /deepen 07) |
| BUG · recency regression | bug | created by `/diagnose` (08) | In Progress → **Done** (loop-first fix) |

**Pre-seed text** (source `.scratch/inbox/*.md` on `09_begin`):
- **"Sort leads by how good they are"** — *from Dana (rep):* "The leads list is ordered
  by recency, so whoever poked us last is on top even if they're a tyre-kicker. Can we
  rank by how promising a lead actually is?"
- **"Let me manually mark a lead as hot"** — *from Marcus (Head of Sales):* "I want to
  override a lead's tier by hand — pin one as 'hot' regardless of its score — because
  sometimes I just *know* a deal is live and the score hasn't caught up yet."
- **"Weekly digest of my hottest leads"** — *from Sam (rep):* "Could Relay email me a
  Monday-morning digest of my top leads by score — say my top 10 hot ones — so I start
  the week knowing who to call?"

---

## B. Repo → Linear reconfiguration (already applied)

The starter is reconfigured so the live skills target Linear:

- **`docs/agents/issue-tracker.md`** rewritten to describe Linear — tracker (team
  Agentiwise, project Relay · Lead Scoring), the state ⇄ role mapping, the labels, and
  the Linear-MCP operations the skills use:
  - **Create issue:** `save_issue` (title, `/slice` template description, team, project,
    labels, state Todo).
  - **Spec:** `save_document` — project Document "Lead Scoring — Spec".
  - **Move:** `save_issue` setting state per the mapping table.
  - **Blocked-by:** Linear issue **relations** for the DAG edges.
  - **wontfix:** state **Canceled** + `save_comment` with the AI-during-triage banner;
    out-of-scope rationale mirrored to `.out-of-scope/<slug>.md`.
- **`CLAUDE.md → ## Agent skills → Issue tracker`** now reads: *"Linear (team
  Agentiwise, project Relay · Lead Scoring) — the skills create and move issues via the
  Linear MCP."*

**Tier model (so the branches still work as recovery points):**
- **Live → Linear:** the skills drive the Linear board during the talk.
- **`git checkout NN_end` → code:** branches remain the canonical **code** recovery
  points (and stay green).
- **`.scratch/*.md` → card text:** the on-branch issue files are the **canonical text**
  for each Linear card (source for the live skill / pre-seed).

> Domain docs (`CONTEXT.md`, ADRs) and the spike stay as repo files. Only issues and
> the PRD move to Linear. (A heavier Tier-2 rebuild — re-lineaging the branches so the
> issue files are dropped entirely — is **not** required for this runbook.)

---

## C. Per-phase template

Each phase entry below fills in these eight fields:

1. **Branch & checkout** — `git checkout NN_begin` (or click it in Conductor / your git UI).
2. **Begin state** — what's in the repo now (the branch's `📍 You are here` README block
   + `DEMO-BRANCHES.md`).
3. **Set the stage / the problem** — the story + what we're about to do. *Source:* deck
   slides + `lecture-script.html` Part + `BRIEF.md` / grilling cheat-sheet.
4. **The skill** — name, one-line *what it does* / *when to use* (its `SKILL.md`
   `description:`), and how to explain it (lecture notes).
5. **Run & showcase** — the exact command + what to point at on screen.
6. **Linear actions** — which cards get created / moved (section A).
7. **End state / verify** — `git diff NN_begin..NN_end` (or `git checkout NN_end`);
   expected test count.
8. **Fallback** — if the live run stalls.

---

## D. The 12 phases

> **Main line `00→07` is continuous** — each `_end` is the next `_begin`, so the build
> runs unbroken. **`02` (spike) and `08–11` are sidebars** off the main line, each
> seeded with what its skill needs.

### 00 · setup, ask — configure the repo, meet the router
**Deck:** "Now we prove it — live" · **Lecture:** Part 0 · Set the Stage (~28 min).

1. **Checkout:** `git checkout 00_begin`.
2. **Begin state:** Relay *before* config — no `docs/agents/`, no Agent-skills block in
   `CLAUDE.md`, no `.scratch/` convention. The bare CRM.
3. **Stage / problem:** "Before any code, a repo has to tell the agents *where issues
   live, what the triage vocabulary is, and where the domain docs are.* That's a
   one-time setup." Warm-up + icebreaker from the lecture.
4. **The skill — `/setup`:** *configure this repo for the STDD skills — issue tracker,
   triage label vocabulary, domain-doc layout; run once.* Then **`/ask`** — *a router
   over the skills; "which skill/flow fits my situation?"* — trace the main flow
   `align → write-spec → slice → build → review`.
5. **Run & showcase:** run `/setup` → **choose Linear** (team Agentiwise, project
   Relay · Lead Scoring); it writes `docs/agents/*.md` + the `CLAUDE.md` Agent-skills
   block. Then `/ask` and point it at `/align` as the front door.
6. **Linear actions:** none created — **confirm** the project, states, and labels exist
   (the pre-flight). The board is empty and ready.
7. **End state / verify:** `git checkout 00_end` — the three `docs/agents/*.md` files +
   the `CLAUDE.md` Agent-skills block (now pointing at Linear). Green. *This is the
   public starter attendees clone.*
8. **Fallback:** `git checkout 00_end` and narrate the config; show the rendered
   `issue-tracker.md`.

### 01 · align, model — the grilling, then the glossary
**Deck:** "You've just received this" · "Paste it in. Watch it guess." · "The fix is an
interview" · "/align, live" · "The output isn't a doc". **Lecture:** Part 1 · Align
(~47 min). **Grilling cheat-sheet:** `session-rundown.html`.

1. **Checkout:** `git checkout 01_begin` (= `00_end`).
2. **Begin state:** `BRIEF.md` present; `CONTEXT.md` seeded with the base glossary
   (Lead, Activity, ActivityKind, Owner, Status, LeadRepo). **No** scoring terms, **no**
   ADRs, **no** code.
3. **Stage / problem:** read the Slack brief aloud — *"sort the list by who's worth
   calling first, maybe hot/warm/cold."* It's vague with a dozen hidden decisions. The
   grilling drives them out — keep these answers ready: reply = 10 / demo = 8 /
   pricing-page = 5 / open = 1; **real-time** not nightly; the **40k** retroactive leads;
   decay on idle; tiers by threshold.
4. **The skill — `/align`:** *a relentless one-question-at-a-time interview to a shared
   design concept before any code.* Inline **`/model`:** *actively build/sharpen the
   glossary + ADRs the moment terms crystallise.*
5. **Run & showcase:** `/align add lead scoring (use BRIEF.md)` — answer **one question
   at a time**. As terms firm up, `/model` writes them to `CONTEXT.md` and records the
   two hard decisions as ADRs. Point at `CONTEXT.md` growing in real time.
6. **Linear actions:** none yet (alignment is pre-tracker; the PRD comes at 03).
7. **End state / verify:** `git checkout 01_end` — `CONTEXT.md` grown with **Score,
   Tier, ScoreEvent, Decay, Backfill**; `docs/adr/0001-realtime-vs-nightly-scoring.md` and
   `0002-event-sourced-score.md`. **No production code.**
8. **Fallback:** `git checkout 01_end`; walk the diff on `CONTEXT.md` + the two ADRs.

### 02 · spike, handoff *(sidebar)* — a runnable answer
**Deck:** "When talk isn't enough". **Lecture:** Part 1 sidebar. Optional — cut if time
is short.

1. **Checkout:** `git checkout 02_begin` (= `01_end`).
2. **Begin state:** aligned, with the **tier/decay state-machine** question still open:
   does cold→warm→hot feel right? does a 5-day streak survive decay / a timezone
   rollover?
3. **Stage / problem:** "Some questions you can't talk your way to — you have to *run*
   them." Build the smallest thing that answers it, keep the answer, delete the code.
4. **The skill — `/spike`:** *build a throwaway spike to settle a design question — a
   runnable terminal app.* Inline **`/handoff`:** *fork the conversation into a doc a
   fresh agent picks up* (temp, never the repo) — STDD prefers "clear, don't compact."
5. **Run & showcase:** `/handoff` *out* of align into a spike session → `/spike` builds
   `spike/score-state-machine.mjs`; run `node spike/score-state-machine.mjs` and drive
   the hard cases; capture the answer in `spike/NOTES.md` (idle-from-last-activity, no
   double-decay); `/handoff` *back* with the answer.
6. **Linear actions:** none — the spike is a repo file; its *decision* was already
   folded into ADR 0001 on the main line.
7. **End state / verify:** `git checkout 02_end` — `spike/` app + `NOTES.md`. Green.
8. **Fallback:** skip the live run; show `spike/NOTES.md` and the ADR it fed.

### 03 · write-spec — synthesize the destination doc
**Deck:** "Write the destination" · "What's in the PRD". **Lecture:** Part 2 · Spec
(~40 min).

1. **Checkout:** `git checkout 03_begin` (= `01_end`; spike decision already in the ADR).
2. **Begin state:** aligned + ADRs; **no spec, no issues.**
3. **Stage / problem:** "Alignment lives in a conversation. We need a durable
   destination doc the whole team — and the agents — can build against. **No
   re-interview** — just write down what we decided."
4. **The skill — `/write-spec`:** *synthesize the conversation into a spec and publish
   it to the tracker. No interview.*
5. **Run & showcase:** `/write-spec` → it publishes a **Linear project Document**
   **"Lead Scoring — Spec"**: problem · user stories · implementation decisions ·
   testing seams · **out-of-scope** (manual override, per-rep thresholds = the
   definition of done). Open the Document in Linear on screen.
6. **Linear actions:** **create the project Document "Lead Scoring — Spec"** (via
   `save_document`) under Relay · Lead Scoring. No issues yet.
7. **End state / verify:** `git checkout 03_end` — `.scratch/lead-scoring/PRD.md` (the
   repo copy / card source). Green.
8. **Fallback:** paste the `PRD.md` text into the Linear Document by hand.

### 04 · slice — the board populates
**Deck:** "Slice vertical, not horizontal" · "The first slice proves everything" · "A
DAG, not a to-do list" · "No framework has won". **Lecture:** Part 2.

1. **Checkout:** `git checkout 04_begin` (= `03_end`).
2. **Begin state:** PRD present (Linear Document), **no issues** on the board.
3. **Stage / problem:** "A spec isn't work yet. Slice it into independently-grabbable
   **tracer bullets** — each cuts through every layer (schema → service → UI → tests).
   They form a DAG, not a flat to-do list." **This is the visual highlight** — the board
   fills in front of the room.
4. **The skill — `/slice`:** *break a spec into independently-grabbable vertical-slice
   (tracer-bullet) issues on the tracker.*
5. **Run & showcase:** `/slice` → watch it call `save_issue` four times and create the
   *blocked-by* relations. Point at the board: cards appear with the DAG edges drawn.
6. **Linear actions — create 001–004 in Todo:**
   - **001 · reply → award → badge** — `enhancement`, `afk`.
   - **002 · tiers (hot/warm/cold)** — `enhancement`, `afk`; **blocked by 001**.
   - **003 · nightly decay** — `enhancement`, `human-in-loop`; **blocked by 001**.
   - **004 · retroactive backfill (40k)** — `enhancement`, `human-in-loop`; **blocked by
     001, 002**.
7. **End state / verify:** `git checkout 04_end` — issue files
   `001-reply-award-badge.md`, `002-tiers.md`, `003-nightly-decay.md`,
   `004-retroactive-backfill.md` + PRD. Green.
8. **Fallback:** create the 4 cards + relations on the board by hand from the
   `.scratch/lead-scoring/00*.md` text.

### 05 · build, tdd — ship the tracer bullet
**Deck:** "The human leaves the loop" · "Feedback loops are the ceiling" · "Red. Green.
Refactor." · "Not all tests, then all code" · "Test behavior, not internals" · "/tdd,
live". **Lecture:** Part 3 · Build (~53 min).

1. **Checkout:** `git checkout 05_begin` (= `04_end`) — **start a fresh context.**
2. **Begin state:** issues present; **no scoring code** (no `Score`, `Tier`,
   `ScoreEvent`). `src/services/leadService.ts` still lists by recency.
3. **Stage / problem:** "Take **one** issue (001) into a fresh context and ship it
   end-to-end, test-first. The first slice proves every layer connects." Move 001 to
   In Progress on the board.
4. **The skill — `/build`:** *build one spec slice end-to-end, test-first.* Inline
   **`/tdd`:** *red → green → refactor, one behaviour at a time through public
   interfaces.*
5. **Run & showcase:** `/build .scratch/lead-scoring/001-reply-award-badge.md` + `/tdd`:
   RED *"a lead gains points when it replies to an email"* → GREEN (`ScoreEvent` type,
   `LeadRepo.recordScoreEvent()`/`getScore()`, `createScoringService(repo)` with
   `recordReply()`/`getScore()`, badge on `LeadRow`, list sorted by score). Wire the
   "Log reply" action and watch the lead climb in the running app.
6. **Linear actions:** **001 → In Progress → Done** (one atomic commit on green).
7. **End state / verify:** `git checkout 05_end` — slice 001 shipped, **7 tests** green.
   `git diff 05_begin..05_end`.
8. **Fallback:** `git checkout 05_end`; run `npm test` (7 green) and demo the climbing
   lead from the recovered code.

### 06 · review — fresh-context review against standards
**Deck:** "Review in a fresh context" · "Push standards. Pull skills." · "AI has no
taste". **Lecture:** Part 4 · Review, QA & Scale (~47 min).

1. **Checkout:** `git checkout 06_begin` (= `05_end`) — **clear context.**
2. **Begin state:** 001 implemented but **unreviewed**.
3. **Stage / problem:** "A cheap, high-value pass in a fresh smart-zone context, with
   standards **pushed in** from `CLAUDE.md`. AI has no taste — you supply the bar.
   Findings: must-fix → should-fix → nits; unfixed ones become **new issues**."
4. **The skill — `/review`:** *fresh-context code review of a diff against the
   standards; run after implementing, before human QA.*
5. **Run & showcase:** `/review the commits on this slice` → it flags the **must-fix
   quadratic re-sort** and applies the fix; the remaining finding (unify the reply path)
   is filed as a new issue. QA the climbing lead in the app.
6. **Linear actions:** **001 → In Review → Done**; **create 005 · unify reply path**
   (`enhancement`, `afk`) in Todo.
7. **End state / verify:** `git checkout 06_end` — must-fix applied; `REVIEW-001.md` +
   issue `005-unify-reply-path.md`. Green.
8. **Fallback:** `git checkout 06_end`; show `REVIEW-001.md` and the 005 card text.

### 07 · deepen, sweep — keep the module deep
**Deck:** "The happy path is the tip" · "Bad codebases make bad agents" · "Sweep for
shallowness". **Lecture:** Part 4.

1. **Checkout:** `git checkout 07_begin` (= `06_end`).
2. **Begin state:** reviewed slice; the scoring module works but the reply path isn't
   unified yet.
3. **Stage / problem:** "Bad codebases make bad agents — **depth is designing for AI
   effectiveness.** Scan for shallowness, then deepen the one that matters: a small
   interface over real behaviour."
4. **The skill — `/sweep`:** *scan the codebase for deepening opportunities, present
   them as a visual HTML report, then grill the one you pick.* Inline **`/deepen`:** *the
   deep-module vocabulary & discipline* (module, interface, depth, seam, adapter).
5. **Run & showcase:** `/sweep` → opens a self-contained HTML report in `$TMPDIR` (never
   the repo); pick the reply-path candidate → `/deepen` unifies it, keeping
   `scoringService` a deep module (`recordReply`/`getScore` over the real logic). Track
   it via `SWEEP-001.md`.
6. **Linear actions:** optionally **005 → In Progress / Done** as the deepen lands.
7. **End state / verify:** `git checkout 07_end` — one deepening refactor committed;
   `SWEEP-001.md`. **This is the final main-line state** the sidebars branch from. Green.
8. **Fallback:** show the recovered `SWEEP-001.md`; skip the live HTML report.

### 08 · diagnose *(sidebar)* — loop-first debugging
**Deck:** "Stuck? Build the loop first". **Lecture:** Part 3 / Part 4 sidebar.

1. **Checkout:** `git checkout 08_begin` (off `07_end` **+ a planted regression**).
2. **Begin state:** under some condition the list silently falls back to sorting by
   **recency** instead of score (recency ≠ worth — the original bug sneaking back).
   **Service tests are deceptively green** — they don't see it.
3. **Stage / problem:** read Priya's report — *"Hugo replied and booked a demo last week
   — my hottest lead — but he's below a brand-new lead that's only opened one email.
   Thought we fixed the ordering?"* "Don't theorise. **Phase 1 is the whole game: build
   a red, deterministic failing test on *this* symptom first.**"
4. **The skill — `/diagnose`:** *the diagnosis loop for hard bugs / perf regressions —
   build the feedback loop before hypothesising.*
5. **Run & showcase:** `/diagnose` → write a failing test pinning *hot+stale vs
   fresh+cold*, go RED, then fix (comparator: **score primary**, recency secondary);
   the regression test stays so it can't silently return.
6. **Linear actions:** **create BUG · recency regression** (`bug`) → In Progress → Done.
7. **End state / verify:** `git checkout 08_end` — failing test + fix; **8 tests** green.
   `BUG-recency-regression.md` marked done.
8. **Fallback:** `git checkout 08_end`; run `npm test` (8 green) and read the BUG note's
   diagnosis.

### 09 · triage *(sidebar)* — messy inbox → agent-ready work
**Deck:** triage / "Messy brief → shipped slice" context. **Lecture:** Part 4 note.

1. **Checkout:** `git checkout 09_begin` (off `07_end`; **3 inbox items** pre-seeded in
   Linear **Backlog**).
2. **Begin state:** three raw incoming requests, unlabeled, in Backlog (sort-by-worth,
   manual-pin-tier, weekly-digest).
3. **Stage / problem:** "Triage is the on-ramp for work you **didn't** create.
   Categorise (bug/enhancement), set one state, align if needed, write agent-ready
   briefs. Every AI-posted note carries the *generated by AI during triage* banner."
4. **The skill — `/triage`:** *move issues through triage roles — categorise, verify,
   align, write agent-ready briefs.*
5. **Run & showcase:** `/triage` the 3 Backlog cards. **Don't re-triage 001–004** (they
   came from `/slice`, already agent-ready).
6. **Linear actions:**
   - **"Sort leads by how good they are"** → **Canceled** (already-built — it *is* Lead
     Scoring) + AI-during-triage comment.
   - **"Let me manually mark a lead as hot"** → **Canceled** (out of scope) + comment;
     mirror rationale to `.out-of-scope/manual-tier-override.md`.
   - **"Weekly digest of hottest leads"** → becomes **006** (`ready-for-agent`, Todo).
7. **End state / verify:** `git checkout 09_end` — `006-weekly-digest.md`,
   `.out-of-scope/manual-tier-override.md`; the sort-by-worth + manual-pin inbox files
   resolved. Green.
8. **Fallback:** move the 3 Backlog cards by hand per the table; show the
   `.out-of-scope/` note.

### 10 · afk *(sidebar)* — the autonomous night shift
**Deck:** "The night shift: /afk". **Lecture:** Part 4 (`▶ Live demo`).

1. **Checkout:** `git checkout 10_begin` (off `07_end` **+ the afk harness**;
   `scripts/run-once.sh`, `scripts/afk-loop.sh`).
2. **Begin state:** a sharp backlog (002–004 afk-tagged, sharply specced); 002 is the
   next `ready-for-agent`.
3. **Stage / problem:** "With sharp acceptance criteria, an agent can implement
   unattended — one issue at a time, sandboxed, small verifiable changes until the
   afk-tagged backlog is empty."
4. **The skill — `/afk`:** *run an autonomous night-shift loop over the AFK-tagged
   backlog, one issue at a time. Needs sharp acceptance criteria.*
5. **Run & showcase:** `./scripts/run-once.sh` — one pass builds the next ready-for-agent
   issue (**002 tiers**) test-first; show the commit it produces.
6. **Linear actions:** **002 → In Progress → Done.**
7. **End state / verify:** `git checkout 10_end` — 002 (tiers) built autonomously;
   **9 tests** green.
8. **Fallback:** `git checkout 10_end`; run `npm test` (9 green) and show the autonomous
   commit.

### 11 · swarm *(sidebar)* — fan out across the DAG
**Deck:** "Many agents at once". **Lecture:** Part 4 (`▶ Live demo`).

1. **Checkout:** `git checkout 11_begin` (off `07_end`; sandboxing ready,
   `scripts/parallel-run.ts`).
2. **Begin state:** the backlog as a real DAG with **independent** slices unblocked —
   tiers (002) ∥ decay (003).
3. **Stage / problem:** "Parallel `/afk`: a planner → implementer → reviewer → merger
   pipeline that sandboxes each independent issue in its **own git worktree** and runs
   them at once."
4. **The skill — `/swarm`:** *fan out multiple agents across independent DAG issues —
   plan a wave, sandbox each in a worktree, implement, review, merge.*
5. **Run & showcase:** `/swarm` (`scripts/parallel-run.ts`) fans **002 ∥ 003** in
   worktrees → merge. Show the two wave branches and the merge.
6. **Linear actions:** **002 + 003 → Done in parallel**; wave branches `relay/002-tiers`,
   `relay/003-decay`.
7. **End state / verify:** `git checkout 11_end` — both slices built in parallel and
   merged; **13 tests** green.
8. **Fallback:** `git checkout 11_end`; run `npm test` (13 green) and walk the two wave
   branches + merge.

### Close — ~5 min
**Deck:** "Take it with you". Recap the flow `align → write-spec → slice → build →
review`, the on-ramps (`triage`, `diagnose`), and the scale-out (`afk`, `swarm`). The
Linear board now tells the whole story end to end.

---

## E. Source map (where every piece comes from)

- **Checkout + begin state + next action:** each branch's `📍 You are here` README block;
  the table in `DEMO-BRANCHES.md`.
- **Talk track / how to explain:** `lecture-script.html` (per-slide `.notes`,
  `▶ Live demo` runbooks, `? ask the room`); the deck (`deck/slides.md`).
- **The problem / grilling answers:** `BRIEF.md`; the grilling cheat-sheet in
  `session-rundown.html`.
- **Skill explanations:** `.claude/skills/<name>/SKILL.md` (frontmatter `description:` +
  body).
- **Issue text (→ Linear cards):** `.scratch/lead-scoring/001…006*.md`,
  `BUG-recency-regression.md`, `.scratch/inbox/*.md` on the relevant branches.
- **Run-of-show / timing / fallbacks:** `session-rundown.html` (Parts, durations,
  fallbacks).

---

## F. Verification (before going live)

1. **Dry-run two phases end-to-end:**
   - **04 slice** → on `04_begin`, run `/slice` and confirm it calls `save_issue` four
     times and creates 001–004 on the Linear board **with the blocked-by edges**.
   - **05 build** → on `05_begin`, run `/build` and confirm **001 moves Todo → Done** and
     **7 tests** pass.
   - These also confirm the reconfigured `docs/agents/issue-tracker.md` makes a live
     agent target Linear.
2. **Every branch green:** for each `NN_begin` / `NN_end`, `npm test` and
   `npm run typecheck` pass (expected test counts: 05→7, 08→8, 10→9, 11→13).
3. **No dangling refs:** the runbook's branch names (`00_begin`…`11_end`,
   `relay/002-tiers`, `relay/003-decay`), commands, and deck/lecture references all
   resolve.
