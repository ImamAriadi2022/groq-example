# Arsitektur Chat Bot — Groq + React

## Flow Utama

```
User Input
    ↓
ChatInput (Enter/Shift+Enter)
    ↓
useChat.send()
    ↓
saveHistory() ← simpan pesan user ke localStorage
    ↓
sendMessage() → groq.ts → Groq API (stream: true)
    ↓
for await (chunk) → onToken(delta)
    ↓
update state → ChatBubble render realtime
    ↓
saveHistory() ← simpan full response
    ↓
usePromptLimit.increase() ← counter +1
```

---

## Struktur Kode

```
src/
├── config/
│   └── env.ts              ← Semua dari .env (API_KEY, MODEL, dll)
├── services/
│   └── groq.ts              ← Satu-satunya file yang terhubung ke Groq
├── hooks/
│   ├── useChat.ts           ← State messages, send, clear, loading
│   ├── useAuth.ts           ← Login/logout
│   └── usePromptLimit.ts    ← Counter harian (5 prompt/hari)
├── storage/
│   ├── history.ts           ← Chat history (localStorage)
│   ├── prompt.ts            ← Prompt counter (localStorage)
│   └── auth.ts              ← Status login (localStorage)
├── types/
│   └── index.ts             ← Message, PromptLimit
├── components/
│   ├── chat/
│   │   ├── ChatInput.tsx    ← Textarea + tombol send
│   │   ├── ChatBubble.tsx   ← Bubble dengan markdown
│   │   ├── ChatHeader.tsx   ← Header + logout
│   │   ├── PromptCounter.tsx← "Prompt Today 2/5"
│   │   └── LoadingBubble.tsx← "Thinking..."
│   └── auth/
│       └── LoginCard.tsx    ← Form email/password
├── pages/
│   ├── Chat.tsx             ← Halaman chat utama
│   └── Login.tsx            ← Halaman login
├── layout/
│   └── MainLayout.tsx       ← Container max-w-[900px]
└── App.tsx                  ← Routing (/ → Login, /chat → Chat)
```

---

## Cara Kerja Service Groq

File: `src/services/groq.ts`

```ts
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true, // panggil dari browser langsung
})

export async function sendMessage(
  messages: { role: 'user' | 'assistant'; content: string }[],
  onToken: (token: string) => void   // callback per-chunk
): Promise<string> {
  const stream = await groq.chat.completions.create({
    model: import.meta.env.VITE_MODEL,
    messages,
    stream: true,
  })

  let full = ''
  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content || ''
    full += delta
    onToken(delta) // kirim token ke UI realtime
  }
  return full
}
```

### Cara pakai di project lain:

```ts
import { sendMessage } from './services/groq'

sendMessage(
  [{ role: 'user', content: 'Halo, apa kabar?' }],
  (token) => {
    // token adalah string partial, accumulate sendiri
    console.log(token)
  }
)
```

---

## Cara Kerja Streaming di useChat

File: `src/hooks/useChat.ts`

```
send(prompt)
  ├── setMessages([...prev, {role:"user", content: prompt}])
  ├── saveHistory()
  ├── setLoading(true)
  ├── setMessages([...prev, {role:"assistant", content: ""}]) // bubble kosong
  ├── await sendMessage(messages, (token) => {
  │     setMessages(prev => {
  │       update last message.content += token  ← realtime
  │     })
  │   })
  ├── saveHistory(fullResponse)
  ├── increase() // prompt counter +1
  └── setLoading(false)
```

---

## Environment Variables

```env
VITE_GROQ_API_KEY=your_groq_api_key
VITE_MODEL=llama-3.3-70b-versatile
VITE_LOGIN_EMAIL=email@example.com
VITE_LOGIN_PASSWORD=your_password
VITE_MAX_PROMPT_PER_DAY=5
```

Hanya `VITE_GROQ_API_KEY` dan `VITE_MODEL` yang esensial untuk chat. Sisanya opsional (auth & limit).

---

## Re-pakai untuk Project Lain

1. **Copy** `src/services/groq.ts` → project baru
2. **Install** `groq-sdk`: `npm install groq-sdk`
3. **Buat `.env`** dengan `VITE_GROQ_API_KEY` dan `VITE_MODEL`
4. **Panggil** `sendMessage(messages, onToken)` dari mana saja
5. **Streaming** terjadi otomatis via callback `onToken`

Jika butuh counter harian, copy `src/hooks/usePromptLimit.ts` + `src/storage/prompt.ts` + `src/config/env.ts`.
Jika butuh auth, copy `src/hooks/useAuth.ts` + `src/storage/auth.ts` + `src/config/env.ts`.
