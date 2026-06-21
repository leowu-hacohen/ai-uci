'use client'
import PageShell from '@/components/ui/page-shell'
import PageHeader from '@/components/ui/page-header'
import EventsPageContent from '@/components/sections/events-page-content'

export default function EventsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Events"
        title="Workshops, speakers, and everything we run."
        body="Weekly meetings, hands-on workshops, and the events that fill the room."
      />
      <EventsPageContent />
    </PageShell>
  )
}
