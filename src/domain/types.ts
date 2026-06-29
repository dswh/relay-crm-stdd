// Relay CRM — core domain types.
//
// NOTE FOR THE CLASS: there is deliberately NO score, tier, or ScoreEvent here
// yet. Lead Scoring is the feature you build during the session. These are the
// concepts the brief starts from.

export type LeadStatus = 'new' | 'working' | 'qualified'

/** The kinds of activity a lead can generate. Some signal real buying intent
 *  (a reply, a booked demo); some are noisy (an email open). Deciding which
 *  ones score, and how much, is one of the questions `/align` will surface. */
export type ActivityKind =
  | 'email_reply'
  | 'email_open'
  | 'demo_booked'
  | 'pricing_visit'
  | 'call_logged'

export interface Lead {
  id: string
  name: string
  company: string
  title: string
  email: string
  owner: string // the rep who owns the lead
  status: LeadStatus
  createdAt: string // ISO
  lastActivityAt: string // ISO — what the list currently sorts by
}

export interface Activity {
  id: string
  leadId: string
  kind: ActivityKind
  at: string // ISO
}
