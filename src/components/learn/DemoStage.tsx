'use client'

interface DemoStageProps {
  demoType: string
}

export default function DemoStage({ demoType }: DemoStageProps) {
  switch (demoType) {
    case 'seeDemo':
      return <SeeDemoStage />
    case 'opaque':
      return <OpaqueDemoStage />
    case 'transparent':
      return <TransparentDemoStage />
    case 'translucent':
      return <TranslucentDemoStage />
    case 'shadow':
      return <ShadowDemoStage />
    case 'color':
      return <ColorDemoStage />
    case 'sunSafety':
      return null
    default:
      return null
  }
}

/* ── See Demo ── */
function SeeDemoStage() {
  return (
    <div>
      <div className="bg-[#EFF6FF] rounded-xl p-4 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          {/* Lamp */}
          <div className="text-center shrink-0">
            <div className="text-3xl">💡</div>
            <div className="text-[10px] text-[--text-dim] mt-1">Lamp</div>
          </div>
          {/* Beam to object */}
          <div className="flex-1 h-1 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full animate-[growBeam_1.5s_ease-out_infinite_alternate]" />
          {/* Book */}
          <div className="text-center shrink-0">
            <div className="text-3xl">📖</div>
            <div className="text-[10px] text-[--text-dim] mt-1">Book</div>
          </div>
          {/* Reflected beam */}
          <div className="flex-1 h-1 bg-gradient-to-r from-yellow-200 to-yellow-100 rounded-full opacity-60 animate-[growBeam_1.5s_ease-out_0.3s_infinite_alternate]" />
          {/* Eye */}
          <div className="text-center shrink-0">
            <div className="text-3xl">👁️</div>
            <div className="text-[10px] text-[--text-dim] mt-1">Eye</div>
          </div>
        </div>
      </div>
      <Legend
        items={[
          { color: '#FFD54F', label: 'Light ray' },
          { color: '#FFE082', label: 'Reflected light' },
        ]}
      />
    </div>
  )
}

/* ── Opaque Demo ── */
function OpaqueDemoStage() {
  return (
    <div>
      <div className="bg-[#EFF6FF] rounded-xl relative min-h-[140px] overflow-hidden">
        {/* Sun */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl animate-[pulse-src_2s_ease-in-out_infinite]">
          ☀️
        </div>
        {/* Beam */}
        <div className="absolute left-14 top-1/2 -translate-y-1/2 w-[calc(50%-56px)] h-2 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full animate-[growBeam_1.5s_ease-out_infinite_alternate]" />
        {/* Opaque wall */}
        <div className="absolute left-1/2 -translate-x-1/2 top-2 bottom-2 w-6 bg-[#90A4AE] rounded-md border-2 border-[#78909C] flex items-center justify-center">
          <span className="text-[10px] text-white font-bold [writing-mode:vertical-lr] rotate-180">
            WALL
          </span>
        </div>
        {/* Shadow zone */}
        <div className="absolute right-0 top-0 bottom-0 w-[40%] bg-gradient-to-r from-gray-400/40 to-gray-500/30 animate-[shadow-breathe_3s_ease-in-out_infinite]" />
        {/* Hand */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl opacity-50">
          ✋
        </div>
      </div>
      <Legend
        items={[
          { color: '#FFD54F', label: 'Light' },
          { color: '#90A4AE', label: 'Opaque object' },
          { color: '#78909C', label: 'Shadow' },
        ]}
      />
    </div>
  )
}

/* ── Transparent Demo ── */
function TransparentDemoStage() {
  return (
    <div>
      <div className="bg-[#EFF6FF] rounded-xl relative min-h-[140px] overflow-hidden">
        {/* Sun */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl animate-[pulse-src_2s_ease-in-out_infinite]">
          ☀️
        </div>
        {/* Full beam */}
        <div className="absolute left-14 top-1/2 -translate-y-1/2 w-[calc(100%-80px)] h-2 bg-gradient-to-r from-yellow-300 via-yellow-300 to-yellow-200 rounded-full animate-[growBeam_1.5s_ease-out_infinite_alternate]" />
        {/* Glass panel */}
        <div className="absolute left-1/2 -translate-x-1/2 top-3 bottom-3 w-3 rounded border-2 border-cyan-400 bg-cyan-200/20 animate-[glass-shimmer_3s_ease-in-out_infinite]" />
        {/* Checkmark */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
          ✅
        </div>
      </div>
      <Legend
        items={[
          { color: '#FFD54F', label: 'Light passes through' },
          { color: '#22D3EE', label: 'Transparent glass' },
        ]}
      />
    </div>
  )
}

/* ── Translucent Demo ── */
function TranslucentDemoStage() {
  return (
    <div>
      <div className="bg-[#EFF6FF] rounded-xl relative min-h-[140px] overflow-hidden">
        {/* Sun */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl animate-[pulse-src_2s_ease-in-out_infinite]">
          ☀️
        </div>
        {/* Incoming beam */}
        <div className="absolute left-14 top-1/2 -translate-y-1/2 w-[calc(50%-56px)] h-2 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full animate-[growBeam_1.5s_ease-out_infinite_alternate]" />
        {/* Frosted glass */}
        <div className="absolute left-1/2 -translate-x-1/2 top-3 bottom-3 w-4 rounded border-2 border-purple-400 bg-purple-300/30 backdrop-blur-sm" />
        {/* Weak exit beam */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-[30%] h-2 bg-gradient-to-r from-yellow-200/60 to-yellow-100/20 rounded-full blur-[2px] animate-[beam-pulse_2s_ease-in-out_infinite]" />
        {/* Blurry label */}
        <div className="absolute right-3 bottom-3 text-[10px] text-[--text-dimmer] blur-[1px]">
          blurry
        </div>
      </div>
      <Legend
        items={[
          { color: '#FFD54F', label: 'Some light passes' },
          { color: '#A78BFA', label: 'Translucent panel' },
          { color: '#FDE68A', label: 'Scattered light' },
        ]}
      />
    </div>
  )
}

/* ── Shadow Demo ── */
function ShadowDemoStage() {
  return (
    <div>
      <div className="bg-[#FFF7ED] rounded-xl relative h-[160px] overflow-hidden">
        {/* Sun */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-3xl animate-[pulse-src_2s_ease-in-out_infinite]">
          ☀️
        </div>
        {/* Person */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-4xl animate-[person-sway_3s_ease-in-out_infinite]">
          🧍
        </div>
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-green-200/60 rounded-b-xl" />
        {/* Shadow */}
        <div className="absolute bottom-1 left-[55%] w-12 h-4 bg-gray-800/30 rounded-full blur-[3px] animate-[shadow-breathe_3s_ease-in-out_infinite]" />
      </div>
      <Legend
        items={[
          { color: '#FFD54F', label: 'Sunlight' },
          { color: '#475569', label: 'Shadow' },
          { color: '#86EFAC', label: 'Ground' },
        ]}
      />
    </div>
  )
}

/* ── Color / Prism Demo ── */
function ColorDemoStage() {
  const rays = [
    { color: '#EF4444', delay: '0s' },
    { color: '#F97316', delay: '0.1s' },
    { color: '#EAB308', delay: '0.2s' },
    { color: '#22C55E', delay: '0.3s' },
    { color: '#3B82F6', delay: '0.4s' },
    { color: '#8B5CF6', delay: '0.5s' },
  ]

  return (
    <div>
      <div className="bg-[#F5F3FF] rounded-xl relative min-h-[140px] overflow-hidden">
        {/* White beam entering */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-[calc(50%-40px)] h-2 bg-gradient-to-r from-white to-gray-100 rounded-full border border-gray-200 animate-[growBeam_1.5s_ease-out_infinite_alternate]" />
        {/* Prism */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-4xl">
          🔺
        </div>
        {/* Rainbow rays */}
        {rays.map((ray, i) => {
          const angle = -15 + i * 6
          return (
            <div
              key={i}
              className="absolute h-[3px] rounded-full animate-[growBeam_1.5s_ease-out_infinite_alternate]"
              style={{
                left: '55%',
                top: `${35 + i * 8}%`,
                width: '40%',
                background: `linear-gradient(to right, ${ray.color}, ${ray.color}80)`,
                transform: `rotate(${angle}deg)`,
                transformOrigin: 'left center',
                animationDelay: ray.delay,
              }}
            />
          )
        })}
      </div>
      <Legend
        items={[
          { color: '#E5E7EB', label: 'White light' },
          { color: '#EF4444', label: 'Red' },
          { color: '#F97316', label: 'Orange' },
          { color: '#EAB308', label: 'Yellow' },
          { color: '#22C55E', label: 'Green' },
          { color: '#3B82F6', label: 'Blue' },
          { color: '#8B5CF6', label: 'Purple' },
        ]}
      />
    </div>
  )
}

/* ── Legend ── */
function Legend({ items }: { items: { color: string; label: string }[] }) {
  return (
    <div className="flex flex-wrap gap-3 mt-2 px-1">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5 text-xs text-[--text-dim]">
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ background: item.color }}
          />
          {item.label}
        </div>
      ))}
    </div>
  )
}
