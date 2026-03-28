'use client'

import { useState, useRef } from 'react'
import { WorksheetData } from '@/types'
import { CharacterBubble } from '@/components/characters/LegoCharacter'

interface WorksheetViewProps {
  worksheet: WorksheetData
  chapterTitle: string
}

export default function WorksheetView({ worksheet, chapterTitle }: WorksheetViewProps) {
  const [showAnswers, setShowAnswers] = useState(false)
  const worksheetRef = useRef<HTMLDivElement>(null)

  function printWorksheet() {
    const ws = worksheet
    const tp = totalPoints
    const win = window.open('', '_blank')
    if (!win) return

    win.document.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${chapterTitle} — Worksheet</title>
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Nunito', sans-serif; color: #212121; max-width: 750px; margin: 0 auto; padding: 0; }
  .ws-header { background: #1A237E; padding: 22px 28px; display: flex; justify-content: space-between; align-items: center; }
  .ws-header h3 { font-family: 'Baloo 2', cursive; font-size: 1.3rem; color: white; margin: 0; }
  .ws-header span { font-size: 0.8rem; color: #FFD54F; font-weight: 800; }
  .ws-name-row { display: flex; gap: 20px; padding: 14px 28px; background: #F5F5F5; border-bottom: 2px solid #E0E0E0; font-size: 0.9rem; font-weight: 700; color: #37474F; }
  .ws-name-row span { border-bottom: 2px solid #90A4AE; padding-bottom: 2px; flex: 1; }
  .ws-part { padding: 20px 28px; border-bottom: 1px solid #EEEEEE; }
  .ws-part-title { font-weight: 900; font-size: 0.9rem; color: #1A237E; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 14px; padding: 6px 12px; background: #E3F2FD; border-radius: 6px; display: inline-block; }
  .ws-q { font-size: 0.88rem; font-weight: 700; color: #37474F; margin-bottom: 8px; line-height: 1.5; padding: 6px 0; border-bottom: 1px dotted #E0E0E0; }
  .ws-q:last-child { border-bottom: none; }
  .ws-blank { display: inline-block; width: 100px; border-bottom: 2px solid #90A4AE; margin: 0 4px; }
  .ws-tf { color: #1976D2; font-weight: 900; }
  .word-bank { background: #FFF8E1; border-radius: 8px; padding: 10px 14px; margin-bottom: 12px; font-size: 0.82rem; font-weight: 800; color: #E65100; }
  .obj-bank { background: #E3F2FD; border-radius: 8px; padding: 10px 14px; margin-bottom: 12px; font-size: 0.82rem; font-weight: 800; color: #01579B; }
  .classify-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
  .classify-box { border-radius: 8px; padding: 10px; min-height: 80px; }
  .classify-box h5 { font-weight: 900; font-size: 0.8rem; margin-bottom: 6px; text-align: center; }
  .classify-line { font-size: 0.8rem; color: #90A4AE; margin-top: 8px; }
  .answer-line { border-bottom: 1px solid #E0E0E0; margin-top: 16px; }
  .ws-footer { background: #FFF8E1; padding: 12px 28px; font-size: 0.82rem; font-weight: 800; color: #E65100; text-align: center; }
  @media print {
    body { padding: 0; margin: 0; }
    .ws-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .ws-part-title { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .word-bank, .obj-bank, .ws-footer { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .classify-box { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body onload="window.print()">
  <div style="background:white; overflow:hidden; box-shadow:none;">
    <div class="ws-header">
      <h3>${chapterTitle}</h3>
      <span>Grade 3 Science</span>
    </div>
    <div class="ws-name-row">
      <span>Name: _____________________________</span>
      <span>Date: ______________</span>
      <span>Score: _____ / ${tp}</span>
    </div>
    <div class="ws-part">
      <div class="ws-part-title">Part 1 — Fill in the Blanks (${ws.fillBlanks.length} pts)</div>
      <div class="word-bank">Word Bank: &nbsp; ${ws.wordBank.join(' &nbsp;|&nbsp; ')}</div>
      ${ws.fillBlanks.map(fb => `<div class="ws-q">${fb.num}. ${fb.before} <span class="ws-blank">&nbsp;</span> ${fb.after}</div>`).join('')}
    </div>
    <div class="ws-part">
      <div class="ws-part-title">Part 2 — Classify the Objects (${ws.classify.objects.length} pts)</div>
      <div class="obj-bank">Objects: &nbsp; ${ws.classify.objects.join(' &nbsp;|&nbsp; ')}</div>
      <div class="classify-grid">
        ${ws.classify.categories.map(cat => `
          <div class="classify-box" style="border:2px solid ${cat.borderColor}">
            <h5 style="color:${cat.titleColor}">${cat.title}</h5>
            ${Array.from({length: cat.count}).map((_, j) => `<div class="classify-line">${j+1}. ________________</div>`).join('')}
          </div>
        `).join('')}
      </div>
    </div>
    <div class="ws-part">
      <div class="ws-part-title">Part 3 — True or False (${ws.trueOrFalse.length} pts)</div>
      ${ws.trueOrFalse.map(tf => `<div class="ws-q">${tf.num}. ${tf.statement} &nbsp; <span class="ws-tf">True / False</span></div>`).join('')}
    </div>
    <div class="ws-part">
      <div class="ws-part-title">Part 4 — Short Answer (${ws.shortAnswer.reduce((s: number, q: {points: number}) => s + q.points, 0)} pts)</div>
      ${ws.shortAnswer.map(sa => `
        <div class="ws-q" style="border-bottom:none">${sa.num}. ${sa.question} (${sa.points} ${sa.points === 1 ? 'pt' : 'pts'})<br>
          ${Array.from({length: sa.lines}).map(() => '<div class="answer-line"></div>').join('')}
        </div>
      `).join('')}
    </div>
    <div class="ws-footer">⭐ Keep going Laith — you are doing amazing! Science Superstar! 🚀</div>
  </div>
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
      {/* Character tip */}
      <CharacterBubble
        variant="coral"
        message="Time to grab a pencil! Print this worksheet and show what you've learned, Laith!"
        side="left"
        className="mb-4"
      />

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
