import type { Activity, ActivityKind, Lead, ScoreEvent } from './types'

/**
 * The data seam for leads, their activity, and their score ledger. Services and
 * tests both cross THIS interface — it's the test surface. The in-memory adapter
 * below is what the app and tests run on today; a real Postgres adapter would
 * satisfy the same interface without callers changing.
 *
 * Score is event-sourced (ADR 0002): `recordScoreEvent` appends to a ledger and
 * `getScore` sums it — there is no stored total to keep in sync.
 */
export interface LeadRepo {
  getLeads(): Lead[]
  getLead(id: string): Lead | undefined
  getActivities(leadId: string): Activity[]
  /** Append an activity and bump the lead's lastActivityAt. Returns it. */
  recordActivity(input: { leadId: string; kind: ActivityKind; at?: string }): Activity
  /** Append a score event to the ledger. Returns it. */
  recordScoreEvent(input: { leadId: string; delta: number; reason: ActivityKind; at?: string }): ScoreEvent
  /** A lead's current score: the sum of its ScoreEvent deltas. */
  getScore(leadId: string): number
}

let activitySeq = 0
function nextActivityId(): string {
  activitySeq += 1
  return `act_${activitySeq}`
}

let scoreEventSeq = 0
function nextScoreEventId(): string {
  scoreEventSeq += 1
  return `sev_${scoreEventSeq}`
}

export class InMemoryLeadRepo implements LeadRepo {
  private leads = new Map<string, Lead>()
  private activities: Activity[] = []
  private scoreEvents: ScoreEvent[] = []

  constructor(seed?: { leads?: Lead[]; activities?: Activity[]; scoreEvents?: ScoreEvent[] }) {
    for (const lead of seed?.leads ?? []) this.leads.set(lead.id, { ...lead })
    for (const a of seed?.activities ?? []) this.activities.push({ ...a })
    for (const e of seed?.scoreEvents ?? []) this.scoreEvents.push({ ...e })
  }

  getLeads(): Lead[] {
    return [...this.leads.values()]
  }

  getLead(id: string): Lead | undefined {
    const lead = this.leads.get(id)
    return lead ? { ...lead } : undefined
  }

  getActivities(leadId: string): Activity[] {
    return this.activities.filter((a) => a.leadId === leadId)
  }

  recordActivity(input: { leadId: string; kind: ActivityKind; at?: string }): Activity {
    const lead = this.leads.get(input.leadId)
    if (!lead) throw new Error(`unknown lead: ${input.leadId}`)
    const at = input.at ?? new Date().toISOString()
    const activity: Activity = { id: nextActivityId(), leadId: input.leadId, kind: input.kind, at }
    this.activities.push(activity)
    lead.lastActivityAt = at
    return activity
  }

  recordScoreEvent(input: { leadId: string; delta: number; reason: ActivityKind; at?: string }): ScoreEvent {
    if (!this.leads.has(input.leadId)) throw new Error(`unknown lead: ${input.leadId}`)
    const at = input.at ?? new Date().toISOString()
    const event: ScoreEvent = { id: nextScoreEventId(), leadId: input.leadId, delta: input.delta, reason: input.reason, at }
    this.scoreEvents.push(event)
    return event
  }

  getScore(leadId: string): number {
    return this.scoreEvents
      .filter((e) => e.leadId === leadId)
      .reduce((sum, e) => sum + e.delta, 0)
  }
}
