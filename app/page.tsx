'use client'
import Navbar from '@/components/ui/navbar'
import CustomCursor from '@/components/ui/custom-cursor'
import { AiUciHero } from '@/components/ui/ai-uci-hero'
import AboutSection from '@/components/sections/about'
import TeamSection from '@/components/sections/team'

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <AiUciHero />
      <main>
        <AboutSection />
        <TeamSection />
      </main>
    </>
  )
}
