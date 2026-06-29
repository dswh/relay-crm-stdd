import { InMemoryLeadRepo } from '../domain/leadRepo'
import type { Lead } from '../domain/types'

/**
 * A tiny, deterministic repo for tests — the test-side adapter behind the same
 * LeadRepo interface the app uses. Build exactly the leads a test needs.
 *
 * This is the pattern Lead Scoring's tests should follow: drive the real
 * services through the repo seam, assert on observable behaviour, never on
 * internals.
 */
const baseLead = (over: Partial<Lead> & Pick<Lead, 'id'>): Lead => ({
  name: over.id,
  company: 'Acme',
  title: 'Buyer',
  email: `${over.id}@acme.com`,
  owner: 'priya',
  status: 'new',
  createdAt: '2026-06-01T09:00:00.000Z',
  lastActivityAt: '2026-06-01T09:00:00.000Z',
  ...over,
})

export function makeTestRepo(leads: Array<Partial<Lead> & Pick<Lead, 'id'>>): InMemoryLeadRepo {
  return new InMemoryLeadRepo({ leads: leads.map(baseLead) })
}
