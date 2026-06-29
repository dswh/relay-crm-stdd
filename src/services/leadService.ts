import type { LeadRepo } from '../domain/leadRepo'
import type { Activity, Lead } from '../domain/types'

/**
 * Read/shape leads for the UI. Built over the LeadRepo seam so it's testable
 * through this interface (see leadService.test.ts).
 *
 * Today `listLeads` sorts by recency — which is exactly the problem the brief
 * names: "the hot ones go cold." A lead that just got auto-created outranks one
 * that booked a demo last week, because all we know is *when*, not *worth*.
 * Lead Scoring is what fixes the ordering.
 */
export function createLeadService(repo: LeadRepo) {
  return {
    /** All leads, most-recently-active first. */
    listLeads(): Lead[] {
      return repo.getLeads().sort((a, b) => {
        const byRecency = b.lastActivityAt.localeCompare(a.lastActivityAt)
        return byRecency !== 0 ? byRecency : a.name.localeCompare(b.name)
      })
    },

    getLead(id: string): Lead | undefined {
      return repo.getLead(id)
    },

    getActivities(leadId: string): Activity[] {
      return repo
        .getActivities(leadId)
        .sort((a, b) => b.at.localeCompare(a.at))
    },

    /** A lead replies to one of our emails. Records the activity (and, today,
     *  just bumps recency). This is the seam Lead Scoring hooks into. */
    logReply(leadId: string): Activity {
      return repo.recordActivity({ leadId, kind: 'email_reply' })
    },
  }
}

export type LeadService = ReturnType<typeof createLeadService>
