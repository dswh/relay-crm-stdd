import { describe, expect, it } from 'vitest'
import { makeTestRepo } from '../test/makeTestRepo'
import { createScoringService, tierOf } from './scoringService'
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

  // Slice 002 — tiers are a view of the score, pinned at the launch thresholds.
  it('derives the tier from the score at the launch thresholds', () => {
    expect(tierOf(20)).toBe('hot') // hot ≥ 20
    expect(tierOf(19)).toBe('warm')
    expect(tierOf(8)).toBe('warm') // warm 8–19
    expect(tierOf(7)).toBe('cold')
    expect(tierOf(0)).toBe('cold') // cold < 8
  })

  it('reports a lead tier through the service', () => {
    const repo = makeTestRepo([{ id: 'lead1' }])
    const scoring = createScoringService(repo)

    expect(scoring.getTier('lead1')).toBe('cold')
    scoring.recordReply('lead1') // +10
    expect(scoring.getTier('lead1')).toBe('warm')
    scoring.recordReply('lead1') // +10 → 20
    expect(scoring.getTier('lead1')).toBe('hot')
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
