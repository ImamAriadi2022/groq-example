import type { PromptLimit } from '../types'

const PROMPT_KEY = 'prompt_limit'

function getToday(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function getPromptLimit(): PromptLimit {
  const data = localStorage.getItem(PROMPT_KEY)
  if (!data) return { date: getToday(), count: 0 }
  try {
    return JSON.parse(data) as PromptLimit
  } catch {
    return { date: getToday(), count: 0 }
  }
}

export function savePromptLimit(limit: PromptLimit): void {
  localStorage.setItem(PROMPT_KEY, JSON.stringify(limit))
}

export function resetPromptLimit(): void {
  savePromptLimit({ date: getToday(), count: 0 })
}
