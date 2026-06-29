import type { LeadRepo } from '../domain/leadRepo'
import type { Activity, Lead } from '../domain/types'
import type { ScoringService } from './scoringService'

/**
 * Read/shape leads for the UI. Built over the LeadRepo seam so it's testable
 * through this interface (see leadService.test.ts).
 *
 * Scoring lives behind ONE deep module (`scoringService`): leadService composes it
 * for sorting and for the reply path, rather than touching the ScoreEvent ledger
 * itself. `listLeads` sorts by **score** — worth, not recency — which is what the
 * brief asked for: stop letting the hot ones go cold. Recency only breaks ties.
 */
export function createLeadService(repo: LeadRepo, scoring: ScoringService) {
  return {
    /** All leads, highest score first. Ties break by recency, then name. */
    listLeads(): Lead[] {
      // Score each lead once — getScore scans the ledger, so calling it inside the
      // comparator (twice per comparison) would be quadratic on the 40k backfill.
      const leads = repo.getLeads()
      const score = new Map(leads.map((l) => [l.id, scoring.getScore(l.id)]))
      return leads.sort((a, b) => {
        const byRecency = b.lastActivityAt.localeCompare(a.lastActivityAt)
        if (byRecency !== 0) return byRecency
        const byScore = (score.get(b.id) ?? 0) - (score.get(a.id) ?? 0)
        return byScore !== 0 ? byScore : a.name.localeCompare(b.name)
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

    /** A lead replies to one of our emails — the single reply path. Records the
     *  activity AND awards score through the scoring module, so the two can never
     *  drift (was two separate calls before /deepen; see issue 005). */
    logReply(leadId: string): Activity {
      const activity = repo.recordActivity({ leadId, kind: 'email_reply' })
      scoring.recordReply(leadId)
      return activity
    },
  }
}

export type LeadService = ReturnType<typeof createLeadService>
