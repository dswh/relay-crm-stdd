// Relay CRM — core domain types.

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

/** Why a score changed: the ActivityKind that earned it, or nightly `decay`. */
export type ScoreReason = ActivityKind | 'decay'

/** An immutable record that a lead's score changed by `delta`, for a `reason`,
 *  at a time. The ledger: a lead's Score is the running sum of its ScoreEvents
 *  (ADR 0002 — event-sourced, no stored total). */
export interface ScoreEvent {
  id: string
  leadId: string
  delta: number
  reason: ScoreReason
  at: string // ISO
}
