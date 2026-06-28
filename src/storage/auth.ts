const AUTH_KEY = 'auth'

export function saveAuth(): void {
  localStorage.setItem(AUTH_KEY, JSON.stringify({ isLogin: true }))
}

export function clearAuth(): void {
  localStorage.removeItem(AUTH_KEY)
}

export function isAuth(): boolean {
  const data = localStorage.getItem(AUTH_KEY)
  if (!data) return false
  try {
    const parsed = JSON.parse(data)
    return parsed.isLogin === true
  } catch {
    return false
  }
}
