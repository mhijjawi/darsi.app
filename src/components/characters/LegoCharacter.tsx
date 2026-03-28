'use client';

import React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CharacterVariant =
  | 'scientist'
  | 'explorer'
  | 'ninja'
  | 'sunny'
  | 'frost'
  | 'coral'
  | 'galaxy'
  | 'robot';

type CharacterSize = 'sm' | 'md' | 'lg';

interface LegoCharacterProps {
  variant: string;
  size?: CharacterSize;
  className?: string;
}

interface CharacterBubbleProps {
  variant: string;
  message: string;
  side?: 'left' | 'right';
  className?: string;
}

// ---------------------------------------------------------------------------
// Size presets — width, height, and proportional scale factor
// ---------------------------------------------------------------------------

const SIZES: Record<CharacterSize, { w: number; h: number; s: number }> = {
  sm: { w: 32, h: 44, s: 0.5 },
  md: { w: 48, h: 66, s: 0.75 },
  lg: { w: 64, h: 88, s: 1 },
};

// ---------------------------------------------------------------------------
// Variant colour palettes & accessory definitions
// ---------------------------------------------------------------------------

interface VariantDef {
  body: string;
  bodyDark: string;
  face: string;
  hatColor: string;
  hatType: 'goggles' | 'adventureHat' | 'hood' | 'visor' | 'iceHelmet' | 'capBack' | 'hair' | 'antenna';
  eyeStyle: 'normal' | 'goggles' | 'visor' | 'cool' | 'big' | 'redVisor';
  mouthStyle: 'smile' | 'grin' | 'flat' | 'o' | 'smirk';
  chestDetail?: { type: 'pocket' | 'star' | 'belt' | 'bolt' | 'snowflake' | 'stripe' | 'none'; color: string };
  armColor: string;
}

const VARIANTS: Record<string, VariantDef> = {
  scientist: {
    body: '#2563EB',
    bodyDark: '#1D4ED8',
    face: '#FBBF24',
    hatColor: '#FBBF24',
    hatType: 'goggles',
    eyeStyle: 'normal',
    mouthStyle: 'smile',
    chestDetail: { type: 'pocket', color: '#93C5FD' },
    armColor: '#2563EB',
  },
  explorer: {
    body: '#16A34A',
    bodyDark: '#15803D',
    face: '#FBBF24',
    hatColor: '#8B5E3C',
    hatType: 'adventureHat',
    eyeStyle: 'big',
    mouthStyle: 'grin',
    chestDetail: { type: 'belt', color: '#713F12' },
    armColor: '#16A34A',
  },
  ninja: {
    body: '#7C3AED',
    bodyDark: '#6D28D9',
    face: '#FDE68A',
    hatColor: '#1E1B4B',
    hatType: 'hood',
    eyeStyle: 'cool',
    mouthStyle: 'flat',
    chestDetail: { type: 'belt', color: '#4C1D95' },
    armColor: '#6D28D9',
  },
  sunny: {
    body: '#D97706',
    bodyDark: '#B45309',
    face: '#FBBF24',
    hatColor: '#EA580C',
    hatType: 'visor',
    eyeStyle: 'normal',
    mouthStyle: 'grin',
    chestDetail: { type: 'stripe', color: '#FCD34D' },
    armColor: '#D97706',
  },
  frost: {
    body: '#0891B2',
    bodyDark: '#0E7490',
    face: '#E0F2FE',
    hatColor: '#F0F9FF',
    hatType: 'iceHelmet',
    eyeStyle: 'normal',
    mouthStyle: 'smile',
    chestDetail: { type: 'snowflake', color: '#BAE6FD' },
    armColor: '#0891B2',
  },
  coral: {
    body: '#EA580C',
    bodyDark: '#C2410C',
    face: '#FBBF24',
    hatColor: '#DC2626',
    hatType: 'capBack',
    eyeStyle: 'cool',
    mouthStyle: 'smirk',
    chestDetail: { type: 'stripe', color: '#FED7AA' },
    armColor: '#EA580C',
  },
  galaxy: {
    body: '#DB2777',
    bodyDark: '#BE185D',
    face: '#FDE68A',
    hatColor: '#EC4899',
    hatType: 'hair',
    eyeStyle: 'big',
    mouthStyle: 'smile',
    chestDetail: { type: 'star', color: '#FDE68A' },
    armColor: '#DB2777',
  },
  robot: {
    body: '#64748B',
    bodyDark: '#475569',
    face: '#CBD5E1',
    hatColor: '#94A3B8',
    hatType: 'antenna',
    eyeStyle: 'redVisor',
    mouthStyle: 'flat',
    chestDetail: { type: 'bolt', color: '#FBBF24' },
    armColor: '#64748B',
  },
};

// ---------------------------------------------------------------------------
// Helpers – all measurements are based on the "lg" reference (64 x 88)
// then scaled down for md/sm via the `s` factor.
// ---------------------------------------------------------------------------

function px(base: number, scale: number) {
  return Math.round(base * scale);
}

// ---------------------------------------------------------------------------
// Sub-components (rendered inside the character container)
// ---------------------------------------------------------------------------

function Hat({ def, s }: { def: VariantDef; s: number }) {
  switch (def.hatType) {
    case 'goggles':
      return (
        <>
          {/* Strap */}
          <div
            className="absolute"
            style={{
              top: px(9, s),
              left: px(10, s),
              width: px(44, s),
              height: px(6, s),
              background: '#A3A3A3',
              borderRadius: px(2, s),
            }}
          />
          {/* Left lens */}
          <div
            className="absolute"
            style={{
              top: px(6, s),
              left: px(12, s),
              width: px(14, s),
              height: px(12, s),
              background: def.hatColor,
              borderRadius: px(4, s),
              border: `${px(2, s)}px solid #A3A3A3`,
            }}
          />
          {/* Right lens */}
          <div
            className="absolute"
            style={{
              top: px(6, s),
              left: px(36, s),
              width: px(14, s),
              height: px(12, s),
              background: def.hatColor,
              borderRadius: px(4, s),
              border: `${px(2, s)}px solid #A3A3A3`,
            }}
          />
        </>
      );
    case 'adventureHat':
      return (
        <>
          {/* Brim */}
          <div
            className="absolute"
            style={{
              top: px(12, s),
              left: px(4, s),
              width: px(56, s),
              height: px(6, s),
              background: def.hatColor,
              borderRadius: px(3, s),
            }}
          />
          {/* Crown */}
          <div
            className="absolute"
            style={{
              top: px(2, s),
              left: px(14, s),
              width: px(36, s),
              height: px(14, s),
              background: def.hatColor,
              borderRadius: `${px(4, s)}px ${px(4, s)}px ${px(2, s)}px ${px(2, s)}px`,
            }}
          />
          {/* Band */}
          <div
            className="absolute"
            style={{
              top: px(10, s),
              left: px(14, s),
              width: px(36, s),
              height: px(4, s),
              background: '#713F12',
              borderRadius: px(1, s),
            }}
          />
        </>
      );
    case 'hood':
      return (
        <div
          className="absolute"
          style={{
            top: px(4, s),
            left: px(8, s),
            width: px(48, s),
            height: px(26, s),
            background: def.hatColor,
            borderRadius: `${px(10, s)}px ${px(10, s)}px ${px(4, s)}px ${px(4, s)}px`,
          }}
        />
      );
    case 'visor':
      return (
        <>
          {/* Cap top */}
          <div
            className="absolute"
            style={{
              top: px(6, s),
              left: px(10, s),
              width: px(44, s),
              height: px(14, s),
              background: def.hatColor,
              borderRadius: `${px(6, s)}px ${px(6, s)}px 0 0`,
            }}
          />
          {/* Visor brim */}
          <div
            className="absolute"
            style={{
              top: px(16, s),
              left: px(6, s),
              width: px(32, s),
              height: px(5, s),
              background: def.hatColor,
              borderRadius: `0 0 ${px(3, s)}px ${px(3, s)}px`,
            }}
          />
        </>
      );
    case 'iceHelmet':
      return (
        <div
          className="absolute"
          style={{
            top: px(3, s),
            left: px(10, s),
            width: px(44, s),
            height: px(18, s),
            background: def.hatColor,
            borderRadius: `${px(8, s)}px ${px(8, s)}px ${px(2, s)}px ${px(2, s)}px`,
            border: `${px(2, s)}px solid #BAE6FD`,
          }}
        />
      );
    case 'capBack':
      return (
        <>
          {/* Cap */}
          <div
            className="absolute"
            style={{
              top: px(6, s),
              left: px(10, s),
              width: px(44, s),
              height: px(14, s),
              background: def.hatColor,
              borderRadius: `${px(6, s)}px ${px(6, s)}px 0 0`,
            }}
          />
          {/* Backwards brim */}
          <div
            className="absolute"
            style={{
              top: px(16, s),
              left: px(30, s),
              width: px(28, s),
              height: px(5, s),
              background: def.hatColor,
              borderRadius: `0 0 ${px(3, s)}px ${px(3, s)}px`,
            }}
          />
        </>
      );
    case 'hair':
      return (
        <>
          {/* Spiky / flowing hair */}
          <div
            className="absolute"
            style={{
              top: px(2, s),
              left: px(10, s),
              width: px(44, s),
              height: px(16, s),
              background: def.hatColor,
              borderRadius: `${px(8, s)}px ${px(8, s)}px ${px(2, s)}px ${px(2, s)}px`,
            }}
          />
          {/* Side tuft */}
          <div
            className="absolute"
            style={{
              top: px(6, s),
              left: px(48, s),
              width: px(10, s),
              height: px(12, s),
              background: def.hatColor,
              borderRadius: `0 ${px(6, s)}px ${px(6, s)}px 0`,
            }}
          />
        </>
      );
    case 'antenna':
      return (
        <>
          {/* Helmet dome */}
          <div
            className="absolute"
            style={{
              top: px(5, s),
              left: px(10, s),
              width: px(44, s),
              height: px(16, s),
              background: def.hatColor,
              borderRadius: `${px(8, s)}px ${px(8, s)}px ${px(2, s)}px ${px(2, s)}px`,
            }}
          />
          {/* Antenna stick */}
          <div
            className="absolute"
            style={{
              top: 0,
              left: px(30, s),
              width: px(3, s),
              height: px(8, s),
              background: '#94A3B8',
              borderRadius: px(1, s),
            }}
          />
          {/* Antenna ball */}
          <div
            className="absolute"
            style={{
              top: 0,
              left: px(28, s),
              width: px(7, s),
              height: px(7, s),
              background: '#EF4444',
              borderRadius: '50%',
            }}
          />
        </>
      );
    default:
      return null;
  }
}

function Eyes({ def, s }: { def: VariantDef; s: number }) {
  const headLeft = px(12, s);
  const headWidth = px(40, s);
  const headTop = px(18, s);

  switch (def.eyeStyle) {
    case 'normal':
      return (
        <>
          {/* Left eye */}
          <div
            className="absolute"
            style={{
              top: headTop + px(8, s),
              left: headLeft + px(8, s),
              width: px(6, s),
              height: px(7, s),
              background: '#1E293B',
              borderRadius: px(2, s),
            }}
          />
          {/* Right eye */}
          <div
            className="absolute"
            style={{
              top: headTop + px(8, s),
              left: headLeft + headWidth - px(14, s),
              width: px(6, s),
              height: px(7, s),
              background: '#1E293B',
              borderRadius: px(2, s),
            }}
          />
        </>
      );
    case 'goggles':
      return (
        <>
          <div
            className="absolute"
            style={{
              top: headTop + px(8, s),
              left: headLeft + px(7, s),
              width: px(8, s),
              height: px(8, s),
              background: '#1E293B',
              borderRadius: '50%',
            }}
          />
          <div
            className="absolute"
            style={{
              top: headTop + px(8, s),
              left: headLeft + headWidth - px(15, s),
              width: px(8, s),
              height: px(8, s),
              background: '#1E293B',
              borderRadius: '50%',
            }}
          />
        </>
      );
    case 'visor':
      return (
        <div
          className="absolute"
          style={{
            top: headTop + px(8, s),
            left: headLeft + px(6, s),
            width: headWidth - px(12, s),
            height: px(6, s),
            background: 'rgba(30,41,59,0.8)',
            borderRadius: px(2, s),
          }}
        />
      );
    case 'cool':
      return (
        <>
          {/* Left eye - slight angle */}
          <div
            className="absolute"
            style={{
              top: headTop + px(8, s),
              left: headLeft + px(7, s),
              width: px(8, s),
              height: px(5, s),
              background: '#1E293B',
              borderRadius: px(2, s),
            }}
          />
          {/* Right eye */}
          <div
            className="absolute"
            style={{
              top: headTop + px(8, s),
              left: headLeft + headWidth - px(15, s),
              width: px(8, s),
              height: px(5, s),
              background: '#1E293B',
              borderRadius: px(2, s),
            }}
          />
        </>
      );
    case 'big':
      return (
        <>
          {/* Left eye - big round */}
          <div
            className="absolute"
            style={{
              top: headTop + px(7, s),
              left: headLeft + px(6, s),
              width: px(10, s),
              height: px(10, s),
              background: '#FFFFFF',
              borderRadius: '50%',
              border: `${px(2, s)}px solid #1E293B`,
            }}
          />
          {/* Left pupil */}
          <div
            className="absolute"
            style={{
              top: headTop + px(10, s),
              left: headLeft + px(10, s),
              width: px(4, s),
              height: px(4, s),
              background: '#1E293B',
              borderRadius: '50%',
            }}
          />
          {/* Right eye - big round */}
          <div
            className="absolute"
            style={{
              top: headTop + px(7, s),
              left: headLeft + headWidth - px(16, s),
              width: px(10, s),
              height: px(10, s),
              background: '#FFFFFF',
              borderRadius: '50%',
              border: `${px(2, s)}px solid #1E293B`,
            }}
          />
          {/* Right pupil */}
          <div
            className="absolute"
            style={{
              top: headTop + px(10, s),
              left: headLeft + headWidth - px(12, s),
              width: px(4, s),
              height: px(4, s),
              background: '#1E293B',
              borderRadius: '50%',
            }}
          />
        </>
      );
    case 'redVisor':
      return (
        <div
          className="absolute"
          style={{
            top: headTop + px(8, s),
            left: headLeft + px(5, s),
            width: headWidth - px(10, s),
            height: px(6, s),
            background: '#EF4444',
            borderRadius: px(2, s),
            boxShadow: `0 0 ${px(4, s)}px rgba(239,68,68,0.5)`,
          }}
        />
      );
    default:
      return null;
  }
}

function Mouth({ def, s }: { def: VariantDef; s: number }) {
  const headLeft = px(12, s);
  const headWidth = px(40, s);
  const headTop = px(18, s);
  const mouthTop = headTop + px(18, s);
  const centerX = headLeft + headWidth / 2;

  switch (def.mouthStyle) {
    case 'smile':
      return (
        <div
          className="absolute"
          style={{
            top: mouthTop,
            left: centerX - px(6, s),
            width: px(12, s),
            height: px(6, s),
            borderBottom: `${px(2, s)}px solid #1E293B`,
            borderLeft: `${px(2, s)}px solid #1E293B`,
            borderRight: `${px(2, s)}px solid #1E293B`,
            borderRadius: `0 0 ${px(6, s)}px ${px(6, s)}px`,
          }}
        />
      );
    case 'grin':
      return (
        <div
          className="absolute"
          style={{
            top: mouthTop,
            left: centerX - px(8, s),
            width: px(16, s),
            height: px(7, s),
            background: '#1E293B',
            borderRadius: `0 0 ${px(8, s)}px ${px(8, s)}px`,
          }}
        >
          {/* Teeth */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: px(3, s),
              width: px(10, s),
              height: px(3, s),
              background: '#FFFFFF',
              borderRadius: `0 0 ${px(2, s)}px ${px(2, s)}px`,
            }}
          />
        </div>
      );
    case 'flat':
      return (
        <div
          className="absolute"
          style={{
            top: mouthTop + px(2, s),
            left: centerX - px(5, s),
            width: px(10, s),
            height: px(2, s),
            background: '#1E293B',
            borderRadius: px(1, s),
          }}
        />
      );
    case 'o':
      return (
        <div
          className="absolute"
          style={{
            top: mouthTop,
            left: centerX - px(4, s),
            width: px(8, s),
            height: px(8, s),
            border: `${px(2, s)}px solid #1E293B`,
            borderRadius: '50%',
          }}
        />
      );
    case 'smirk':
      return (
        <div
          className="absolute"
          style={{
            top: mouthTop,
            left: centerX - px(2, s),
            width: px(10, s),
            height: px(5, s),
            borderBottom: `${px(2, s)}px solid #1E293B`,
            borderRight: `${px(2, s)}px solid #1E293B`,
            borderRadius: `0 0 ${px(5, s)}px 0`,
          }}
        />
      );
    default:
      return null;
  }
}

function ChestDetail({ def, s }: { def: VariantDef; s: number }) {
  if (!def.chestDetail || def.chestDetail.type === 'none') return null;

  const bodyTop = px(46, s);
  const bodyLeft = px(10, s);
  const bodyWidth = px(44, s);
  const centerX = bodyLeft + bodyWidth / 2;

  switch (def.chestDetail.type) {
    case 'pocket':
      return (
        <div
          className="absolute"
          style={{
            top: bodyTop + px(4, s),
            left: bodyLeft + px(4, s),
            width: px(10, s),
            height: px(8, s),
            border: `${px(1, s)}px solid ${def.chestDetail.color}`,
            borderRadius: px(2, s),
          }}
        />
      );
    case 'star':
      return (
        <div
          className="absolute"
          style={{
            top: bodyTop + px(5, s),
            left: centerX - px(5, s),
            width: px(10, s),
            height: px(10, s),
            fontSize: px(10, s),
            lineHeight: 1,
            color: def.chestDetail.color,
          }}
        >
          ★
        </div>
      );
    case 'belt':
      return (
        <div
          className="absolute"
          style={{
            top: bodyTop + px(24, s),
            left: bodyLeft,
            width: bodyWidth,
            height: px(4, s),
            background: def.chestDetail.color,
            borderRadius: px(1, s),
          }}
        />
      );
    case 'bolt':
      return (
        <div
          className="absolute"
          style={{
            top: bodyTop + px(4, s),
            left: centerX - px(5, s),
            width: px(10, s),
            height: px(10, s),
            fontSize: px(10, s),
            lineHeight: 1,
            color: def.chestDetail.color,
          }}
        >
          ⚡
        </div>
      );
    case 'snowflake':
      return (
        <div
          className="absolute"
          style={{
            top: bodyTop + px(4, s),
            left: centerX - px(5, s),
            width: px(10, s),
            height: px(10, s),
            fontSize: px(10, s),
            lineHeight: 1,
            color: def.chestDetail.color,
          }}
        >
          ❄
        </div>
      );
    case 'stripe':
      return (
        <div
          className="absolute"
          style={{
            top: bodyTop + px(10, s),
            left: bodyLeft + px(2, s),
            width: bodyWidth - px(4, s),
            height: px(4, s),
            background: def.chestDetail.color,
            borderRadius: px(1, s),
            opacity: 0.6,
          }}
        />
      );
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// LegoCharacter
// ---------------------------------------------------------------------------

export function LegoCharacter({
  variant,
  size = 'md',
  className = '',
}: LegoCharacterProps) {
  const { w, h, s } = SIZES[size] ?? SIZES.md;
  const def = VARIANTS[variant as CharacterVariant] ?? VARIANTS.scientist;

  return (
    <div
      className={`relative inline-block flex-shrink-0 ${className}`}
      style={{ width: w, height: h }}
      aria-hidden="true"
    >
      {/* ---- Hat / helmet ---- */}
      <Hat def={def} s={s} />

      {/* ---- Head ---- */}
      <div
        className="absolute"
        style={{
          top: px(18, s),
          left: px(12, s),
          width: px(40, s),
          height: px(28, s),
          background: def.face,
          borderRadius: px(5, s),
        }}
      />

      {/* ---- Eyes ---- */}
      <Eyes def={def} s={s} />

      {/* ---- Mouth ---- */}
      <Mouth def={def} s={s} />

      {/* ---- Body / torso ---- */}
      <div
        className="absolute"
        style={{
          top: px(46, s),
          left: px(10, s),
          width: px(44, s),
          height: px(30, s),
          background: def.body,
          borderRadius: `0 0 ${px(4, s)}px ${px(4, s)}px`,
        }}
      />

      {/* ---- Torso top (connects head to body) ---- */}
      <div
        className="absolute"
        style={{
          top: px(42, s),
          left: px(18, s),
          width: px(28, s),
          height: px(8, s),
          background: def.body,
          borderRadius: `${px(2, s)}px ${px(2, s)}px 0 0`,
        }}
      />

      {/* ---- Chest detail ---- */}
      <ChestDetail def={def} s={s} />

      {/* ---- Left arm (C-shaped) ---- */}
      <div
        className="absolute"
        style={{
          top: px(48, s),
          left: px(2, s),
          width: px(10, s),
          height: px(22, s),
          background: def.armColor,
          borderRadius: `${px(3, s)}px 0 0 ${px(5, s)}px`,
        }}
      />
      {/* Left hand (C-clamp) */}
      <div
        className="absolute"
        style={{
          top: px(66, s),
          left: px(1, s),
          width: px(8, s),
          height: px(8, s),
          background: def.face,
          borderRadius: `${px(4, s)}px 0 0 ${px(4, s)}px`,
          border: `${px(2, s)}px solid ${def.face}`,
          borderRight: 'none',
        }}
      />

      {/* ---- Right arm (C-shaped) ---- */}
      <div
        className="absolute"
        style={{
          top: px(48, s),
          left: px(52, s),
          width: px(10, s),
          height: px(22, s),
          background: def.armColor,
          borderRadius: `0 ${px(3, s)}px ${px(5, s)}px 0`,
        }}
      />
      {/* Right hand (C-clamp) */}
      <div
        className="absolute"
        style={{
          top: px(66, s),
          left: px(55, s),
          width: px(8, s),
          height: px(8, s),
          background: def.face,
          borderRadius: `0 ${px(4, s)}px ${px(4, s)}px 0`,
          border: `${px(2, s)}px solid ${def.face}`,
          borderLeft: 'none',
        }}
      />

      {/* ---- Legs ---- */}
      <div
        className="absolute"
        style={{
          top: px(74, s),
          left: px(12, s),
          width: px(18, s),
          height: px(14, s),
          background: def.bodyDark,
          borderRadius: `0 0 ${px(3, s)}px ${px(3, s)}px`,
        }}
      />
      <div
        className="absolute"
        style={{
          top: px(74, s),
          left: px(34, s),
          width: px(18, s),
          height: px(14, s),
          background: def.bodyDark,
          borderRadius: `0 0 ${px(3, s)}px ${px(3, s)}px`,
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// CharacterBubble
// ---------------------------------------------------------------------------

export function CharacterBubble({
  variant,
  message,
  side = 'left',
  className = '',
}: CharacterBubbleProps) {
  const isLeft = side === 'left';

  return (
    <div
      className={`flex items-start gap-2 ${isLeft ? 'flex-row' : 'flex-row-reverse'} ${className}`}
    >
      <LegoCharacter variant={variant} size="sm" />

      {/* Speech bubble */}
      <div className="relative max-w-[280px]">
        {/* Triangle pointer */}
        <div
          className="absolute top-3"
          style={{
            [isLeft ? 'left' : 'right']: -6,
            width: 0,
            height: 0,
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            ...(isLeft
              ? { borderRight: '6px solid #E2E8F0' }
              : { borderLeft: '6px solid #E2E8F0' }),
          }}
        />
        <div
          className="absolute top-3"
          style={{
            [isLeft ? 'left' : 'right']: -4,
            width: 0,
            height: 0,
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            ...(isLeft
              ? { borderRight: '6px solid #FFFFFF' }
              : { borderLeft: '6px solid #FFFFFF' }),
          }}
        />

        <div
          className="rounded-[12px] border border-[#E2E8F0] bg-white px-3 py-2"
          style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1E293B' }}
        >
          {message}
        </div>
      </div>
    </div>
  );
}

export default LegoCharacter;
