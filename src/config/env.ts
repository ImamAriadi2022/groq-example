export const EMAIL = import.meta.env.VITE_LOGIN_EMAIL as string
export const PASSWORD = import.meta.env.VITE_LOGIN_PASSWORD as string
export const MODEL = import.meta.env.VITE_MODEL || 'llama-3.3-70b-versatile'
export const MAX_PROMPT = Number(import.meta.env.VITE_MAX_PROMPT_PER_DAY) || 5
