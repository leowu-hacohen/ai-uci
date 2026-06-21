'use client'
import PageShell from '@/components/ui/page-shell'
import PageHeader from '@/components/ui/page-header'
import JoinPageContent from '@/components/sections/join-page-content'

export default function JoinPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Join"
        title="Get involved."
        body="No application, no gatekeeping. Show up, build something, meet people who care about the same things."
      />
      <JoinPageContent />
    </PageShell>
  )
}
