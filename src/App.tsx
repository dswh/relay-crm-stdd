import { useMemo, useRef, useState } from 'react'
import { seededRepo } from './domain/seed'
import { createLeadService } from './services/leadService'
import { createScoringService } from './services/scoringService'
import { LeadList } from './ui/LeadList'
import { LeadDetail } from './ui/LeadDetail'

export default function App() {
  // One in-memory repo for the session; a `tick` forces a re-read after writes.
  const repoRef = useRef(seededRepo())
  const service = useMemo(() => createLeadService(repoRef.current), [])
  const scoring = useMemo(() => createScoringService(repoRef.current), [])
  const [, setTick] = useState(0)
  const refresh = () => setTick((t) => t + 1)

  const [selectedId, setSelectedId] = useState<string | null>(null)

  const leads = service.listLeads()
  const selected = selectedId ? service.getLead(selectedId) : undefined

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">◈</span> Relay
        </div>
        <nav className="nav">
          <span className="nav-item active">Leads</span>
          <span className="nav-item">Deals</span>
          <span className="nav-item">Reports</span>
        </nav>
        <div className="user">priya@relay.app</div>
      </header>

      <div className="session-banner">
        <strong>Master class:</strong> you're about to build <strong>Lead Scoring</strong>. Read{' '}
        <code>BRIEF.md</code>, then run <code>/align</code> to start.
      </div>

      <main className="content">
        <section className="leads-panel">
          <div className="panel-head">
            <h1>Leads</h1>
            <span className="count">{leads.length} leads · sorted by score</span>
          </div>
          <LeadList
            leads={leads}
            scoreOf={(id) => scoring.getScore(id)}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onLogReply={(id) => {
              // the reply path: record the activity AND award score
              service.logReply(id)
              scoring.recordReply(id)
              refresh()
            }}
          />
        </section>

        {selected && (
          <LeadDetail
            lead={selected}
            activities={service.getActivities(selected.id)}
            onClose={() => setSelectedId(null)}
          />
        )}
      </main>
    </div>
  )
}
