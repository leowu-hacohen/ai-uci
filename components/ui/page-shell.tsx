'use client'
import Navbar from './navbar'
import CustomCursor from './custom-cursor'

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main
        style={{
          background: '#ffffff',
          minHeight: '100vh',
          paddingTop: 88,
        }}
      >
        {children}
      </main>
    </>
  )
}
