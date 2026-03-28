'use client'

interface DemoStageProps {
  demoType: string
}

export default function DemoStage({ demoType }: DemoStageProps) {
  switch (demoType) {
    case 'vibration':
      return <VibrationDemo />
    case 'soundWave':
      return <SoundWaveDemo />
    case 'volume':
      return <VolumeDemo />
    case 'pitch':
      return <PitchDemo />
    case 'soundTravel':
      return <SoundTravelDemo />
    case 'seeDemo':
      return <SeeDemoStage />
    case 'opaque':
      return <OpaqueDemoStage />
    case 'transparent':
      return <TransparentDemoStage />
    case 'translucent':
      return <TranslucentDemoStage />
    case 'shadow':
      return <ShadowScene />
    case 'color':
      return <ColorDemoStage />
    case 'sunSafety':
      return null
    default:
      return null
  }
}

/* ═══════════════════════════════════════
   HOW WE SEE — Lamp → Book → Eye
═══════════════════════════════════════ */
function SeeDemoStage() {
  return (
    <div>
      <div
        className="flex items-center justify-around gap-2.5 flex-wrap rounded-[10px] border border-[#E2E8F0] p-6"
        style={{ background: '#EFF6FF' }}
      >
        {/* Lamp */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[2.2rem]">💡</span>
          <span className="text-[0.72rem] font-extrabold text-text-dim text-center">Lamp<br/>(light source)</span>
        </div>

        {/* Arrow 1: light shoots out */}
        <div className="flex flex-col items-center gap-1">
          <div
            className="h-1 rounded-full animate-growBeam"
            style={{
              width: 55,
              background: 'linear-gradient(90deg, #FFB300, #FF6B00)',
            }}
          />
          <span className="text-[0.65rem] font-extrabold text-text-dimmer whitespace-nowrap">light shoots out →</span>
        </div>

        {/* Book */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[2.2rem]">📖</span>
          <span className="text-[0.72rem] font-extrabold text-text-dim text-center">Book<br/>(object)</span>
        </div>

        {/* Arrow 2: light bounces back */}
        <div className="flex flex-col items-center gap-1">
          <div
            className="h-1 rounded-full animate-growBeam"
            style={{
              width: 55,
              background: 'linear-gradient(90deg, #58A6FF, #3FB950)',
              animationDelay: '1s',
            }}
          />
          <span className="text-[0.65rem] font-extrabold text-text-dimmer whitespace-nowrap">← light bounces back</span>
        </div>

        {/* Eye */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[2.2rem]">👁️</span>
          <span className="text-[0.72rem] font-extrabold text-text-dim text-center">Your eyes<br/>(you see!)</span>
        </div>
      </div>

      <Legend items={[
        { color: '#FFB300', label: 'Light from lamp' },
        { color: '#58A6FF', label: 'Reflected light' },
        { color: '#3FB950', label: 'You see the object!' },
      ]} />
    </div>
  )
}

/* ═══════════════════════════════════════
   OPAQUE — Light blocked, shadow forms
═══════════════════════════════════════ */
function OpaqueDemoStage() {
  return (
    <div>
      <div
        className="relative rounded-[10px] border border-[#E2E8F0] overflow-hidden"
        style={{ background: '#EFF6FF', minHeight: 140, padding: '28px 20px' }}
      >
        {/* Light source */}
        <div
          className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-[1.1rem] z-10 animate-pulseSrc"
          style={{
            background: 'radial-gradient(circle, #FFE566 0%, #FFB300 60%, #FF6B00 100%)',
            boxShadow: '0 0 20px #FFB300, 0 0 40px rgba(255,179,0,0.4)',
          }}
        >
          ☀️
        </div>

        {/* Beam */}
        <div
          className="absolute left-[60px] top-1/2 -translate-y-1/2 h-7 animate-beamPulse"
          style={{
            width: 120,
            background: 'linear-gradient(90deg, rgba(255,200,0,0.9), rgba(255,200,0,0.3))',
            clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0 80%)',
          }}
        />

        {/* Opaque wall */}
        <div
          className="absolute top-1/2 -translate-y-1/2 rounded"
          style={{
            left: 180,
            width: 22,
            height: 90,
            background: 'linear-gradient(180deg, #475569, #334155)',
            border: '2px solid #64748B',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          }}
        />
        <div
          className="absolute text-[0.65rem] font-extrabold whitespace-nowrap"
          style={{ left: 172, top: 'calc(50% + 52px)', color: '#90A4AE' }}
        >
          Opaque<br/>Wall
        </div>

        {/* Shadow zone */}
        <div
          className="absolute top-1/2 -translate-y-1/2 animate-shadowBreathe"
          style={{
            left: 202,
            width: 100,
            height: 90,
            background: 'linear-gradient(90deg, rgba(71,85,105,0.25), transparent)',
            borderRadius: '0 8px 8px 0',
          }}
        />

        {/* Shadow label */}
        <div
          className="absolute right-5 top-1/2 -translate-y-1/2 text-[0.72rem] font-extrabold text-center"
          style={{ color: '#546E7A' }}
        >
          Shadow<br/>Zone 🌑
        </div>

        {/* Blocked X */}
        <div
          className="absolute top-1/2 -translate-y-1/2 text-[1.5rem] animate-blink"
          style={{ left: 305, color: '#FF5252' }}
        >
          ✋
        </div>
      </div>

      <Legend items={[
        { color: '#FFB300', label: 'Light beam' },
        { color: '#607D8B', label: 'Opaque wall (blocks all light)' },
        { color: '#94A3B8', label: 'Shadow area (dark)' },
      ]} />
    </div>
  )
}

/* ═══════════════════════════════════════
   TRANSPARENT — Light passes fully
═══════════════════════════════════════ */
function TransparentDemoStage() {
  return (
    <div>
      <div
        className="relative rounded-[10px] border border-[#E2E8F0] overflow-hidden"
        style={{ background: '#EFF6FF', minHeight: 140, padding: '28px 20px' }}
      >
        {/* Light source */}
        <div
          className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-[1.1rem] z-10 animate-pulseSrc"
          style={{
            background: 'radial-gradient(circle, #FFE566 0%, #FFB300 60%, #FF6B00 100%)',
            boxShadow: '0 0 20px #FFB300, 0 0 40px rgba(255,179,0,0.4)',
          }}
        >
          ☀️
        </div>

        {/* Full beam going through */}
        <div
          className="absolute left-[60px] top-1/2 -translate-y-1/2 h-7 animate-beamPulse"
          style={{
            width: 280,
            background: 'linear-gradient(90deg, rgba(255,220,0,0.9) 0%, rgba(255,220,0,0.6) 30%, rgba(100,200,255,0.7) 60%, rgba(100,200,255,0.5) 100%)',
            clipPath: 'polygon(0 20%, 100% 10%, 100% 90%, 0 80%)',
          }}
        />

        {/* Glass panel */}
        <div
          className="absolute top-1/2 -translate-y-1/2 rounded animate-glassShimmer"
          style={{
            left: 178,
            width: 18,
            height: 90,
            background: 'linear-gradient(180deg, rgba(100,200,255,0.15) 0%, rgba(150,220,255,0.25) 50%, rgba(100,200,255,0.15) 100%)',
            border: '2px solid rgba(100,200,255,0.5)',
            boxShadow: '0 0 16px rgba(100,200,255,0.3), inset 0 0 10px rgba(255,255,255,0.05)',
          }}
        />
        <div
          className="absolute text-[0.65rem] font-extrabold whitespace-nowrap"
          style={{ left: 163, top: 'calc(50% + 52px)', color: '#4FC3F7' }}
        >
          Glass ✨
        </div>

        {/* Check */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[1.8rem] animate-checkPop">
          ✅
        </div>
      </div>

      <Legend items={[
        { color: '#FFB300', label: 'Light enters' },
        { color: '#4FC3F7', label: 'Glass panel (fully transparent)' },
        { color: '#3FB950', label: 'Light passes through fully!' },
      ]} />
    </div>
  )
}

/* ═══════════════════════════════════════
   TRANSLUCENT — Some light, blurry
═══════════════════════════════════════ */
function TranslucentDemoStage() {
  return (
    <div>
      <div
        className="relative rounded-[10px] border border-[#E2E8F0] overflow-hidden"
        style={{ background: '#EFF6FF', minHeight: 140, padding: '28px 20px' }}
      >
        {/* Light source */}
        <div
          className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-[1.1rem] z-10 animate-pulseSrc"
          style={{
            background: 'radial-gradient(circle, #FFE566 0%, #FFB300 60%, #FF6B00 100%)',
            boxShadow: '0 0 20px #FFB300, 0 0 40px rgba(255,179,0,0.4)',
          }}
        >
          ☀️
        </div>

        {/* Partial beam */}
        <div
          className="absolute left-[60px] top-1/2 -translate-y-1/2 h-7 animate-beamPulse"
          style={{
            width: 115,
            background: 'linear-gradient(90deg, rgba(255,220,0,0.9), rgba(255,220,0,0.5))',
            clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0 80%)',
          }}
        />

        {/* Frosted panel */}
        <div
          className="absolute top-1/2 -translate-y-1/2 rounded"
          style={{
            left: 178,
            width: 20,
            height: 90,
            background: 'linear-gradient(180deg, rgba(188,140,255,0.2) 0%, rgba(188,140,255,0.35) 50%, rgba(188,140,255,0.2) 100%)',
            border: '2px solid rgba(188,140,255,0.5)',
            boxShadow: '0 0 16px rgba(188,140,255,0.3)',
            backdropFilter: 'blur(4px)',
          }}
        />
        <div
          className="absolute text-[0.65rem] font-extrabold whitespace-nowrap"
          style={{ left: 162, top: 'calc(50% + 52px)', color: '#BC8CFF' }}
        >
          Frosted<br/>glass 🌫️
        </div>

        {/* Weak scattered beam */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-4 animate-beamPulse"
          style={{
            left: 198,
            width: 100,
            background: 'linear-gradient(90deg, rgba(188,140,255,0.5), transparent)',
            clipPath: 'polygon(0 10%, 100% 0, 100% 100%, 0 90%)',
            animationDelay: '0.5s',
          }}
        />

        {/* Blurry label */}
        <div
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[0.72rem] font-extrabold text-center"
          style={{ color: '#BC8CFF', filter: 'blur(0.8px)', opacity: 0.7 }}
        >
          Blurry<br/>light 〰️
        </div>
      </div>

      <Legend items={[
        { color: '#FFB300', label: 'Full beam enters' },
        { color: '#BC8CFF', label: 'Frosted glass (blocks some)' },
        { color: '#7B47BC', label: 'Weak, scattered light exits' },
      ]} />
    </div>
  )
}

/* ═══════════════════════════════════════
   SHADOW SCENE — Person casting shadow
═══════════════════════════════════════ */
function ShadowScene() {
  return (
    <div>
      <div
        className="relative rounded-[10px] border border-[#E2E8F0] overflow-hidden flex items-end justify-center"
        style={{ background: '#FFF7ED', height: 160, padding: 20 }}
      >
        {/* Sun */}
        <div
          className="absolute top-5 left-1/2 -translate-x-1/2 text-[2.5rem] animate-pulseSrc"
          style={{ filter: 'drop-shadow(0 0 16px #FFB300)' }}
        >
          ☀️
        </div>

        {/* Person */}
        <div className="text-[3rem] relative z-[2] animate-personSway">
          🧍
        </div>

        {/* Shadow on ground */}
        <div
          className="absolute"
          style={{
            bottom: 16,
            left: '50%',
            width: 20,
            height: 60,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
            transformOrigin: 'bottom center',
            transform: 'translateX(-50%) skewX(20deg) scaleX(3)',
            borderRadius: '50% 50% 0 0',
            filter: 'blur(4px)',
            animation: 'shadowShift 4s ease-in-out infinite',
          }}
        />

        {/* Green floor */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: 18,
            background: 'linear-gradient(180deg, #D1FAE5, #A7F3D0)',
            borderTop: '1px solid #6EE7B7',
          }}
        />
      </div>

      <p className="text-center text-[0.78rem] text-text-dim font-bold mt-1.5">
        A person&apos;s body is opaque → light can&apos;t pass → shadow forms!
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════
   COLOR / PRISM — White light → rainbow
═══════════════════════════════════════ */
function ColorDemoStage() {
  return (
    <div>
      <div
        className="rounded-[10px] border border-[#E2E8F0] p-6"
        style={{ background: '#F5F3FF' }}
      >
        {/* Prism row */}
        <div className="flex items-center justify-center gap-5 flex-wrap">
          {/* White beams in */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-[60px] h-1.5 rounded bg-gradient-to-r from-gray-400/50 to-gray-400/15 animate-beamPulse" />
            <div className="w-[60px] h-1.5 rounded bg-gradient-to-r from-gray-400/50 to-gray-400/15 animate-beamPulse" />
            <div className="w-[60px] h-1.5 rounded bg-gradient-to-r from-gray-400/50 to-gray-400/15 animate-beamPulse" />
            <div className="text-[0.65rem] text-text-dimmer mt-1 font-bold">White sunlight</div>
          </div>

          {/* Prism */}
          <div className="text-[3rem] animate-prismGlow" style={{ filter: 'drop-shadow(0 0 16px rgba(150,150,255,0.4))' }}>
            🔷
          </div>

          {/* Rainbow out */}
          <div className="flex flex-col gap-1">
            {[
              { bg: 'linear-gradient(90deg,#FF595E,transparent)', w: 70, delay: '0s' },
              { bg: 'linear-gradient(90deg,#FF924C,transparent)', w: 80, delay: '0.1s' },
              { bg: 'linear-gradient(90deg,#FFCA3A,transparent)', w: 90, delay: '0.2s' },
              { bg: 'linear-gradient(90deg,#6A994E,transparent)', w: 80, delay: '0.3s' },
              { bg: 'linear-gradient(90deg,#4361EE,transparent)', w: 70, delay: '0.4s' },
              { bg: 'linear-gradient(90deg,#7B2FBE,transparent)', w: 60, delay: '0.5s' },
            ].map((ray, i) => (
              <div
                key={i}
                className="h-[5px] rounded animate-beamPulse"
                style={{
                  width: ray.w,
                  background: ray.bg,
                  animationDelay: ray.delay,
                }}
              />
            ))}
            <div className="text-[0.65rem] text-text-dimmer mt-1 font-bold">All colors split apart!</div>
          </div>
        </div>
      </div>

      <Legend items={[
        { color: '#9E9E9E', label: 'White light' },
        { color: '#FF595E', label: 'Red' },
        { color: '#FF924C', label: 'Orange' },
        { color: '#FFCA3A', label: 'Yellow' },
        { color: '#6A994E', label: 'Green' },
        { color: '#4361EE', label: 'Blue' },
        { color: '#7B2FBE', label: 'Purple' },
      ]} />
    </div>
  )
}

/* ═══════════════════════════════════════
   VIBRATION — Guitar string vibrating
═══════════════════════════════════════ */
function VibrationDemo() {
  return (
    <div>
      <div
        className="rounded-[10px] border border-[#E2E8F0] p-6 flex items-center justify-center gap-8 flex-wrap"
        style={{ background: '#EFF6FF' }}
      >
        {/* Guitar / string illustration */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-24 h-20 rounded-xl border-2 border-[#D97706] bg-[#FEF3C7] flex items-center justify-center overflow-hidden">
            {/* Sound hole */}
            <div className="w-8 h-8 rounded-full bg-[#92400E]/30" />
            {/* Vibrating strings */}
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="absolute h-[2px] bg-[#D97706]"
                style={{
                  left: 0, right: 0,
                  top: `${35 + i * 15}%`,
                  animation: `shake 0.${2 + i}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
          <span className="text-[0.72rem] font-extrabold text-text-dim">🎸 Vibrating strings</span>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center gap-1">
          <div className="text-2xl">〰️</div>
          <span className="text-[0.65rem] font-extrabold text-text-dimmer">vibrations</span>
        </div>

        {/* Sound waves */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-1">
            {[1, 0.7, 0.5, 0.3].map((opacity, i) => (
              <div
                key={i}
                className="w-1 rounded-full bg-blue animate-beamPulse"
                style={{
                  height: 20 + i * 10,
                  opacity,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
          <span className="text-[0.72rem] font-extrabold text-text-dim">🔊 Sound!</span>
        </div>
      </div>

      <Legend items={[
        { color: '#D97706', label: 'Vibrating object' },
        { color: '#2563EB', label: 'Sound waves created' },
      ]} />
    </div>
  )
}

/* ═══════════════════════════════════════
   SOUND WAVE — Speaker → air → ear
═══════════════════════════════════════ */
function SoundWaveDemo() {
  return (
    <div>
      <div
        className="rounded-[10px] border border-[#E2E8F0] p-6"
        style={{ background: '#F0FDFA' }}
      >
        <div className="flex items-center justify-around gap-3 flex-wrap">
          {/* Speaker */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[2.2rem]">📢</span>
            <span className="text-[0.72rem] font-extrabold text-text-dim text-center">Speaker<br/>(vibrates)</span>
          </div>

          {/* Sound waves expanding */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="rounded-full border-2 border-teal/40 animate-beamPulse"
                style={{
                  width: 12 + i * 8,
                  height: 12 + i * 8,
                  animationDelay: `${i * 0.3}s`,
                  opacity: 1 - i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Air molecules */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1 flex-wrap justify-center w-16">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-teal/30 animate-beamPulse"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <span className="text-[0.72rem] font-extrabold text-text-dim text-center">Air molecules<br/>(bump each other)</span>
          </div>

          {/* Ear */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[2.2rem]">👂</span>
            <span className="text-[0.72rem] font-extrabold text-text-dim text-center">Your ear<br/>(you hear!)</span>
          </div>
        </div>
      </div>

      <Legend items={[
        { color: '#0891B2', label: 'Sound waves' },
        { color: '#99F6E4', label: 'Air molecules vibrating' },
      ]} />
    </div>
  )
}

/* ═══════════════════════════════════════
   VOLUME — Loud vs soft comparison
═══════════════════════════════════════ */
function VolumeDemo() {
  return (
    <div>
      <div
        className="rounded-[10px] border border-[#E2E8F0] p-5"
        style={{ background: '#FFF7ED' }}
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Loud */}
          <div className="text-center p-4 rounded-xl bg-white border border-[#E2E8F0]">
            <div className="text-[2.5rem] mb-2">📢</div>
            <div className="font-extrabold text-coral text-sm mb-2">LOUD</div>
            <div className="flex items-end justify-center gap-[3px] h-10 mb-2">
              {[30, 38, 26, 40, 22, 36, 28].map((h, i) => (
                <div
                  key={i}
                  className="w-[6px] rounded-full bg-coral animate-beamPulse"
                  style={{ height: h, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <p className="text-[0.72rem] text-text-dim font-semibold">Strong vibrations<br/>Lots of energy</p>
          </div>

          {/* Soft */}
          <div className="text-center p-4 rounded-xl bg-white border border-[#E2E8F0]">
            <div className="text-[2.5rem] mb-2">🤫</div>
            <div className="font-extrabold text-teal text-sm mb-2">SOFT</div>
            <div className="flex items-end justify-center gap-[3px] h-10 mb-2">
              {[8, 12, 6, 10, 7, 11, 9].map((h, i) => (
                <div
                  key={i}
                  className="w-[6px] rounded-full bg-teal animate-beamPulse"
                  style={{ height: h, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <p className="text-[0.72rem] text-text-dim font-semibold">Weak vibrations<br/>Little energy</p>
          </div>
        </div>
      </div>

      <Legend items={[
        { color: '#EA580C', label: 'Loud — big wave bars' },
        { color: '#0891B2', label: 'Soft — small wave bars' },
      ]} />
    </div>
  )
}

/* ═══════════════════════════════════════
   PITCH — High vs low comparison
═══════════════════════════════════════ */
function PitchDemo() {
  return (
    <div>
      <div
        className="rounded-[10px] border border-[#E2E8F0] p-5"
        style={{ background: '#F5F3FF' }}
      >
        <div className="grid grid-cols-2 gap-4">
          {/* High pitch */}
          <div className="text-center p-4 rounded-xl bg-white border border-[#E2E8F0]">
            <div className="text-[2.5rem] mb-2">🐦</div>
            <div className="font-extrabold text-purple text-sm mb-2">HIGH PITCH</div>
            {/* Fast tight waves */}
            <svg viewBox="0 0 120 30" className="w-full h-8 mb-2">
              <path
                d="M0,15 Q5,0 10,15 T20,15 T30,15 T40,15 T50,15 T60,15 T70,15 T80,15 T90,15 T100,15 T110,15 T120,15"
                fill="none"
                stroke="#7C3AED"
                strokeWidth="2.5"
                className="animate-beamPulse"
              />
            </svg>
            <p className="text-[0.72rem] text-text-dim font-semibold">Small objects<br/>Vibrate FAST</p>
          </div>

          {/* Low pitch */}
          <div className="text-center p-4 rounded-xl bg-white border border-[#E2E8F0]">
            <div className="text-[2.5rem] mb-2">🦁</div>
            <div className="font-extrabold text-yellow text-sm mb-2">LOW PITCH</div>
            {/* Slow wide waves */}
            <svg viewBox="0 0 120 30" className="w-full h-8 mb-2">
              <path
                d="M0,15 Q15,0 30,15 T60,15 T90,15 T120,15"
                fill="none"
                stroke="#D97706"
                strokeWidth="3"
                className="animate-beamPulse"
              />
            </svg>
            <p className="text-[0.72rem] text-text-dim font-semibold">Large objects<br/>Vibrate SLOWLY</p>
          </div>
        </div>
      </div>

      <Legend items={[
        { color: '#7C3AED', label: 'High pitch — fast, tight waves' },
        { color: '#D97706', label: 'Low pitch — slow, wide waves' },
      ]} />
    </div>
  )
}

/* ═══════════════════════════════════════
   SOUND TRAVEL — Through solids/liquids/gases
═══════════════════════════════════════ */
function SoundTravelDemo() {
  return (
    <div>
      <div
        className="rounded-[10px] border border-[#E2E8F0] p-5"
        style={{ background: '#FFFBEB' }}
      >
        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-3">
          {[
            { emoji: '🧱', label: 'Through a Solid', bg: '#FEF3C7', border: '#D97706', desc: 'e.g. Knock on a door', icon: '🚪' },
            { emoji: '💧', label: 'Through a Liquid', bg: '#CFFAFE', border: '#0891B2', desc: 'e.g. Whales underwater', icon: '🐋' },
            { emoji: '💨', label: 'Through a Gas', bg: '#EFF6FF', border: '#2563EB', desc: 'e.g. Talking through air', icon: '🗣️' },
          ].map((item, i) => (
            <div
              key={i}
              className="text-center p-4 rounded-xl border-2"
              style={{ background: item.bg, borderColor: item.border }}
            >
              <div className="text-[2rem] mb-1">{item.emoji}</div>
              <div className="font-extrabold text-[0.82rem] text-text mb-1">{item.label}</div>
              <div className="text-[1.5rem] mb-1">{item.icon}</div>
              <p className="text-[0.72rem] text-text-dim font-semibold">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Legend items={[
        { color: '#D97706', label: 'Solids' },
        { color: '#0891B2', label: 'Liquids' },
        { color: '#2563EB', label: 'Gases' },
      ]} />
    </div>
  )
}

/* ═══════════════════════════════════════
   LEGEND — colored dots with labels
═══════════════════════════════════════ */
function Legend({ items }: { items: { color: string; label: string }[] }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-2.5">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-[5px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[20px] px-2.5 py-1 text-[0.72rem] font-bold text-text-dim"
        >
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: item.color }}
          />
          {item.label}
        </div>
      ))}
    </div>
  )
}
