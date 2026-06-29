import { describe, expect, it } from 'vitest'
import { makeTestRepo } from '../test/makeTestRepo'
import { createLeadService } from './leadService'

// These tests describe behaviour through the LeadRepo / service interface — they
// say nothing about how data is stored, so they survive any refactor. Use them
// as the template when you TDD Lead Scoring.

describe('leadService.listLeads', () => {
  it('orders leads by most recent activity first', () => {
    const repo = makeTestRepo([
      { id: 'old', lastActivityAt: '2026-06-01T09:00:00.000Z' },
      { id: 'fresh', lastActivityAt: '2026-06-20T09:00:00.000Z' },
      { id: 'mid', lastActivityAt: '2026-06-10T09:00:00.000Z' },
    ])
    const service = createLeadService(repo)

    expect(service.listLeads().map((l) => l.id)).toEqual(['fresh', 'mid', 'old'])
  })

  it('breaks ties on equal recency by name', () => {
    const repo = makeTestRepo([
      { id: 'b', name: 'Bravo', lastActivityAt: '2026-06-10T09:00:00.000Z' },
      { id: 'a', name: 'Alpha', lastActivityAt: '2026-06-10T09:00:00.000Z' },
    ])
    const service = createLeadService(repo)

    expect(service.listLeads().map((l) => l.name)).toEqual(['Alpha', 'Bravo'])
  })
})

describe('leadService.logReply', () => {
  it('records an email reply and moves the lead to the front of the list', () => {
    const repo = makeTestRepo([
      { id: 'target', lastActivityAt: '2026-06-01T09:00:00.000Z' },
      { id: 'other', lastActivityAt: '2026-06-15T09:00:00.000Z' },
    ])
    const service = createLeadService(repo)

    service.logReply('target')

    // recency-only ordering: a fresh reply jumps the lead to the top — even
    // though "worth" hasn't been considered at all. (That's the bug to fix.)
    expect(service.listLeads()[0].id).toBe('target')
    expect(service.getActivities('target')[0].kind).toBe('email_reply')
  })
})
