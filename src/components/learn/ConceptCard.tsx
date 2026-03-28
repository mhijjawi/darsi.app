'use client'

import { Concept } from '@/types'
import DemoStage from './DemoStage'

const COLOR_MAP: Record<
  Concept['color'],
  { bg: string; title: string; chipBg: string }
> = {
  blue:   { bg: 'rgba(88,166,255,0.12)',  title: '#2563EB', chipBg: 'rgba(88,166,255,0.1)' },
  grey:   { bg: 'rgba(96,125,139,0.15)',  title: '#90A4AE', chipBg: 'rgba(96,125,139,0.12)' },
  teal:   { bg: 'rgba(79,195,247,0.1)',   title: '#0891B2', chipBg: 'rgba(79,195,247,0.1)' },
  purple: { bg: 'rgba(188,140,255,0.1)',  title: '#7C3AED', chipBg: 'rgba(188,140,255,0.1)' },
  yellow: { bg: 'rgba(240,208,96,0.12)',  title: '#D97706', chipBg: 'rgba(240,208,96,0.1)' },
  coral:  { bg: 'rgba(234,88,12,0.1)',    title: '#EA580C', chipBg: 'rgba(234,88,12,0.08)' },
}

interface ConceptCardProps {
  concept: Concept
}

export default function ConceptCard({ concept }: ConceptCardProps) {
  const colors = COLOR_MAP[concept.color] ?? COLOR_MAP.blue

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-[16px] overflow-hidden mb-6 transition-shadow hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3.5 p-[18px_22px] border-b border-[#E2E8F0]">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-[1.6rem] shrink-0"
          style={{ background: colors.bg }}
        >
          {concept.emoji}
        </div>
        <div>
          <h3
            className="font-display text-[1.3rem] font-extrabold leading-tight"
            style={{ color: colors.title }}
          >
            {concept.title}
          </h3>
          <p className="text-text-dim text-[0.82rem] font-semibold mt-[1px]">{concept.subtitle}</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-[22px]">
        {/* Explanation */}
        <div
          className="text-text text-base leading-[1.7] font-semibold mb-5 [&_strong]:text-blue [&_strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: concept.explanation }}
        />

        {/* Demo Stage */}
        {concept.demoType && concept.demoType !== 'none' && concept.demoType !== 'sunSafety' && (
          <div className="mb-5">
            <DemoStage demoType={concept.demoType} />
          </div>
        )}

        {/* Light Interactions Grid (How We See - 3 things) */}
        {concept.lightInteractions && concept.lightInteractions.length > 0 && (
          <div className="grid grid-cols-3 gap-[10px] mt-4 mb-4">
            {concept.lightInteractions.map((interaction, i) => {
              const colorMap: Record<string, { bg: string; text: string }> = {
                blue:   { bg: 'rgba(37,99,235,0.08)',  text: '#2563EB' },
                coral:  { bg: 'rgba(234,88,12,0.08)',  text: '#EA580C' },
                purple: { bg: 'rgba(124,58,237,0.08)', text: '#7C3AED' },
              }
              const c = colorMap[interaction.color] ?? colorMap.blue
              return (
                <div
                  key={i}
                  className="rounded-[10px] p-3.5 text-center border border-[#E2E8F0]"
                  style={{ background: '#F8FAFC' }}
                >
                  <div className="text-[1.8rem]">{interaction.emoji}</div>
                  <div
                    className="font-extrabold text-[0.85rem] my-1"
                    style={{ color: c.text }}
                  >
                    {interaction.label}
                  </div>
                  <p className="text-[0.72rem] text-text-dim font-semibold leading-[1.4]">{interaction.description}</p>
                </div>
              )
            })}
          </div>
        )}

        {/* Sun Safety Cards Grid */}
        {concept.sunSafetyCards && concept.sunSafetyCards.length > 0 && (
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-3.5 mb-4">
            {concept.sunSafetyCards.map((card, i) => (
              <div
                key={i}
                className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] p-5 text-center transition-transform hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-[2.5rem] block mb-2.5">{card.emoji}</span>
                <div className="font-extrabold text-[0.9rem] text-coral mb-1.5">{card.title}</div>
                <p className="text-[0.78rem] text-text-dim font-semibold leading-[1.5]">{card.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Fruit Cards Row */}
        {concept.fruitCards && concept.fruitCards.length > 0 && (
          <div className="flex gap-3.5 flex-wrap justify-center mt-5 mb-4">
            {concept.fruitCards.map((fruit, i) => (
              <div
                key={i}
                className="flex-1 min-w-[120px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 text-center"
              >
                <div className="text-[2rem] mb-1.5">{fruit.emoji}</div>
                <div className="font-extrabold text-[0.85rem] text-text mb-1">{fruit.name}</div>
                <div
                  className="text-[0.72rem] text-text-dim font-semibold leading-[1.4] [&_strong]:font-extrabold"
                  dangerouslySetInnerHTML={{ __html: fruit.description }}
                />
                <span
                  className="inline-block mt-1.5 rounded-[10px] px-2 py-[2px] text-[0.65rem] font-extrabold"
                  style={{ color: fruit.tagColor, background: fruit.tagBg }}
                >
                  {fruit.tagLabel}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Examples Chips */}
        {concept.examples && concept.examples.length > 0 && (
          <div className="mt-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] p-3.5">
            <div className="font-extrabold text-[0.85rem] mb-2" style={{ color: colors.title }}>
              {concept.emoji} Examples of {concept.title} Objects:
            </div>
            <div className="flex flex-wrap gap-2">
              {concept.examples.map((ex, i) => (
                <span
                  key={i}
                  className="rounded-[20px] px-3 py-1 text-[0.78rem] font-bold"
                  style={{ background: colors.chipBg, color: colors.title }}
                >
                  {ex.emoji} {ex.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
