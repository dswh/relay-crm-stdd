import type { LeadRepo } from '../domain/leadRepo'

/**
 * Lead Scoring — a deep module over the LeadRepo seam. Small interface
 * (`recordReply`, `getScore`), real behaviour hidden: how much a reply is worth,
 * and that score is the sum of an event ledger (ADR 0002), live here. Callers and
 * tests cross this interface; they never touch ScoreEvents directly.
 *
 * Slice 001 (tracer bullet) scores one signal — an email reply. Tiers, the other
 * activity kinds, decay, and backfill widen this module in later slices.
 */
const REPLY_POINTS = 10

export function createScoringService(repo: LeadRepo) {
  return {
    /** A lead replied to one of our emails — award score. */
    recordReply(leadId: string): void {
      repo.recordScoreEvent({ leadId, delta: REPLY_POINTS, reason: 'email_reply' })
    },

    /** A lead's current score (sum of its ScoreEvents). 0 if it has none. */
    getScore(leadId: string): number {
      return repo.getScore(leadId)
    },
  }
}

export type ScoringService = ReturnType<typeof createScoringService>
