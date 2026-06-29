// ───────────────────────────────────────────────────────────────────────────
// SPIKE — THROWAWAY. Not production. Delete after the decision is captured.
//
// Question (from /align): does the tier + decay state machine feel right?
//   - cold → warm → hot as score climbs?
//   - does a hot lead cool sensibly when it goes quiet?
//   - does "14 idle days" behave at a day-boundary, or do we double-count?
//
// Run:  node spike/score-state-machine.mjs
// No persistence, no tests, no abstractions — it just walks scenarios and
// prints the full state after every step (spike rule: surface the state).
// ───────────────────────────────────────────────────────────────────────────

const WEIGHTS = { email_reply: 10, demo_booked: 8, pricing_visit: 5, email_open: 1 };
const TIERS = [
  { tier: "hot", min: 20 },
  { tier: "warm", min: 8 },
  { tier: "cold", min: -Infinity },
];
const DECAY = { idleDays: 14, perNight: 2 }; // start cooling after 14 idle days, -2/night

const tierOf = (score) => TIERS.find((t) => score >= t.min).tier;

// A lead is just its ScoreEvent ledger (event-sourced, per ADR 0002).
const score = (events) => events.reduce((sum, e) => sum + e.delta, 0);

function show(label, day, events) {
  const s = score(events);
  console.log(`  ${label.padEnd(28)} day ${String(day).padStart(2)}  score=${String(s).padStart(3)}  [${tierOf(s)}]`);
}

// Model time as whole day-numbers (not ms). The decay question is whether we count
// idle in *calendar days* or raw 24h windows — calendar days, reset by any activity,
// avoid a lead "decaying" twice when a nightly job and an activity land on the same date.
const daysBetween = (a, b) => b - a;

function activity(events, kind, day) {
  events.push({ delta: WEIGHTS[kind], reason: kind, at: day });
  show(`+ ${kind}`, day, events);
}

function runNightlyDecay(events, today) {
  // idleness is measured from the last *activity* — a decay event must not reset
  // the clock, or a lead would only cool once every 14 days instead of nightly.
  const activities = events.filter((e) => e.reason !== "decay");
  const lastAt = activities.length ? Math.max(...activities.map((e) => e.at)) : 0;
  const idle = daysBetween(lastAt, today);
  if (idle >= DECAY.idleDays && score(events) > 0) {
    events.push({ delta: -DECAY.perNight, reason: "decay", at: today });
    show(`· nightly decay (idle ${idle}d)`, today, events);
    return true;
  }
  return false;
}

console.log("\nA) climb: cold → warm → hot");
{
  const e = [];
  activity(e, "email_open", 0);    // 1   cold
  activity(e, "pricing_visit", 1); // 6   cold
  activity(e, "email_reply", 2);   // 16  warm
  activity(e, "demo_booked", 3);   // 24  hot
}

console.log("\nB) a hot lead goes quiet — does it cool?");
{
  const e = [];
  activity(e, "email_reply", 0);
  activity(e, "demo_booked", 0);   // 18 warm... +reply earlier = let's push hot
  activity(e, "email_reply", 0);   // 28 hot, last activity day 0
  for (let day = 1; day <= 25; day++) runNightlyDecay(e, day);
  show("final", 25, e);
}

console.log("\nC) day-boundary: activity and the nightly job on the same date");
{
  const e = [];
  activity(e, "email_reply", 0);       // last activity day 0
  // 14 idle days later the nightly job runs (day 14). An email_open also lands day 14.
  runNightlyDecay(e, 14);              // should decay once (idle == 14)
  activity(e, "email_open", 14);       // resets idleness
  runNightlyDecay(e, 14);              // SAME date — must NOT decay again
  show("final", 14, e);
}

console.log("\nAnswer → see spike/NOTES.md\n");
