import { useCallback, useSyncExternalStore } from 'react'
import { MAX_PROMPT } from '../config/env'
import { getPromptLimit, savePromptLimit, resetPromptLimit } from '../storage/prompt'

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

function getSnapshot() {
  return getPromptLimit()
}

export function usePromptLimit() {
  const limit = useSyncExternalStore(subscribe, getSnapshot)

  const increase = useCallback(() => {
    const current = getPromptLimit()
    const today = new Date()
    const y = today.getFullYear()
    const m = String(today.getMonth() + 1).padStart(2, '0')
    const d = String(today.getDate()).padStart(2, '0')
    const todayStr = `${y}-${m}-${d}`

    if (current.date !== todayStr) {
      resetPromptLimit()
      savePromptLimit({ date: todayStr, count: 1 })
    } else {
      savePromptLimit({ date: current.date, count: current.count + 1 })
    }
  }, [])

  const remaining = MAX_PROMPT - limit.count
  const isExceeded = limit.count >= MAX_PROMPT

  return { count: limit.count, remaining, isExceeded, increase }
}
