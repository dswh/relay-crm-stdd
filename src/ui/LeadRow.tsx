import type { Lead } from '../domain/types'
import { initials, relativeTime, statusLabel } from './format'

export function LeadRow({
  lead,
  selected,
  onSelect,
  onLogReply,
}: {
  lead: Lead
  selected: boolean
  onSelect: (id: string) => void
  onLogReply: (id: string) => void
}) {
  return (
    <tr className={selected ? 'row selected' : 'row'} onClick={() => onSelect(lead.id)}>
      <td className="cell-lead">
        <span className="avatar">{initials(lead.name)}</span>
        <span className="lead-text">
          <span className="lead-name">{lead.name}</span>
          <span className="lead-sub">
            {lead.title} · {lead.company}
          </span>
        </span>
      </td>
      <td>
        <span className={`status status-${lead.status}`}>{statusLabel[lead.status]}</span>
      </td>
      <td className="muted">{lead.owner}</td>
      {/* NOTE FOR THE CLASS: today there's no "worth" column — only recency.
          The score / tier badge you build goes here, and the list re-sorts by it. */}
      <td className="muted">{relativeTime(lead.lastActivityAt)}</td>
      <td className="cell-action">
        <button
          className="btn-reply"
          onClick={(e) => {
            e.stopPropagation()
            onLogReply(lead.id)
          }}
        >
          Log reply
        </button>
      </td>
    </tr>
  )
}
