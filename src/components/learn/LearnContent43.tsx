'use client'

import Link from 'next/link'
import chapter43 from '@/data/science/chapter-4-3'
import ConceptCard from './ConceptCard'
import FlipCard from './FlipCard'
import SummaryBox from './SummaryBox'
import { CharacterBubble } from '@/components/characters/LegoCharacter'
import LegoCharacter from '@/components/characters/LegoCharacter'

export default function LearnContent43() {
  const data = chapter43

  return (
    <div className="animate-fadeUp">
      {/* Hero */}
      <div className="rounded-[16px] p-8 md:px-9 md:py-8 mb-8 relative overflow-hidden bg-gradient-to-br from-[#0E7490] via-teal to-[#06B6D4] border border-teal/20">
        <div className="absolute -top-[60px] -right-[60px] w-[200px] h-[200px] rounded-full bg-[rgba(255,255,255,0.06)]" />
        <div className="absolute -bottom-10 left-[30%] w-[140px] h-[140px] rounded-full bg-[rgba(255,255,255,0.04)]" />
        <div className="absolute bottom-3 right-4 z-10 opacity-90">
          <LegoCharacter variant="explorer" size="lg" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.35)] rounded-[20px] px-3.5 py-1 text-[0.75rem] font-extrabold text-white tracking-[0.5px] mb-3.5">
            📚 Chapter 4.3
          </div>
          <h1 className="font-display text-[2.4rem] font-extrabold text-white mb-2 leading-tight">
            {data.emoji} Sound
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

      {/* Concept 1: Making Sounds */}
      <SectionTitle emoji="🎸" title="How Is Sound Made?" />
      <ConceptCard concept={data.concepts[0]} />

      <CharacterBubble
        variant="scientist"
        message="Try this: put your hand on your throat and say 'Ahhh'. Feel the vibrations? That's your voice box making sound!"
        side="left"
        className="my-4"
      />

      {/* Concept 2: How Sound Travels */}
      <SectionTitle emoji="🌊" title="How Does Sound Travel?" />
      <ConceptCard concept={data.concepts[1]} />

      {/* Concept 3: Volume */}
      <SectionTitle emoji="🔉" title="Volume — Loud & Soft" />
      <ConceptCard concept={data.concepts[2]} />

      <CharacterBubble
        variant="ninja"
        message="A ninja must be quiet! Whispering uses less energy than shouting — that's why it's softer."
        side="right"
        className="my-4"
      />

      {/* Concept 4: Pitch */}
      <SectionTitle emoji="🎵" title="Pitch — High & Low" />
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
      <CharacterBubble
        variant="frost"
        message="Tap each card to flip it! Try to guess the answer before you peek."
        side="left"
        className="mb-3"
      />
      <div className="grid grid-cols-2 max-[480px]:grid-cols-1 gap-3.5 mb-6">
        {data.flashcards.map((fc, i) => (
          <FlipCard key={i} flashcard={fc} />
        ))}
      </div>

      {/* Concept 5: Where Sound Travels */}
      <SectionTitle emoji="🧱" title="Where Can Sound Travel?" />
      <ConceptCard concept={data.concepts[4]} />

      <CharacterBubble
        variant="sunny"
        message="Fun fact: sound actually travels FASTER through solids than air! Try knocking on a table with your ear on it."
        side="right"
        className="my-4"
      />

      {/* Concept 6: Protecting Hearing */}
      <SectionTitle emoji="🛡️" title="Protecting Your Hearing" />
      <ConceptCard concept={data.concepts[5]} />

      {/* Summary */}
      <SummaryBox
        items={[
          { emoji: '🎸', text: 'Sound is made when objects <strong>vibrate</strong>' },
          { emoji: '🌊', text: 'Sound travels as <strong>waves</strong> through air to your ears' },
          { emoji: '🔉', text: '<strong>Volume</strong> = how loud or soft (more energy = louder)' },
          { emoji: '🎵', text: '<strong>Pitch</strong> = how high or low (fast vibration = high pitch)' },
          { emoji: '🧱', text: 'Sound travels through <strong>solids, liquids, and gases</strong>' },
          { emoji: '🛡️', text: 'Protect your ears from <strong>very loud sounds</strong>!' },
        ]}
      />

      {/* CTA */}
      <div className="flex items-center justify-center gap-3 mt-6 mb-2">
        <LegoCharacter variant="coral" size="md" />
        <span className="text-text-dim font-semibold text-sm">Ready to test your sound knowledge?</span>
        <LegoCharacter variant="galaxy" size="md" />
      </div>
      <Link
        href="/science/chapter-4-3/quiz/"
        className="block w-full bg-gradient-to-br from-green to-[#2EA043] rounded-sm py-3.5 font-display text-[1.1rem] font-extrabold text-white text-center cursor-pointer shadow-glow-green hover:-translate-y-0.5 transition-transform no-underline"
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
