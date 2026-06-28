import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EMAIL, PASSWORD } from '../config/env'
import { saveAuth, clearAuth, isAuth } from '../storage/auth'

export function useAuth() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const login = useCallback(
    (email: string, password: string) => {
      if (email === EMAIL && password === PASSWORD) {
        saveAuth()
        navigate('/chat')
      } else {
        setError('Invalid Email or Password')
      }
    },
    [navigate],
  )

  const logout = useCallback(() => {
    clearAuth()
    navigate('/')
  }, [navigate])

  const checkAuth = useCallback(() => {
    if (!isAuth()) {
      navigate('/')
    }
  }, [navigate])

  return { login, logout, checkAuth, error, setError }
}
