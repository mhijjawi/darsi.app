'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import QuizEngine from './QuizEngine'
import chapter42 from '@/data/science/chapter-4-2'
import chapter43 from '@/data/science/chapter-4-3'

const CHAPTERS: Record<string, typeof chapter42> = {
  'chapter-4-2': chapter42,
  'chapter-4-3': chapter43,
}

export default function QuizContent({ chapterSlug }: { chapterSlug: string }) {
  const router = useRouter()
  const data = CHAPTERS[chapterSlug] ?? chapter42

  const handleComplete = useCallback((score: number) => {
    const key = `darsi_stars_${chapterSlug}`
    sessionStorage.setItem(key, String(score))
    let total = 0
    for (let i = 0; i < sessionStorage.length; i++) {
      const k = sessionStorage.key(i)
      if (k?.startsWith('darsi_stars_')) {
        total = Math.max(total, parseInt(sessionStorage.getItem(k) || '0', 10))
      }
    }
    sessionStorage.setItem('darsi_stars', String(total))
    window.dispatchEvent(new CustomEvent('darsi-stars-update', { detail: total }))
  }, [chapterSlug])

  return (
    <div className="animate-fadeUp">
      <QuizEngine
        questions={data.quiz}
        onComplete={handleComplete}
        onReview={() => router.push(`/science/${chapterSlug}/learn/`)}
      />
    </div>
  )
}
