import type { LeadRepo } from '../domain/leadRepo'

const IDLE_DAYS = 14
const PER_NIGHT = 2

/** Whole calendar days from ISO `a` to ISO `b` (UTC day boundaries). */
function calendarDaysBetween(a: string, b: string): number {
  const day = (iso: string) => Math.floor(new Date(iso).getTime() / 86_400_000)
  return day(b) - day(a)
}

/**
 * Nightly decay — the one batch path (ADR 0001). Cools leads idle ≥ 14 days by
 * appending negative `ScoreEvent`s. The rules the `/spike` pinned:
 *   - idleness is measured from the last *activity* (decay events don't reset it),
 *   - counted in whole calendar days, so a lead never decays twice on a date it
 *     was also active,
 *   - and the score floors at 0.
 */
export function createDecayService(repo: LeadRepo) {
  return {
    /** Run one nightly pass as of the given date (ISO). */
    runDecay(asOf: string): void {
      for (const lead of repo.getLeads()) {
        const activities = repo.getActivities(lead.id)
        if (activities.length === 0) continue
        const lastActivityAt = activities.reduce((m, a) => (a.at > m ? a.at : m), activities[0].at)
        const idle = calendarDaysBetween(lastActivityAt, asOf)
        const score = repo.getScore(lead.id)
        if (idle >= IDLE_DAYS && score > 0) {
          repo.recordScoreEvent({ leadId: lead.id, delta: -Math.min(PER_NIGHT, score), reason: 'decay', at: asOf })
        }
      }
    },
  }
}

export type DecayService = ReturnType<typeof createDecayService>
