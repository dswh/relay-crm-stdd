import { describe, expect, it } from 'vitest'
import { makeTestRepo } from '../test/makeTestRepo'
import { createDecayService } from './decayService'

// Behaviour through the LeadRepo seam — reproduces the scenarios from spike/NOTES.md.
const day = (n: number) => new Date(Date.UTC(2026, 5, 1 + n)).toISOString() // 2026-06-01 + n days

// Helper: a lead that was active on `at` and already carries `score`.
function activeLead(repo: ReturnType<typeof makeTestRepo>, id: string, score: number, at: string) {
  repo.recordActivity({ leadId: id, kind: 'email_reply', at })
  repo.recordScoreEvent({ leadId: id, delta: score, reason: 'email_reply', at })
}

describe('decayService', () => {
  it('cools a lead idle >= 14 days by 2 per night', () => {
    const repo = makeTestRepo([{ id: 'l' }])
    activeLead(repo, 'l', 28, day(0))
    const decay = createDecayService(repo)

    decay.runDecay(day(14)) // idle 14 → −2
    expect(repo.getScore('l')).toBe(26)
    decay.runDecay(day(15)) // idle 15 (measured from the activity, not the decay) → −2
    expect(repo.getScore('l')).toBe(24)
  })

  it('leaves a lead idle < 14 days alone', () => {
    const repo = makeTestRepo([{ id: 'l' }])
    activeLead(repo, 'l', 10, day(0))

    createDecayService(repo).runDecay(day(13))

    expect(repo.getScore('l')).toBe(10)
  })

  it('does not decay twice on a date the lead was also active', () => {
    const repo = makeTestRepo([{ id: 'l' }])
    activeLead(repo, 'l', 10, day(0))
    const decay = createDecayService(repo)

    decay.runDecay(day(14)) // idle 14 → −2 (score 8)
    repo.recordActivity({ leadId: 'l', kind: 'email_open', at: day(14) }) // active again
    decay.runDecay(day(14)) // idle now 0 → no decay

    expect(repo.getScore('l')).toBe(8)
  })

  it('floors the score at 0', () => {
    const repo = makeTestRepo([{ id: 'l' }])
    activeLead(repo, 'l', 1, day(0))

    createDecayService(repo).runDecay(day(20)) // −min(2, 1) = −1 → 0

    expect(repo.getScore('l')).toBe(0)
  })
})
