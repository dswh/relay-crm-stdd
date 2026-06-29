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
      // Score each lead once — getScore scans the ledger, so calling it inside the
      // comparator (twice per comparison) would be quadratic on the 40k backfill.
      const leads = repo.getLeads()
      const score = new Map(leads.map((l) => [l.id, repo.getScore(l.id)]))
      return leads.sort((a, b) => {
        const byScore = (score.get(b.id) ?? 0) - (score.get(a.id) ?? 0)
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
