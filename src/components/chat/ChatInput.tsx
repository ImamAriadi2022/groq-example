import { type FormEvent, useRef } from 'react'
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled: boolean
  loading: boolean
}

export function ChatInput({ onSend, disabled, loading }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const textarea = textareaRef.current
    if (!textarea || !textarea.value.trim()) return
    onSend(textarea.value.trim())
    textarea.value = ''
    textarea.style.height = 'auto'
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  function handleInput() {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 border-t border-[#334155] px-6 py-4"
    >
      <textarea
        ref={textareaRef}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={disabled ? 'Daily Prompt Limit Reached' : 'Type your message...'}
        disabled={disabled || loading}
        rows={1}
        className="max-h-[120px] min-h-[44px] flex-1 resize-none rounded-lg border border-[#334155] bg-[#1E293B] px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-[#2563EB] disabled:cursor-not-allowed disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={disabled || loading}
        className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-lg bg-[#2563EB] text-white transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={18} />
      </button>
    </form>
  )
}
