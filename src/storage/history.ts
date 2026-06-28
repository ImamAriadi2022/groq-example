import type { Message } from '../types'

const HISTORY_KEY = 'chat_history'

export function getHistory(): Message[] {
  const data = localStorage.getItem(HISTORY_KEY)
  if (!data) return []
  try {
    return JSON.parse(data) as Message[]
  } catch {
    return []
  }
}

export function saveHistory(messages: Message[]): void {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(messages))
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY)
}
