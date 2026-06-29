import type { Activity, Lead } from '../domain/types'
import type { Tier } from '../services/scoringService'
import { activityLabel, initials, relativeTime, statusLabel, tierLabel } from './format'

export function LeadDetail({
  lead,
  score,
  tier,
  activities,
  onClose,
}: {
  lead: Lead
  score: number
  tier: Tier
  activities: Activity[]
  onClose: () => void
}) {
  return (
    <aside className="detail">
      <button className="detail-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <div className="detail-head">
        <span className="avatar lg">{initials(lead.name)}</span>
        <div>
          <h2>{lead.name}</h2>
          <p className="muted">
            {lead.title} · {lead.company}
          </p>
          <p className="detail-tier">
            <span className={`tier-badge tier-${tier}`}>{tierLabel[tier]}</span>
            <span className="score-num muted">score {score}</span>
          </p>
        </div>
      </div>

      <dl className="detail-meta">
        <div><dt>Status</dt><dd><span className={`status status-${lead.status}`}>{statusLabel[lead.status]}</span></dd></div>
        <div><dt>Owner</dt><dd>{lead.owner}</dd></div>
        <div><dt>Email</dt><dd>{lead.email}</dd></div>
        <div><dt>Created</dt><dd>{relativeTime(lead.createdAt)}</dd></div>
      </dl>

      <h3 className="detail-section">Activity</h3>
      {activities.length === 0 ? (
        <p className="muted empty">No activity yet.</p>
      ) : (
        <ul className="timeline">
          {activities.map((a) => (
            <li key={a.id}>
              <span className={`dot dot-${a.kind}`} />
              <span className="t-label">{activityLabel[a.kind]}</span>
              <span className="t-when muted">{relativeTime(a.at)}</span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}
