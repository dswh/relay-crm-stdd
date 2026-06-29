import { InMemoryLeadRepo } from './leadRepo'
import type { Activity, ActivityKind, Lead, LeadStatus } from './types'

// A small, hand-built slice of Relay's book of business. In production this is
// ~40,000 leads (that's the "retroactive backfill" the brief worries about);
// here we seed a representative ~30 so the list is real to work against.

interface LeadSeed {
  id: string
  name: string
  company: string
  title: string
  owner: string
  status: LeadStatus
  created: string // YYYY-MM-DD
  last: string // YYYY-MM-DD — lastActivityAt
  // recent activity, most-recent last
  acts?: Array<[ActivityKind, string /* YYYY-MM-DD */]>
}

const ISO = (d: string) => `${d}T09:00:00.000Z`
const email = (name: string, company: string) =>
  `${name.toLowerCase().split(' ')[0]}@${company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`

const SEED: LeadSeed[] = [
  { id: 'lead_1', name: 'Dana Okafor', company: 'Northwind Logistics', title: 'VP Operations', owner: 'priya', status: 'working', created: '2026-05-02', last: '2026-06-21', acts: [['email_open', '2026-06-18'], ['pricing_visit', '2026-06-20'], ['email_reply', '2026-06-21']] },
  { id: 'lead_2', name: 'Marcus Lee', company: 'Brightwave Media', title: 'Head of Growth', owner: 'sam', status: 'qualified', created: '2026-04-18', last: '2026-06-22', acts: [['demo_booked', '2026-06-15'], ['email_reply', '2026-06-22']] },
  { id: 'lead_3', name: 'Aisha Rahman', company: 'Cedar Health', title: 'Director of IT', owner: 'priya', status: 'new', created: '2026-06-19', last: '2026-06-19' },
  { id: 'lead_4', name: 'Tom Vargas', company: 'Pinnacle Realty', title: 'Broker', owner: 'sam', status: 'working', created: '2026-03-30', last: '2026-06-10', acts: [['email_open', '2026-06-09'], ['email_open', '2026-06-10']] },
  { id: 'lead_5', name: 'Lena Petrov', company: 'Atlas Robotics', title: 'COO', owner: 'priya', status: 'qualified', created: '2026-04-01', last: '2026-06-22', acts: [['pricing_visit', '2026-06-21'], ['demo_booked', '2026-06-22']] },
  { id: 'lead_6', name: 'Owen Bryce', company: 'Maple & Co', title: 'Founder', owner: 'sam', status: 'working', created: '2026-05-20', last: '2026-06-12', acts: [['email_reply', '2026-06-12']] },
  { id: 'lead_7', name: 'Priya Nair', company: 'Solstice Energy', title: 'Procurement Lead', owner: 'priya', status: 'new', created: '2026-06-16', last: '2026-06-17', acts: [['email_open', '2026-06-17']] },
  { id: 'lead_8', name: 'Hugo Martin', company: 'Verge Analytics', title: 'CTO', owner: 'sam', status: 'working', created: '2026-02-11', last: '2026-06-23', acts: [['pricing_visit', '2026-06-22'], ['pricing_visit', '2026-06-23'], ['email_reply', '2026-06-23']] },
  { id: 'lead_9', name: 'Sofia Reyes', company: 'Harbor Foods', title: 'Supply Chain Mgr', owner: 'priya', status: 'working', created: '2026-05-05', last: '2026-06-08' },
  { id: 'lead_10', name: 'Caleb Frost', company: 'Quill Software', title: 'Eng Manager', owner: 'sam', status: 'qualified', created: '2026-03-22', last: '2026-06-20', acts: [['demo_booked', '2026-06-14'], ['email_reply', '2026-06-20']] },
  { id: 'lead_11', name: 'Mira Shah', company: 'Lumen Retail', title: 'Head of Ops', owner: 'priya', status: 'new', created: '2026-06-20', last: '2026-06-20' },
  { id: 'lead_12', name: 'Gabriel Santos', company: 'Ironclad Manufacturing', title: 'Plant Director', owner: 'sam', status: 'working', created: '2026-04-27', last: '2026-06-05', acts: [['email_open', '2026-06-05']] },
  { id: 'lead_13', name: 'Nadia Khan', company: 'Beacon Financial', title: 'VP Finance', owner: 'priya', status: 'qualified', created: '2026-03-08', last: '2026-06-23', acts: [['email_reply', '2026-06-19'], ['demo_booked', '2026-06-23']] },
  { id: 'lead_14', name: 'Eli Tanaka', company: 'Drift Mobility', title: 'Product Lead', owner: 'sam', status: 'new', created: '2026-06-21', last: '2026-06-21', acts: [['pricing_visit', '2026-06-21']] },
  { id: 'lead_15', name: 'Rosa Mendez', company: 'Willow Hospitality', title: 'GM', owner: 'priya', status: 'working', created: '2026-05-14', last: '2026-06-11' },
  { id: 'lead_16', name: 'Felix Bauer', company: 'Cobalt Industries', title: 'Head of IT', owner: 'sam', status: 'working', created: '2026-04-09', last: '2026-06-16', acts: [['email_open', '2026-06-13'], ['email_reply', '2026-06-16']] },
  { id: 'lead_17', name: 'Grace Liu', company: 'Summit Education', title: 'Director', owner: 'priya', status: 'new', created: '2026-06-18', last: '2026-06-18' },
  { id: 'lead_18', name: 'Diego Romero', company: 'Tidal Logistics', title: 'Ops Manager', owner: 'sam', status: 'working', created: '2026-03-19', last: '2026-06-02' },
  { id: 'lead_19', name: 'Hannah Wells', company: 'Northstar Insurance', title: 'Claims Lead', owner: 'priya', status: 'qualified', created: '2026-02-25', last: '2026-06-22', acts: [['email_reply', '2026-06-17'], ['pricing_visit', '2026-06-22']] },
  { id: 'lead_20', name: 'Ravi Iyer', company: 'Pivot Labs', title: 'Founder', owner: 'sam', status: 'new', created: '2026-06-22', last: '2026-06-23', acts: [['email_reply', '2026-06-23']] },
  { id: 'lead_21', name: 'Clara Boyd', company: 'Granite Legal', title: 'Partner', owner: 'priya', status: 'working', created: '2026-05-09', last: '2026-06-07' },
  { id: 'lead_22', name: 'Sean Doyle', company: 'Vertex Telecom', title: 'Network Lead', owner: 'sam', status: 'working', created: '2026-04-14', last: '2026-06-19', acts: [['email_open', '2026-06-19']] },
  { id: 'lead_23', name: 'Amara Diallo', company: 'Fern & Oak', title: 'Owner', owner: 'priya', status: 'new', created: '2026-06-15', last: '2026-06-15' },
  { id: 'lead_24', name: 'Victor Hale', company: 'Apex Construction', title: 'Project Director', owner: 'sam', status: 'qualified', created: '2026-03-02', last: '2026-06-21', acts: [['demo_booked', '2026-06-12'], ['email_reply', '2026-06-21']] },
  { id: 'lead_25', name: 'Iris Chen', company: 'Lattice HR', title: 'People Ops', owner: 'priya', status: 'working', created: '2026-05-26', last: '2026-06-13' },
  { id: 'lead_26', name: 'Noah Schmidt', company: 'Bluepeak Travel', title: 'CEO', owner: 'sam', status: 'new', created: '2026-06-17', last: '2026-06-17', acts: [['email_open', '2026-06-17']] },
  { id: 'lead_27', name: 'Tara Singh', company: 'Orchard Media', title: 'VP Marketing', owner: 'priya', status: 'working', created: '2026-04-22', last: '2026-06-14', acts: [['email_reply', '2026-06-14']] },
  { id: 'lead_28', name: 'Leo Costa', company: 'Sable Security', title: 'CISO', owner: 'sam', status: 'qualified', created: '2026-02-17', last: '2026-06-23', acts: [['pricing_visit', '2026-06-20'], ['demo_booked', '2026-06-23']] },
]

export function buildSeed(): { leads: Lead[]; activities: Activity[] } {
  const leads: Lead[] = []
  const activities: Activity[] = []
  let seq = 0
  for (const s of SEED) {
    leads.push({
      id: s.id,
      name: s.name,
      company: s.company,
      title: s.title,
      email: email(s.name, s.company),
      owner: s.owner,
      status: s.status,
      createdAt: ISO(s.created),
      lastActivityAt: ISO(s.last),
    })
    for (const [kind, day] of s.acts ?? []) {
      seq += 1
      activities.push({ id: `seed_act_${seq}`, leadId: s.id, kind, at: ISO(day) })
    }
  }
  return { leads, activities }
}

/** The repo the running app boots from. */
export function seededRepo(): InMemoryLeadRepo {
  return new InMemoryLeadRepo(buildSeed())
}
