'use client'
import Navbar from '@/components/ui/navbar'
import CustomCursor from '@/components/ui/custom-cursor'
import SiteFooter from '@/components/ui/site-footer'
import { AiUciHero } from '@/components/ui/ai-uci-hero'
import AboutSection from '@/components/sections/about'
import ScheduleSection from '@/components/sections/schedule'

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <AiUciHero />
      <main>
        <AboutSection />
        <ScheduleSection />
      </main>
      <SiteFooter />
    </>
  )
}
