import type { Lead } from '../domain/types'
import { LeadRow } from './LeadRow'

export function LeadList({
  leads,
  scoreOf,
  selectedId,
  onSelect,
  onLogReply,
}: {
  leads: Lead[]
  scoreOf: (id: string) => number
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
            selected={lead.id === selectedId}
            onSelect={onSelect}
            onLogReply={onLogReply}
          />
        ))}
      </tbody>
    </table>
  )
}
