'use client'

import { useCallback } from 'react'
import QuizEngine from './QuizEngine'
import chapter42 from '@/data/science/chapter-4-2'

export default function QuizContent() {
  const handleComplete = useCallback((score: number) => {
    const key = 'darsi_stars_chapter-4-2'
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
  }, [])

  return (
    <div className="animate-fadeUp">
      <QuizEngine questions={chapter42.quiz} onComplete={handleComplete} />
    </div>
  )
}
