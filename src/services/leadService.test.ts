import { describe, expect, it } from 'vitest'
import { makeTestRepo } from '../test/makeTestRepo'
import { createLeadService } from './leadService'
import { createScoringService } from './scoringService'

const services = (repo: ReturnType<typeof makeTestRepo>) => {
  const scoring = createScoringService(repo)
  return { scoring, service: createLeadService(repo, scoring) }
}

// These tests describe behaviour through the LeadRepo / service interface — they
// say nothing about how data is stored, so they survive any refactor. Use them
// as the template when you TDD Lead Scoring.

describe('leadService.listLeads', () => {
  it('orders leads by score, highest first', () => {
    const repo = makeTestRepo([{ id: 'low' }, { id: 'high' }, { id: 'mid' }])
    repo.recordScoreEvent({ leadId: 'high', delta: 20, reason: 'email_reply' })
    repo.recordScoreEvent({ leadId: 'mid', delta: 8, reason: 'email_reply' })
    const { service } = services(repo)

    expect(service.listLeads().map((l) => l.id)).toEqual(['high', 'mid', 'low'])
  })

  it('breaks ties on equal score by recency, then name', () => {
    const repo = makeTestRepo([
      { id: 'b', name: 'Bravo', lastActivityAt: '2026-06-10T09:00:00.000Z' },
      { id: 'a', name: 'Alpha', lastActivityAt: '2026-06-10T09:00:00.000Z' },
      { id: 'fresh', name: 'Zeta', lastActivityAt: '2026-06-20T09:00:00.000Z' },
    ])
    const { service } = services(repo)

    // all score 0 → fresher activity wins; equal recency falls back to name
    expect(service.listLeads().map((l) => l.id)).toEqual(['fresh', 'a', 'b'])
  })
})

describe('leadService.logReply', () => {
  it('records the reply activity AND awards score (one path, no drift)', () => {
    const repo = makeTestRepo([{ id: 'target' }])
    const { scoring, service } = services(repo)

    service.logReply('target')

    expect(service.getActivities('target')[0].kind).toBe('email_reply')
    expect(scoring.getScore('target')).toBe(10)
  })
})
