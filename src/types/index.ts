export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface PromptLimit {
  date: string
  count: number
}
