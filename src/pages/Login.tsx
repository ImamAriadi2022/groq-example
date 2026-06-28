import { LoginCard } from '../components/auth/LoginCard'
import { useAuth } from '../hooks/useAuth'

export function Login() {
  const { login, error, setError } = useAuth()

  return <LoginCard onLogin={login} error={error} setError={setError} />
}
