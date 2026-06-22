'use client'
import Navbar from './navbar'
import CustomCursor from './custom-cursor'
import SiteFooter from './site-footer'

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main
        className="page-shell-main"
        style={{
          background: '#ffffff',
          minHeight: '100vh',
          paddingTop: 88,
        }}
      >
        {children}
      </main>
      <SiteFooter />
      <style>{`
        @media (max-width: 768px) {
          .page-shell-main {
            padding-top: 76px !important;
          }
        }
      `}</style>
    </>
  )
}
