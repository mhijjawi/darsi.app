'use client'

import { useState, useEffect, useCallback } from 'react'

const AUTH_KEY = 'darsi_unlocked'
const PASSWORD = 'Laith2017'

export function useAuth() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem(AUTH_KEY)
    setIsUnlocked(stored === 'true')
    setIsLoading(false)
  }, [])

  const unlock = useCallback((password: string): boolean => {
    if (password === PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true')
      setIsUnlocked(true)
      return true
    }
    return false
  }, [])

  return { isUnlocked, isLoading, unlock }
}
