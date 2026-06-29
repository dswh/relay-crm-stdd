import type { LeadRepo } from '../domain/leadRepo'
import type { Activity, Lead } from '../domain/types'

/**
 * Read/shape leads for the UI. Built over the LeadRepo seam so it's testable
 * through this interface (see leadService.test.ts).
 *
 * `listLeads` now sorts by **score** — worth, not recency — which is what the
 * brief asked for: stop letting the hot ones go cold. Recency only breaks ties.
 */
export function createLeadService(repo: LeadRepo) {
  return {
    /** All leads, highest score first. Ties break by recency, then name. */
    listLeads(): Lead[] {
      return repo.getLeads().sort((a, b) => {
        const byScore = repo.getScore(b.id) - repo.getScore(a.id)
        if (byScore !== 0) return byScore
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
