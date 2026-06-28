import type { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-[900px] flex-col bg-[#0F172A]">
      {children}
    </div>
  )
}
