import type { Lead } from '../domain/types'
import type { Tier } from '../services/scoringService'
import { LeadRow } from './LeadRow'

export function LeadList({
  leads,
  scoreOf,
  tierOf,
  selectedId,
  onSelect,
  onLogReply,
}: {
  leads: Lead[]
  scoreOf: (id: string) => number
  tierOf: (id: string) => Tier
  selectedId: string | null
  onSelect: (id: string) => void
  onLogReply: (id: string) => void
}) {
  return (
    <table className="leads">
      <thead>
        <tr>
          <th>Lead</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Score</th>
          <th>Last activity</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead: Lead) => (
          <LeadRow
            key={lead.id}
            lead={lead}
            score={scoreOf(lead.id)}
            tier={tierOf(lead.id)}
            selected={lead.id === selectedId}
            onSelect={onSelect}
            onLogReply={onLogReply}
          />
        ))}
      </tbody>
    </table>
  )
}
