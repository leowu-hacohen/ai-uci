'use client'
import PageShell from '@/components/ui/page-shell'
import PageHeader from '@/components/ui/page-header'
import AboutPageContent from '@/components/sections/about-page-content'

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About"
        title="Who we are."
        body="Builders, researchers, and curious minds learning AI by doing at UC Irvine."
      />
      <AboutPageContent />
    </PageShell>
  )
}
