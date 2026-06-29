import { describe, expect, it } from 'vitest'
import { makeTestRepo } from '../test/makeTestRepo'
import { createScoringService } from './scoringService'
import { createLeadService } from './leadService'

// Behaviour through the LeadRepo / service interface — nothing about how score is
// stored, so these survive any refactor (e.g. caching a materialised total later).

describe('scoringService', () => {
  it('a lead gains points when it replies to an email', () => {
    const repo = makeTestRepo([{ id: 'lead1' }])
    const scoring = createScoringService(repo)

    scoring.recordReply('lead1')

    expect(scoring.getScore('lead1')).toBe(10)
  })

  it('a score is the running sum of its score events', () => {
    const repo = makeTestRepo([{ id: 'lead1' }])
    const scoring = createScoringService(repo)

    scoring.recordReply('lead1')
    scoring.recordReply('lead1')

    expect(scoring.getScore('lead1')).toBe(20)
  })

  it('a lead with no score events scores 0', () => {
    const repo = makeTestRepo([{ id: 'quiet' }])
    const scoring = createScoringService(repo)

    expect(scoring.getScore('quiet')).toBe(0)
  })

  // The tracer bullet, end to end: a reply awards score AND the lead climbs the list.
  it('a lead that replies rises to the top of the list', () => {
    const repo = makeTestRepo([{ id: 'a' }, { id: 'b' }])
    const scoring = createScoringService(repo)
    const leads = createLeadService(repo, scoring)

    // both start at score 0 — tie breaks by name, so 'a' is first
    expect(leads.listLeads()[0].id).toBe('a')

    scoring.recordReply('b')

    expect(scoring.getScore('b')).toBe(10)
    expect(leads.listLeads()[0].id).toBe('b')
  })
})
