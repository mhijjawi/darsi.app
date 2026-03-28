'use client'

import Link from 'next/link'
import chapter42 from '@/data/science/chapter-4-2'
import ConceptCard from './ConceptCard'
import FlipCard from './FlipCard'
import SummaryBox from './SummaryBox'

export default function LearnContent() {
  const data = chapter42

  return (
    <div className="animate-fadeUp">
      {/* Hero */}
      <div className="rounded-[16px] p-8 md:px-9 md:py-8 mb-8 relative overflow-hidden bg-gradient-to-br from-[#1D4ED8] via-blue to-[#3B82F6] border border-blue/20">
        <div className="absolute -top-[60px] -right-[60px] w-[200px] h-[200px] rounded-full bg-[rgba(88,166,255,0.08)]" />
        <div className="absolute -bottom-10 left-[30%] w-[140px] h-[140px] rounded-full bg-[rgba(88,166,255,0.05)]" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[rgba(88,166,255,0.15)] border border-[rgba(88,166,255,0.3)] rounded-[20px] px-3.5 py-1 text-[0.75rem] font-extrabold text-blue tracking-[0.5px] mb-3.5">
            📚 Chapter 4.2
          </div>
          <h1 className="font-display text-[2.4rem] font-extrabold text-white mb-2 leading-tight">
            {data.emoji} Light &amp; Matter
          </h1>
          <p className="text-base text-white/85 font-semibold max-w-[520px]">
            {data.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {data.objectives.map((obj, i) => (
              <span
                key={i}
                className="bg-white/20 border border-white/35 rounded-[20px] px-3.5 py-[5px] text-[0.78rem] font-bold text-white/95"
              >
                {obj}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Concept 1: How We See */}
      <SectionTitle emoji="👁️" title="How Do We See Objects?" />
      <ConceptCard concept={data.concepts[0]} />

      {/* Concept 2: Opaque */}
      <SectionTitle emoji="🪨" title="Opaque Objects & Shadows" />
      <ConceptCard concept={data.concepts[1]} />

      {/* Concept 3: Transparent */}
      <SectionTitle emoji="🪟" title="Transparent Objects" />
      <ConceptCard concept={data.concepts[2]} />

      {/* Concept 4: Translucent */}
      <SectionTitle emoji="🌫️" title="Translucent Objects" />
      <ConceptCard concept={data.concepts[3]} />

      {/* Quick Comparison */}
      {data.comparison && (
        <>
          <SectionTitle emoji="⚡" title="Quick Comparison" />
          <div className="bg-card border border-border rounded-[16px] overflow-hidden mb-6">
            <div className="grid grid-cols-3 border-b border-border">
              {data.comparison.columns.map((col, i) => (
                <div
                  key={i}
                  className={`p-3.5 text-center ${i < 2 ? 'border-r border-border' : ''}`}
                  style={{ background: col.bgColor }}
                >
                  <div className="text-2xl">{col.emoji}</div>
                  <div className="font-extrabold text-[0.9rem] mt-1" style={{ color: col.color }}>
                    {col.title}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3">
              {data.comparison.columns.map((col, i) => (
                <div
                  key={i}
                  className={`p-4 text-center ${i < 2 ? 'border-r border-border' : ''}`}
                >
                  <div className="text-[0.82rem] font-bold text-text-dim leading-relaxed">
                    {col.descriptions.map((d, j) => (
                      <span key={j}>
                        {d}
                        {j < col.descriptions.length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Flashcards */}
      <SectionTitle emoji="🃏" title="Tap the Cards to Memorize!" />
      <div className="grid grid-cols-2 max-[480px]:grid-cols-1 gap-3.5 mb-6">
        {data.flashcards.map((fc, i) => (
          <FlipCard key={i} flashcard={fc} />
        ))}
      </div>

      {/* Sun Safety */}
      <SectionTitle emoji="☀️" title="Staying Safe in Sunlight" />
      <ConceptCard concept={data.concepts[4]} />

      {/* Colors of Light */}
      <SectionTitle emoji="🌈" title="Colors of Light — Did You Know?" />
      <ConceptCard concept={data.concepts[5]} />

      {/* Summary */}
      <SummaryBox
        items={[
          { emoji: '👁️', text: 'We see objects because light bounces off them into our eyes' },
          { emoji: '🪨', text: '<strong>Opaque</strong> = blocks ALL light → shadow forms' },
          { emoji: '🪟', text: '<strong>Transparent</strong> = ALL light passes through → see clearly' },
          { emoji: '🌫️', text: '<strong>Translucent</strong> = SOME light passes → see blurry' },
          { emoji: '☀️', text: 'Protect yourself: sunglasses + sunscreen + hat!' },
          { emoji: '🌈', text: 'Objects look the color they reflect back to your eyes' },
        ]}
      />

      {/* CTA */}
      <Link
        href="/darsi.app/science/chapter-4-2/quiz/"
        className="block w-full mt-5 bg-gradient-to-br from-green to-[#2EA043] rounded-sm py-3.5 font-display text-[1.1rem] font-extrabold text-white text-center cursor-pointer shadow-glow-green hover:-translate-y-0.5 transition-transform no-underline"
      >
        Ready? Take the Quiz! 🧠 →
      </Link>
    </div>
  )
}

function SectionTitle({ emoji, title }: { emoji: string; title: string }) {
  return (
    <div className="font-display text-[1.3rem] font-extrabold text-text mb-1.5 flex items-center gap-2.5">
      {emoji} {title} <span className="flex-1 h-px bg-border" />
    </div>
  )
}
