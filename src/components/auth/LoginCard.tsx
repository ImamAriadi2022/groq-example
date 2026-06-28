import { type FormEvent, useState } from 'react'
import { LogIn } from 'lucide-react'

interface LoginCardProps {
  onLogin: (email: string, password: string) => void
  error: string
  setError: (msg: string) => void
}

export function LoginCard({ onLogin, error, setError }: LoginCardProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    onLogin(email, password)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F172A] px-4">
      <div className="w-full max-w-sm rounded-xl border border-[#334155] bg-[#1E293B] p-8">
        <h1 className="mb-6 text-center text-2xl font-bold text-white">AI Chat</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-400" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[#334155] bg-[#0F172A] px-4 py-2 text-white outline-none focus:border-[#2563EB]"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-400" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[#334155] bg-[#0F172A] px-4 py-2 text-white outline-none focus:border-[#2563EB]"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2 font-semibold text-white transition hover:bg-[#1d4ed8]"
          >
            <LogIn size={18} />
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
