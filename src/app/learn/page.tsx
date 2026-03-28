'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getFirstChapterPath } from '@/lib/chapters'

export default function LearnRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace(`/darsi.app${getFirstChapterPath()}/`)
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen bg-bg">
      <div className="text-4xl animate-bounce">🚀</div>
    </div>
  )
}
