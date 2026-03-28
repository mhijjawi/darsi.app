'use client'

import { Question } from '@/types'

interface QuestionCardProps {
  question: Question
  questionNum: number
  answered: boolean
  selectedIdx: number | null
  onSelect: (idx: number) => void
}

const LETTERS = ['A', 'B', 'C', 'D']

export default function QuestionCard({
  question,
  questionNum,
  answered,
  selectedIdx,
  onSelect,
}: QuestionCardProps) {
  const isCorrect = selectedIdx === question.ans

  function optionClasses(idx: number) {
    const base =
      'flex items-center gap-3 w-full px-4 py-3 rounded-[12px] border-2 text-left transition-all duration-200 font-body text-[0.95rem] font-semibold'

    if (!answered) {
      return `${base} bg-card2 border-border hover:border-blue hover:bg-blue-dim hover:translate-x-[4px] cursor-pointer`
    }

    if (idx === question.ans) {
      return `${base} bg-green-dim border-green`
    }

    if (idx === selectedIdx && idx !== question.ans) {
      return `${base} bg-red-100 border-red-500 opacity-75`
    }

    return `${base} bg-card2 border-border opacity-60`
  }

  function letterClasses(idx: number) {
    const base =
      'w-8 h-8 rounded-[8px] flex items-center justify-center text-sm font-bold font-display shrink-0'

    if (!answered) {
      return `${base} bg-border text-text-dim`
    }

    if (idx === question.ans) {
      return `${base} bg-green text-white`
    }

    if (idx === selectedIdx && idx !== question.ans) {
      return `${base} bg-red-500 text-white`
    }

    return `${base} bg-border text-text-dim`
  }

  return (
    <div className="bg-white border-2 border-border rounded-[16px] p-6 animate-fadeUp">
      {/* Badge */}
      <div className="inline-block bg-blue-dim text-blue text-xs font-bold font-display px-3 py-1 rounded-full mb-3">
        Question {questionNum}
      </div>

      {/* Emoji */}
      <div className="text-[2.2rem] mb-2">{question.emoji}</div>

      {/* Question text */}
      <p className="text-[1.05rem] font-extrabold text-text font-body mb-5 leading-relaxed">
        {question.q}
      </p>

      {/* Options */}
      <div className="flex flex-col gap-[10px] mb-4">
        {question.opts.map((opt, idx) => (
          <button
            key={idx}
            className={optionClasses(idx)}
            onClick={() => onSelect(idx)}
            disabled={answered}
          >
            <span className={letterClasses(idx)}>{LETTERS[idx]}</span>
            <span>{opt}</span>
          </button>
        ))}
      </div>

      {/* Feedback panel */}
      {answered && (
        <div
          className={`rounded-[12px] p-4 mb-4 animate-fadeUp ${
            isCorrect
              ? 'bg-green-dim border border-green'
              : 'bg-red-50 border border-red-400'
          }`}
        >
          <p className="font-bold font-body text-[0.95rem]">
            {isCorrect ? '🎉 Brilliant!' : '😊 Not this time!'}
          </p>
          <p className="text-text-dim text-sm mt-1 font-body">{question.fb}</p>
        </div>
      )}

      {/* Next button */}
      {answered && (
        <button
          onClick={() => {
            /* handled by parent via handleNext */
            const event = new CustomEvent('quiz-next')
            window.dispatchEvent(event)
          }}
          className="w-full py-3 rounded-[12px] bg-gradient-to-r from-green to-teal text-white font-bold font-display text-base cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Next Question →
        </button>
      )}
    </div>
  )
}
