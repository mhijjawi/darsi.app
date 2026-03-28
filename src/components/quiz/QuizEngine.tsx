'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Question } from '@/types'
import QuestionCard from './QuestionCard'
import ResultScreen from './ResultScreen'
import LegoCharacter from '@/components/characters/LegoCharacter'

interface QuizEngineProps {
  questions: Question[]
  onComplete: (score: number) => void
  onReview?: () => void
}

interface ResultEntry {
  correct: boolean
  correctAns: string
  num: number
}

export default function QuizEngine({ questions, onComplete, onReview }: QuizEngineProps) {
  const router = useRouter()
  const total = questions.length

  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [stars, setStars] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [results, setResults] = useState<ResultEntry[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleNext = useCallback(() => {
    if (currentQ + 1 < total) {
      setCurrentQ((prev) => prev + 1)
      setAnswered(false)
      setSelectedIdx(null)
    } else {
      setShowResult(true)
      onComplete(score)
    }
  }, [currentQ, total, score, onComplete])

  useEffect(() => {
    const listener = () => handleNext()
    window.addEventListener('quiz-next', listener)
    return () => window.removeEventListener('quiz-next', listener)
  }, [handleNext])

  function handleAnswer(idx: number) {
    if (answered) return
    setAnswered(true)
    setSelectedIdx(idx)

    const question = questions[currentQ]
    const isCorrect = idx === question.ans

    if (isCorrect) {
      setScore((prev) => prev + 1)
      setStars((prev) => prev + 1)
    }

    setResults((prev) => [
      ...prev,
      {
        correct: isCorrect,
        correctAns: question.opts[question.ans],
        num: currentQ + 1,
      },
    ])
  }

  function handleRetry() {
    setCurrentQ(0)
    setScore(0)
    setStars(0)
    setAnswered(false)
    setSelectedIdx(null)
    setResults([])
    setShowResult(false)
  }

  const pct = total > 0 ? Math.round(((currentQ + (answered ? 1 : 0)) / total) * 100) : 0

  return (
    <div>
      {/* Quiz header */}
      <div className="bg-gradient-to-r from-green to-teal rounded-[16px] p-6 mb-6 text-white relative overflow-hidden">
        <div className="absolute bottom-2 right-4 opacity-90">
          <LegoCharacter variant="ninja" size="lg" />
        </div>
        <h2 className="text-2xl font-extrabold font-display mb-1">
          🧪 Quiz Time!
        </h2>
        <p className="text-green-100 font-body text-sm opacity-90">
          {total} questions to test what you learned — you got this!
        </p>
      </div>

      {!showResult && (
        <>
          {/* Stats row */}
          <div className="flex gap-3 mb-5 flex-wrap">
            <div className="flex items-center gap-2 bg-yellow-dim border border-yellow/30 rounded-full px-4 py-2">
              <span className="text-lg">⭐</span>
              <span className="font-display font-bold text-yellow text-sm">
                {stars} Stars
              </span>
            </div>
            <div className="flex items-center gap-2 bg-green-dim border border-green/30 rounded-full px-4 py-2">
              <span className="text-lg">✅</span>
              <span className="font-display font-bold text-green text-sm">
                {score} Correct
              </span>
            </div>
            <div className="flex items-center gap-2 bg-blue-dim border border-blue/30 rounded-full px-4 py-2">
              <span className="text-lg">📝</span>
              <span className="font-display font-bold text-blue text-sm">
                Question {currentQ + 1}/{total}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-1">
            <div className="bg-card2 h-2 rounded-[20px] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green to-teal rounded-[20px] transition-all duration-500 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Progress info */}
          <div className="flex justify-between text-xs text-text-dim font-body mb-5">
            <span>
              Question {currentQ + 1} of {total}
            </span>
            <span>{pct}%</span>
          </div>

          {/* Question card */}
          <QuestionCard
            key={currentQ}
            question={questions[currentQ]}
            questionNum={currentQ + 1}
            answered={answered}
            selectedIdx={selectedIdx}
            onSelect={handleAnswer}
          />
        </>
      )}

      {showResult && (
        <ResultScreen
          score={score}
          total={total}
          results={results}
          onRetry={handleRetry}
          onReview={onReview ?? (() => router.push('/science/chapter-4-2/learn/'))}
        />
      )}
    </div>
  )
}
