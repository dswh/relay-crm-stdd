import type { ActivityKind, LeadStatus } from '../domain/types'

export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime()
  const days = Math.round((Date.now() - then) / 86_400_000)
  if (days <= 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days}d ago`
  const months = Math.round(days / 30)
  return months === 1 ? '1mo ago' : `${months}mo ago`
}

export const activityLabel: Record<ActivityKind, string> = {
  email_reply: 'Replied to email',
  email_open: 'Opened email',
  demo_booked: 'Booked a demo',
  pricing_visit: 'Visited pricing page',
  call_logged: 'Logged a call',
}

export const statusLabel: Record<LeadStatus, string> = {
  new: 'New',
  working: 'Working',
  qualified: 'Qualified',
}

export function initials(name: string): string {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
