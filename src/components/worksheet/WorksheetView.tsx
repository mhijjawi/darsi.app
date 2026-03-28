'use client'

import { useState, useRef } from 'react'
import { WorksheetData } from '@/types'

interface WorksheetViewProps {
  worksheet: WorksheetData
  chapterTitle: string
}

export default function WorksheetView({ worksheet, chapterTitle }: WorksheetViewProps) {
  const [showAnswers, setShowAnswers] = useState(false)
  const worksheetRef = useRef<HTMLDivElement>(null)

  function printWorksheet() {
    const el = worksheetRef.current
    if (!el) return

    const html = el.outerHTML
    const win = window.open('', '_blank')
    if (!win) return

    win.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${chapterTitle} — Worksheet</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Nunito', sans-serif; color: #1E293B; padding: 0; }
    @media print {
      body { padding: 0; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body onload="window.print()">
  ${html}
</body>
</html>`)
    win.document.close()
  }

  const totalPoints =
    worksheet.fillBlanks.length +
    worksheet.classify.objects.length +
    worksheet.trueOrFalse.length +
    worksheet.shortAnswer.reduce((sum, q) => sum + q.points, 0)

  return (
    <div>
      {/* Header Card */}
      <div className="bg-white border border-[--border] rounded-2xl p-6 mb-6 text-center">
        <div className="text-[3rem] mb-2">🖨️</div>
        <h2
          className="font-[family-name:var(--font-display)] text-[1.8rem] font-bold mb-2"
          style={{ color: '#EA580C' }}
        >
          Printable Worksheet
        </h2>
        <p className="text-[--text-dim] mb-5 max-w-md mx-auto">
          Print this worksheet and complete it with a pencil. Great for extra practice or homework!
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={printWorksheet}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-base shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #EA580C, #F97316)' }}
          >
            🖨️ Print Worksheet
          </button>
          <button
            onClick={() => {
              /* scroll up or navigate — parent can handle */
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base border border-[--border] bg-[--card2] text-[--text] hover:bg-gray-100 transition-all active:scale-95 cursor-pointer"
          >
            📖 Review Notes First
          </button>
        </div>
      </div>

      {/* Worksheet Preview */}
      <div
        ref={worksheetRef}
        className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
      >
        {/* Dark header bar */}
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{ background: '#1A237E' }}
        >
          <h3 className="text-white font-[family-name:var(--font-display)] font-bold text-lg">
            {chapterTitle}
          </h3>
          <span className="font-bold text-sm" style={{ color: '#FFD54F' }}>
            Grade 3 Science
          </span>
        </div>

        <div className="p-6">
          {/* Name / Date / Score row */}
          <div className="grid grid-cols-3 gap-4 mb-6 text-sm font-semibold text-[--text]">
            <div>
              Name: <span className="inline-block w-full border-b border-gray-400 min-w-[100px]">&nbsp;</span>
            </div>
            <div>
              Date: <span className="inline-block w-full border-b border-gray-400 min-w-[100px]">&nbsp;</span>
            </div>
            <div>
              Score: <span className="inline-block border-b border-gray-400 min-w-[40px]">&nbsp;</span> / {totalPoints}
            </div>
          </div>

          {/* Part 1 — Fill in the Blanks */}
          <section className="mb-8">
            <h4 className="font-[family-name:var(--font-display)] font-bold text-base mb-3" style={{ color: '#1A237E' }}>
              Part 1 — Fill in the Blanks ({worksheet.fillBlanks.length} pts)
            </h4>

            {/* Word Bank */}
            <div className="rounded-xl p-3 mb-4" style={{ background: '#FFF8E1' }}>
              <span className="font-bold text-sm text-[--text-dim] mr-2">Word Bank:</span>
              {worksheet.wordBank.map((word, i) => (
                <span key={i} className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-[--text] mr-2 mb-1 border border-yellow-200">
                  {word}
                </span>
              ))}
            </div>

            <ol className="space-y-3 pl-1">
              {worksheet.fillBlanks.map((fb) => (
                <li key={fb.num} className="text-[--text] text-sm leading-relaxed">
                  <span className="font-bold mr-1">{fb.num}.</span>
                  {fb.before}
                  <span className="inline-block border-b-2 border-gray-400 min-w-[120px] mx-1 align-bottom">&nbsp;</span>
                  {fb.after}
                </li>
              ))}
            </ol>
          </section>

          {/* Part 2 — Classify the Objects */}
          <section className="mb-8">
            <h4 className="font-[family-name:var(--font-display)] font-bold text-base mb-3" style={{ color: '#1A237E' }}>
              Part 2 — Classify the Objects ({worksheet.classify.objects.length} pts)
            </h4>

            {/* Object List */}
            <div className="rounded-xl p-3 mb-4" style={{ background: '#E3F2FD' }}>
              <span className="font-bold text-sm text-[--text-dim] mr-2">Objects:</span>
              {worksheet.classify.objects.map((obj, i) => (
                <span key={i} className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-[--text] mr-2 mb-1 border border-blue-200">
                  {obj}
                </span>
              ))}
            </div>

            {/* Category Boxes Grid */}
            <div className="grid grid-cols-3 gap-4">
              {worksheet.classify.categories.map((cat, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 border-2"
                  style={{ borderColor: cat.borderColor }}
                >
                  <h5
                    className="font-[family-name:var(--font-display)] font-bold text-center text-sm mb-3"
                    style={{ color: cat.titleColor }}
                  >
                    {cat.title}
                  </h5>
                  <div className="space-y-3">
                    {Array.from({ length: cat.count }).map((_, j) => (
                      <div key={j} className="border-b border-gray-300 pb-1 min-h-[24px]">&nbsp;</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Part 3 — True or False */}
          <section className="mb-8">
            <h4 className="font-[family-name:var(--font-display)] font-bold text-base mb-3" style={{ color: '#1A237E' }}>
              Part 3 — True or False ({worksheet.trueOrFalse.length} pts)
            </h4>

            <ol className="space-y-3 pl-1">
              {worksheet.trueOrFalse.map((tf) => (
                <li key={tf.num} className="text-[--text] text-sm leading-relaxed flex items-start gap-2">
                  <span className="font-bold shrink-0">{tf.num}.</span>
                  <span className="flex-1">{tf.statement}</span>
                  <span className="font-bold shrink-0" style={{ color: '#2563EB' }}>
                    True / False
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {/* Part 4 — Short Answer */}
          <section className="mb-8">
            <h4 className="font-[family-name:var(--font-display)] font-bold text-base mb-3" style={{ color: '#1A237E' }}>
              Part 4 — Short Answer ({worksheet.shortAnswer.reduce((s, q) => s + q.points, 0)} pts)
            </h4>

            <ol className="space-y-5 pl-1">
              {worksheet.shortAnswer.map((sa) => (
                <li key={sa.num} className="text-[--text] text-sm">
                  <div className="font-bold mb-2">
                    {sa.num}. {sa.question} ({sa.points} {sa.points === 1 ? 'pt' : 'pts'})
                  </div>
                  <div className="space-y-3">
                    {Array.from({ length: sa.lines }).map((_, j) => (
                      <div key={j} className="border-b border-gray-300 min-h-[24px]">&nbsp;</div>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Footer */}
          <div className="rounded-xl p-4 text-center text-sm font-semibold" style={{ background: '#FFF8E1', color: '#D97706' }}>
            ⭐ You are doing an amazing job, Laith! Keep learning and shining bright! ⭐
          </div>
        </div>
      </div>

      {/* Answer Key Section */}
      <div className="bg-white border border-[--border] rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowAnswers((v) => !v)}
          className="w-full px-6 py-4 text-left font-[family-name:var(--font-display)] font-bold text-base text-[--text-dim] hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer"
        >
          <span>🔑 {showAnswers ? 'Hide' : 'Show'} Answer Key (for parents)</span>
          <span className="text-xl transition-transform" style={{ transform: showAnswers ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ▼
          </span>
        </button>

        {showAnswers && (
          <div className="px-6 pb-6 border-t border-[--border] pt-4 space-y-5">
            {/* Fill in the Blanks answers */}
            <div>
              <h5 className="font-[family-name:var(--font-display)] font-bold text-sm mb-2" style={{ color: '#1A237E' }}>
                Part 1 — Fill in the Blanks
              </h5>
              <ol className="list-decimal list-inside space-y-1 text-sm text-[--text]">
                {worksheet.answerKey.fillBlanks.map((ans, i) => (
                  <li key={i}>
                    <span className="font-semibold text-green-600">{ans}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Classify answers */}
            <div>
              <h5 className="font-[family-name:var(--font-display)] font-bold text-sm mb-2" style={{ color: '#1A237E' }}>
                Part 2 — Classify the Objects
              </h5>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(worksheet.answerKey.classify).map(([category, items]) => (
                  <div key={category}>
                    <div className="font-bold text-xs text-[--text-dim] uppercase tracking-wider mb-1">
                      {category}
                    </div>
                    <ul className="text-sm text-green-600 font-semibold space-y-0.5">
                      {items.map((item, j) => (
                        <li key={j}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* True or False answers */}
            <div>
              <h5 className="font-[family-name:var(--font-display)] font-bold text-sm mb-2" style={{ color: '#1A237E' }}>
                Part 3 — True or False
              </h5>
              <ol className="list-decimal list-inside space-y-1 text-sm text-[--text]">
                {worksheet.answerKey.trueOrFalse.map((ans, i) => (
                  <li key={i}>
                    <span className="font-semibold text-green-600">{ans ? 'True' : 'False'}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Short Answer answers */}
            <div>
              <h5 className="font-[family-name:var(--font-display)] font-bold text-sm mb-2" style={{ color: '#1A237E' }}>
                Part 4 — Short Answer
              </h5>
              <ol className="list-decimal list-inside space-y-2 text-sm text-[--text]">
                {worksheet.answerKey.shortAnswer.map((ans, i) => (
                  <li key={i}>
                    <span className="font-semibold text-green-600">{ans}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
