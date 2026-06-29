import { describe, expect, it } from 'vitest'
import { makeTestRepo } from '../test/makeTestRepo'
import { createLeadService } from './leadService'

// These tests describe behaviour through the LeadRepo / service interface — they
// say nothing about how data is stored, so they survive any refactor. Use them
// as the template when you TDD Lead Scoring.

describe('leadService.listLeads', () => {
  it('orders leads by score, highest first', () => {
    const repo = makeTestRepo([{ id: 'low' }, { id: 'high' }, { id: 'mid' }])
    repo.recordScoreEvent({ leadId: 'high', delta: 20, reason: 'email_reply' })
    repo.recordScoreEvent({ leadId: 'mid', delta: 8, reason: 'email_reply' })
    const service = createLeadService(repo)

    expect(service.listLeads().map((l) => l.id)).toEqual(['high', 'mid', 'low'])
  })

  it('breaks ties on equal score by recency, then name', () => {
    const repo = makeTestRepo([
      { id: 'b', name: 'Bravo', lastActivityAt: '2026-06-10T09:00:00.000Z' },
      { id: 'a', name: 'Alpha', lastActivityAt: '2026-06-10T09:00:00.000Z' },
      { id: 'fresh', name: 'Zeta', lastActivityAt: '2026-06-20T09:00:00.000Z' },
    ])
    const service = createLeadService(repo)

    // all score 0 → fresher activity wins; equal recency falls back to name
    expect(service.listLeads().map((l) => l.id)).toEqual(['fresh', 'a', 'b'])
  })
})

describe('leadService.logReply', () => {
  it('records an email reply on the lead', () => {
    const repo = makeTestRepo([{ id: 'target' }])
    const service = createLeadService(repo)

    service.logReply('target')

    expect(service.getActivities('target')[0].kind).toBe('email_reply')
  })
})
