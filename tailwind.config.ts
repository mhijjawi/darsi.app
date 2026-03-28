import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F4F6FB',
        'sidebar-bg': '#FFFFFF',
        card: '#FFFFFF',
        card2: '#F8FAFC',
        border: '#E2E8F0',
        blue: '#2563EB',
        'blue-dim': '#DBEAFE',
        green: '#16A34A',
        'green-dim': '#DCFCE7',
        yellow: '#D97706',
        'yellow-dim': '#FEF3C7',
        coral: '#EA580C',
        'coral-dim': '#FFEDD5',
        purple: '#7C3AED',
        'purple-dim': '#EDE9FE',
        teal: '#0891B2',
        'teal-dim': '#CFFAFE',
        pink: '#DB2777',
        text: '#1E293B',
        'text-dim': '#64748B',
        'text-dimmer': '#94A3B8',
      },
      fontFamily: {
        display: ["'Baloo 2'", 'cursive'],
        body: ["'Nunito'", 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '16px',
        sm: '10px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.08)',
        'glow-blue': '0 0 20px rgba(37,99,235,0.15)',
        'glow-green': '0 0 20px rgba(22,163,74,0.15)',
        'glow-yellow': '0 0 20px rgba(217,119,6,0.15)',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSrc: {
          '0%, 100%': { boxShadow: '0 0 20px #FFB300, 0 0 40px rgba(255,179,0,0.4)' },
          '50%': { boxShadow: '0 0 30px #FFB300, 0 0 60px rgba(255,179,0,0.6)' },
        },
        'pulse-src': {
          '0%, 100%': { boxShadow: '0 0 20px #FFB300, 0 0 40px rgba(255,179,0,0.4)' },
          '50%': { boxShadow: '0 0 30px #FFB300, 0 0 60px rgba(255,179,0,0.6)' },
        },
        beamPulse: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        'beam-pulse': {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        glassShimmer: {
          '0%, 100%': { borderColor: 'rgba(100,200,255,0.4)', boxShadow: '0 0 16px rgba(100,200,255,0.3)' },
          '50%': { borderColor: 'rgba(150,220,255,0.8)', boxShadow: '0 0 24px rgba(100,200,255,0.5)' },
        },
        'glass-shimmer': {
          '0%, 100%': { borderColor: 'rgba(100,200,255,0.4)', boxShadow: '0 0 16px rgba(100,200,255,0.3)' },
          '50%': { borderColor: 'rgba(150,220,255,0.8)', boxShadow: '0 0 24px rgba(100,200,255,0.5)' },
        },
        shadowBreathe: {
          '0%, 100%': { opacity: '0.9' },
          '50%': { opacity: '0.7' },
        },
        'shadow-breathe': {
          '0%, 100%': { opacity: '0.9' },
          '50%': { opacity: '0.7' },
        },
        bounce: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-14px)' },
        },
        personSway: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        'person-sway': {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        growBeam: {
          '0%, 100%': { width: '40px', opacity: '0.6' },
          '50%': { width: '60px', opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        checkPop: {
          '0%, 100%': { transform: 'translateY(-50%) scale(1)' },
          '50%': { transform: 'translateY(-50%) scale(1.2)' },
        },
        prismGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 16px rgba(150,150,255,0.4))' },
          '50%': { filter: 'drop-shadow(0 0 28px rgba(150,150,255,0.7))' },
        },
        shadowShift: {
          '0%, 100%': { transform: 'translateX(-50%) skewX(20deg) scaleX(3)' },
          '50%': { transform: 'translateX(-50%) skewX(15deg) scaleX(2.5)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.35s ease',
        pulseSrc: 'pulseSrc 2s ease-in-out infinite',
        beamPulse: 'beamPulse 2s ease-in-out infinite',
        glassShimmer: 'glassShimmer 3s ease-in-out infinite',
        shadowBreathe: 'shadowBreathe 3s ease-in-out infinite',
        bounce: 'bounce 1s ease-in-out infinite alternate',
        personSway: 'personSway 4s ease-in-out infinite',
        growBeam: 'growBeam 2s ease-in-out infinite',
        blink: 'blink 1.5s ease-in-out infinite',
        checkPop: 'checkPop 1.5s ease-in-out infinite',
        prismGlow: 'prismGlow 3s ease-in-out infinite',
        shadowShift: 'shadowShift 4s ease-in-out infinite',
        shake: 'shake 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
