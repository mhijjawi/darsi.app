'use client'

import LegoCharacter from '@/components/characters/LegoCharacter'

interface ResultScreenProps {
  score: number
  total: number
  results: { correct: boolean; correctAns: string; num: number }[]
  onRetry: () => void
  onReview: () => void
}

function getTrophy(score: number) {
  if (score === 10) return '🏆'
  if (score >= 8) return '🥇'
  if (score >= 6) return '🥈'
  return '📚'
}

function getTitle(score: number) {
  if (score === 10) return 'Perfect Score!'
  if (score >= 8) return 'Excellent!'
  if (score >= 6) return 'Great Job!'
  return 'Keep Practicing!'
}

function getStarCount(score: number) {
  if (score === 10) return 5
  if (score >= 8) return 4
  if (score >= 6) return 3
  return 2
}

function getMessage(score: number) {
  if (score === 10)
    return 'You answered every single question correctly! You are a science superstar! 🌟'
  if (score >= 8)
    return 'Amazing work! You really know your stuff. Just a tiny bit more practice and you will be perfect!'
  if (score >= 6)
    return 'Good effort! You understand a lot already. Review the ones you missed and try again!'
  return 'No worries! Every scientist learns by trying. Review your notes and give it another go!'
}

export default function ResultScreen({
  score,
  total,
  results,
  onRetry,
  onReview,
}: ResultScreenProps) {
  const starCount = getStarCount(score)

  return (
    <div className="text-center animate-fadeUp">
      {/* Character celebration */}
      <div className="flex items-end justify-center gap-3 mb-3">
        <LegoCharacter variant="explorer" size="md" />
        <div className="text-[5rem] animate-bounce">{getTrophy(score)}</div>
        <LegoCharacter variant="galaxy" size="md" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-extrabold font-display text-text mb-1">
        {getTitle(score)}
      </h2>

      {/* Score */}
      <div className="text-[4rem] font-display font-extrabold text-green leading-none my-4">
        {score}/{total}
      </div>

      {/* Stars */}
      <div className="text-[2.5rem] tracking-[8px] mb-3">
        {'⭐'.repeat(starCount)}
      </div>

      {/* Message */}
      <p className="text-text-dim font-body text-base max-w-md mx-auto mb-6 leading-relaxed">
        {getMessage(score)}
      </p>

      {/* Review grid */}
      <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto mb-8">
        {results.map((r) => (
          <div
            key={r.num}
            className={`rounded-[10px] py-2 px-1 text-center text-sm font-bold font-display ${
              r.correct
                ? 'bg-green-dim text-green'
                : 'bg-red-50 text-red-500'
            }`}
          >
            <div className="text-lg">{r.correct ? '✅' : '❌'}</div>
            <div>Q{r.num}</div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={onRetry}
          className="px-8 py-3 rounded-[12px] bg-gradient-to-r from-coral to-orange-500 text-white font-bold font-display text-base cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          🔄 Try Again
        </button>
        <button
          onClick={onReview}
          className="px-8 py-3 rounded-[12px] bg-gradient-to-r from-blue to-indigo-500 text-white font-bold font-display text-base cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          📖 Review Notes
        </button>
      </div>
    </div>
  )
}
