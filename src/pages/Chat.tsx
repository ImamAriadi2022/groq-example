import { useEffect, useRef } from 'react'
import { ChatHeader } from '../components/chat/ChatHeader'
import { ChatBubble } from '../components/chat/ChatBubble'
import { ChatInput } from '../components/chat/ChatInput'
import { PromptCounter } from '../components/chat/PromptCounter'
import { LoadingBubble } from '../components/chat/LoadingBubble'
import { MainLayout } from '../layout/MainLayout'
import { useAuth } from '../hooks/useAuth'
import { useChat } from '../hooks/useChat'
import { usePromptLimit } from '../hooks/usePromptLimit'

export function Chat() {
  const { logout, checkAuth } = useAuth()
  const { messages, loading, send } = useChat()
  const { isExceeded } = usePromptLimit()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <MainLayout>
      <ChatHeader onLogout={logout} />
      <PromptCounter />
      <div className="flex-1 space-y-4 overflow-y-auto py-6">
        {messages.map((msg, i) => (
          <ChatBubble key={i} message={msg} />
        ))}
        {loading && messages[messages.length - 1]?.content === '' && <LoadingBubble />}
        <div ref={bottomRef} />
      </div>
      <ChatInput onSend={send} disabled={isExceeded} loading={loading} />
    </MainLayout>
  )
}
