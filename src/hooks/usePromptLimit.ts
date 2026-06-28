import { useCallback, useSyncExternalStore } from 'react'
import { MAX_PROMPT } from '../config/env'
import { getPromptLimit, savePromptLimit } from '../storage/prompt'
import type { PromptLimit } from '../types'

let cached: PromptLimit | null = null

function subscribe(callback: () => void) {
  cached = null
  function handler(e: StorageEvent) {
    if (e.key === 'prompt_limit') cached = null
    callback()
  }
  window.addEventListener('storage', handler)
  return () => window.removeEventListener('storage', handler)
}

function getSnapshot() {
  if (!cached) {
    cached = getPromptLimit()
  }
  return cached
}

function getToday(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function usePromptLimit() {
  const limit = useSyncExternalStore(subscribe, getSnapshot)

  const increase = useCallback(() => {
    const current = getPromptLimit()
    const todayStr = getToday()

    if (current.date !== todayStr) {
      cached = { date: todayStr, count: 1 }
      savePromptLimit(cached)
    } else {
      cached = { date: current.date, count: current.count + 1 }
      savePromptLimit(cached)
    }
  }, [])

  const remaining = MAX_PROMPT - limit.count
  const isExceeded = limit.count >= MAX_PROMPT

  return { count: limit.count, remaining, isExceeded, increase }
}
