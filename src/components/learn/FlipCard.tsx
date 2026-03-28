'use client'

import { useState } from 'react'
import { Flashcard } from '@/types'

interface FlipCardProps {
  flashcard: Flashcard
}

export default function FlipCard({ flashcard }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`flip-card h-[140px] cursor-pointer ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flip-inner relative w-full h-full">
        {/* Front */}
        <div
          className="flip-front absolute inset-0 rounded-xl p-3 flex flex-col items-center justify-center text-center"
          style={{
            background: flashcard.bgFront,
            border: `2px solid ${flashcard.borderFront}`,
          }}
        >
          <div className="text-[2.4rem] leading-none mb-1">{flashcard.emoji}</div>
          <div
            className="font-[family-name:var(--font-display)] text-[1.2rem] font-bold"
            style={{ color: flashcard.color }}
          >
            {flashcard.word}
          </div>
          <div className="text-[10px] text-[--text-dimmer] mt-1">tap to flip!</div>
        </div>

        {/* Back */}
        <div
          className="flip-back absolute inset-0 rounded-xl p-3 flex flex-col items-center justify-center text-center"
          style={{
            background: flashcard.bgBack,
            border: `2px solid ${flashcard.borderBack}`,
          }}
        >
          <div
            className="text-sm leading-snug mb-2 [&>strong]:font-bold"
            dangerouslySetInnerHTML={{ __html: flashcard.definition }}
          />
          <div className="text-xs text-[--text-dim] italic">{flashcard.example}</div>
        </div>
      </div>
    </div>
  )
}
