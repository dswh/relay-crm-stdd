import type { Activity, ActivityKind, Lead } from './types'

/**
 * The data seam for leads and their activity. Services and tests both cross
 * THIS interface — it's the test surface. The in-memory adapter below is what
 * the app and tests run on today; a real Postgres adapter would satisfy the
 * same interface without callers changing.
 *
 * NOTE FOR THE CLASS: when you add Lead Scoring you'll likely add a place to
 * persist a `ScoreEvent` and read a lead's score. Decide whether that lives
 * behind this interface or a new `scoringService` — that's a `/deepen` question.
 */
export interface LeadRepo {
  getLeads(): Lead[]
  getLead(id: string): Lead | undefined
  getActivities(leadId: string): Activity[]
  /** Append an activity and bump the lead's lastActivityAt. Returns it. */
  recordActivity(input: { leadId: string; kind: ActivityKind; at?: string }): Activity
}

let activitySeq = 0
function nextActivityId(): string {
  activitySeq += 1
  return `act_${activitySeq}`
}

export class InMemoryLeadRepo implements LeadRepo {
  private leads = new Map<string, Lead>()
  private activities: Activity[] = []

  constructor(seed?: { leads?: Lead[]; activities?: Activity[] }) {
    for (const lead of seed?.leads ?? []) this.leads.set(lead.id, { ...lead })
    for (const a of seed?.activities ?? []) this.activities.push({ ...a })
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
}
