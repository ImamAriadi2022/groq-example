import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Message } from '../../types'

interface ChatBubbleProps {
  message: Message
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} px-6`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'rounded-br-sm bg-[#2563EB] text-white'
            : 'rounded-bl-sm bg-[#1E293B] text-gray-200'
        }`}
      >
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children, ...props }) {
              const isInline = !className
              if (isInline) {
                return (
                  <code
                    className="rounded bg-[#0F172A] px-1 py-0.5 text-sm"
                    {...props}
                  >
                    {children}
                  </code>
                )
              }
              return (
                <pre className="mt-2 overflow-x-auto rounded-lg bg-[#0F172A] p-4 text-sm">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              )
            },
            ul({ children }) {
              return <ul className="list-disc pl-5">{children}</ul>
            },
            ol({ children }) {
              return <ol className="list-decimal pl-5">{children}</ol>
            },
          }}
        >
          {message.content}
        </Markdown>
      </div>
    </div>
  )
}
