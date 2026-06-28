import Groq from 'groq-sdk'
import type { Message } from '../types'
import { MODEL } from '../config/env'

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
})

export async function sendMessage(
  messages: Message[],
  onToken: (token: string) => void,
): Promise<string> {
  const stream = await groq.chat.completions.create({
    model: MODEL,
    messages,
    temperature: 1,
    stream: true,
  })

  let full = ''
  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content || ''
    full += delta
    onToken(delta)
  }

  return full
}
