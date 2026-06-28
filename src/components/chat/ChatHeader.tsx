import { LogOut } from 'lucide-react'

interface ChatHeaderProps {
  onLogout: () => void
}

export function ChatHeader({ onLogout }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-[#334155] px-6 py-4">
      <h1 className="text-xl font-bold text-white">AI Chat</h1>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-400 transition hover:bg-[#334155] hover:text-white"
      >
        <LogOut size={18} />
        Logout
      </button>
    </header>
  )
}
