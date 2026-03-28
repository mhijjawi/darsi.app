'use client'

import { Concept } from '@/types'
import DemoStage from './DemoStage'

const COLOR_MAP: Record<
  Concept['color'],
  { bg: string; title: string }
> = {
  blue:   { bg: 'rgba(88,166,255,0.12)',  title: '#2563EB' },
  grey:   { bg: 'rgba(96,125,139,0.15)',  title: '#90A4AE' },
  teal:   { bg: 'rgba(79,195,247,0.1)',   title: '#0891B2' },
  purple: { bg: 'rgba(188,140,255,0.1)',  title: '#7C3AED' },
  yellow: { bg: 'rgba(240,208,96,0.12)',  title: '#D97706' },
  coral:  { bg: 'rgba(57,208,208,0.1)',   title: '#0891B2' },
}

interface ConceptCardProps {
  concept: Concept
}

export default function ConceptCard({ concept }: ConceptCardProps) {
  const colors = COLOR_MAP[concept.color] ?? COLOR_MAP.blue

  return (
    <div className="bg-white border border-[--border] rounded-[16px] overflow-hidden transition-shadow hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-4 p-5 pb-3">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl shrink-0"
          style={{ background: colors.bg }}
        >
          {concept.emoji}
        </div>
        <div>
          <h3
            className="font-[family-name:var(--font-display)] text-[1.3rem] font-bold leading-tight"
            style={{ color: colors.title }}
          >
            {concept.title}
          </h3>
          <p className="text-[--text-dim] text-sm mt-0.5">{concept.subtitle}</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pb-5">
        {/* Explanation */}
        <div
          className="text-[--text] leading-relaxed mb-4 [&>strong]:font-bold [&>em]:italic"
          dangerouslySetInnerHTML={{ __html: concept.explanation }}
        />

        {/* Demo Stage */}
        {concept.demoType && concept.demoType !== 'none' && concept.demoType !== 'sunSafety' && (
          <div className="mb-4">
            <DemoStage demoType={concept.demoType} />
          </div>
        )}

        {/* Light Interactions Grid */}
        {concept.lightInteractions && concept.lightInteractions.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-4">
            {concept.lightInteractions.map((interaction, i) => (
              <div
                key={i}
                className="rounded-xl p-3 text-center"
                style={{ background: `${interaction.color}15`, border: `1px solid ${interaction.color}30` }}
              >
                <div className="text-2xl mb-1">{interaction.emoji}</div>
                <div
                  className="font-[family-name:var(--font-display)] font-bold text-sm"
                  style={{ color: interaction.color }}
                >
                  {interaction.label}
                </div>
                <p className="text-xs text-[--text-dim] mt-1">{interaction.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Sun Safety Cards Grid */}
        {concept.sunSafetyCards && concept.sunSafetyCards.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-4">
            {concept.sunSafetyCards.map((card, i) => (
              <div
                key={i}
                className="bg-[--card2] border border-[--border] rounded-xl p-3 text-center"
              >
                <div className="text-3xl mb-2">{card.emoji}</div>
                <div className="font-[family-name:var(--font-display)] font-bold text-sm text-[--text]">
                  {card.title}
                </div>
                <p className="text-xs text-[--text-dim] mt-1">{card.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Fruit Cards Row */}
        {concept.fruitCards && concept.fruitCards.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-2 mb-4">
            {concept.fruitCards.map((fruit, i) => (
              <div
                key={i}
                className="min-w-[120px] bg-[--card2] border border-[--border] rounded-xl p-3 text-center shrink-0"
              >
                <div className="text-3xl mb-1">{fruit.emoji}</div>
                <div className="font-[family-name:var(--font-display)] font-bold text-sm text-[--text]">
                  {fruit.name}
                </div>
                <p className="text-xs text-[--text-dim] mt-1">{fruit.description}</p>
                <span
                  className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full"
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
          <div>
            <div className="text-xs font-bold text-[--text-dim] uppercase tracking-wider mb-2">
              Examples
            </div>
            <div className="flex flex-wrap gap-2">
              {concept.examples.map((ex, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{ background: colors.bg, color: colors.title }}
                >
                  <span>{ex.emoji}</span>
                  <span>{ex.label}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
