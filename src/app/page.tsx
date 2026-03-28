'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { getFirstChapterPath } from '@/lib/chapters'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)
  const { isUnlocked, isLoading, unlock } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isUnlocked) {
      router.replace(`/darsi.app${getFirstChapterPath()}/`)
    }
  }, [isUnlocked, isLoading, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (unlock(password)) {
      router.replace(`/darsi.app${getFirstChapterPath()}/`)
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-bg">
        <div className="text-5xl animate-bounce">🚀</div>
      </div>
    )
  }

  if (isUnlocked) return null

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="font-display text-4xl font-extrabold text-blue mb-2">Darsi</h1>
          <p className="text-text-dim font-semibold text-sm">
            Laith&apos;s Interactive Study World
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div
            className={`bg-card rounded-[16px] border border-border p-8 shadow-card ${
              shaking ? 'animate-shake' : ''
            }`}
          >
            <label className="block text-sm font-bold text-text-dim mb-2">
              🔒 Enter Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              placeholder="Type your password..."
              className="w-full px-4 py-3 rounded-sm border-2 border-border text-base font-semibold text-text bg-card2 outline-none transition-colors focus:border-blue placeholder:text-text-dimmer"
              autoFocus
            />
            {error && (
              <p className="text-[#DC2626] text-sm font-bold mt-2 animate-fadeUp">
                Try again! 🔑
              </p>
            )}
            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-br from-blue to-[#1F6FEB] text-white font-display text-lg font-extrabold py-3.5 rounded-sm border-none cursor-pointer shadow-glow-blue hover:-translate-y-0.5 transition-transform"
            >
              Let&apos;s Go! 🎉
            </button>
          </div>
        </form>

        <p className="text-center text-text-dimmer text-xs font-semibold mt-6">
          Made with ❤️ for Laith
        </p>
      </div>
    </div>
  )
}
