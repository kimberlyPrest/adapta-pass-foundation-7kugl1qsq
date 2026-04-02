import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContextType, User } from '@/types/auth'
import { PROFILE_ROUTES } from '@/constants/constants'
import { supabase } from '@/lib/supabase/client'
import * as authService from '@/services/authService'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ─── Fetch user row from usuarios table ──────────────────────────────────────

async function fetchUsuario(uid: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('usuarios')
    .select('id, email, nome, perfil, avatar_url, empresa_id')
    .eq('id', uid)
    .single()

  if (error || !data) return null
  return data as User
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  // Track if we already redirected after SIGNED_IN to avoid double navigation
  const didRedirect = useRef(false)

  // ── On mount: restore session ──────────────────────────────────────────────
  useEffect(() => {
    let mounted = true

    authService
      .getSession()
      .then(async (session) => {
        if (!mounted) return
        if (session?.user) {
          const u = await fetchUsuario(session.user.id)
          if (mounted) setUser(u)
        }
        if (mounted) setIsLoading(false)
      })
      .catch(() => {
        if (mounted) setIsLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  // ── Auth state change listener ─────────────────────────────────────────────
  useEffect(() => {
    const subscription = authService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const u = await fetchUsuario(session.user.id)
        setUser(u)
        setIsLoading(false)

        if (!didRedirect.current) {
          didRedirect.current = true
          const searchParams = new URLSearchParams(location.search)
          const redirectTo = searchParams.get('redirect')
          const defaultRoute = u ? (PROFILE_ROUTES[u.perfil] ?? '/') : '/'
          navigate(redirectTo ?? defaultRoute, { replace: true })
        }
      }

      if (event === 'SIGNED_OUT') {
        setUser(null)
        setIsLoading(false)
        didRedirect.current = false
      }

      if (event === 'PASSWORD_RECOVERY') {
        // handled by ResetPassword page
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [navigate, location.search])

  // ── Actions ────────────────────────────────────────────────────────────────

  const login = useCallback(async (email: string, password: string) => {
    didRedirect.current = false
    await authService.signInWithEmail(email, password)
    // navigation happens in onAuthStateChange SIGNED_IN handler
  }, [])

  const loginWithMagicLink = useCallback(async (email: string) => {
    await authService.signInWithMagicLink(email)
  }, [])

  const logout = useCallback(async () => {
    await authService.signOut()
    navigate('/login', { replace: true })
  }, [navigate])

  const resetPassword = useCallback(async (email: string) => {
    await authService.resetPassword(email)
  }, [])

  const updatePassword = useCallback(async (password: string) => {
    await authService.updatePassword(password)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithMagicLink,
        logout,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
