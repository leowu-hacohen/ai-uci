'use client'
import PageShell from '@/components/ui/page-shell'
import PageHeader from '@/components/ui/page-header'
import ProjectsPageContent from '@/components/sections/projects-page-content'

export default function ProjectsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Projects"
        title="Real builds with real timelines."
        body="CACTUS, Winter Quarter Project, and AWS CloudHacks. The kind of work you can walk someone through start to finish."
      />
      <ProjectsPageContent />
    </PageShell>
  )
}
