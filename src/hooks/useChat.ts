import { useCallback, useState } from 'react'
import type { Message } from '../types'
import { sendMessage } from '../services/groq'
import { getHistory, saveHistory, clearHistory } from '../storage/history'
import { usePromptLimit } from './usePromptLimit'

export function useChat() {
  const [messages, setMessages] = useState<Message[]>(() => getHistory())
  const [loading, setLoading] = useState(false)
  const { increase, isExceeded } = usePromptLimit()

  const send = useCallback(
    async (content: string) => {
      if (loading || isExceeded) return

      const userMessage: Message = { role: 'user', content }
      const updated = [...messages, userMessage]
      setMessages(updated)
      saveHistory(updated)
      setLoading(true)

      const assistantMessage: Message = { role: 'assistant', content: '' }
      setMessages((prev) => [...prev, assistantMessage])

      try {
        const full = await sendMessage(
          updated.map((m) => ({ role: m.role, content: m.content })),
          (token) => {
            setMessages((prev) => {
              const next = [...prev]
              const last = next[next.length - 1]
              if (last && last.role === 'assistant') {
                next[next.length - 1] = { ...last, content: last.content + token }
              }
              return next
            })
          },
        )

        setMessages((prev) => {
          const next = [...prev]
          next[next.length - 1] = { role: 'assistant', content: full }
          saveHistory(next)
          return next
        })
        increase()
      } catch {
        setMessages((prev) => {
          const next = [...prev]
          next[next.length - 1] = {
            role: 'assistant',
            content: 'Unable to contact AI.\n\nPlease try again.',
          }
          return next
        })
      } finally {
        setLoading(false)
      }
    },
    [messages, loading, isExceeded, increase],
  )

  const clear = useCallback(() => {
    clearHistory()
    setMessages([])
  }, [])

  return { messages, loading, send, clear }
}
