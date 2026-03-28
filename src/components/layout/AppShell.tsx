'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { useAuth } from '@/hooks/useAuth'

const BREADCRUMBS: Record<string, string> = {
  '/science/chapter-4-2/learn': 'Chapter 4.2 › <strong>Learn & Study Guide</strong>',
  '/science/chapter-4-2/quiz': 'Chapter 4.2 › <strong>Quiz Time</strong>',
  '/science/chapter-4-2/worksheet': 'Chapter 4.2 › <strong>Printable Worksheet</strong>',
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stars, setStars] = useState(0)
  const { isUnlocked, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !isUnlocked) {
      router.replace('/darsi.app/')
    }
  }, [isUnlocked, isLoading, router])

  useEffect(() => {
    const stored = sessionStorage.getItem('darsi_stars')
    if (stored) setStars(parseInt(stored, 10))

    const handleStarsUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail
      setStars(typeof detail === 'number' ? detail : 0)
    }
    window.addEventListener('darsi-stars-update', handleStarsUpdate)
    return () => window.removeEventListener('darsi-stars-update', handleStarsUpdate)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-bg">
        <div className="text-4xl animate-bounce">🚀</div>
      </div>
    )
  }

  if (!isUnlocked) return null

  // Derive breadcrumb from pathname
  const pathSuffix = pathname?.replace('/darsi.app', '') || ''
  const breadcrumb = BREADCRUMBS[pathSuffix] || ''

  return (
    <div className="flex h-screen w-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Topbar
          breadcrumb={breadcrumb}
          stars={stars}
          onMenuToggle={() => setSidebarOpen((o) => !o)}
        />
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-7 md:p-8 scroll-smooth custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  )
}
