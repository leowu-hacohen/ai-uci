'use client'
import Navbar from '@/components/ui/navbar'
import CustomCursor from '@/components/ui/custom-cursor'
import { AiUciHero } from '@/components/ui/ai-uci-hero'
import CommunitySection from '@/components/sections/community'
import ProjectsSection from '@/components/sections/projects'
import SpeakersSection from '@/components/sections/speakers'
import SponsorsSection from '@/components/sections/sponsors'
import TeamSection from '@/components/sections/team'

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <AiUciHero />
      <main>
        <CommunitySection />
        <ProjectsSection />
        <SpeakersSection />
        <SponsorsSection />
        <TeamSection />
      </main>
    </>
  )
}
