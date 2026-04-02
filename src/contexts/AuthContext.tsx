import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { AuthContextType, User, UserRole } from '@/types/auth'
import { toast } from 'sonner'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const ROLE_MAP: Record<string, { role: UserRole; route: string; name: string }> = {
  'admin@adapta.com': { role: 'ceo_adapta', route: '/ceo', name: 'CEO Adapta' },
  'head@adapta.com': { role: 'head_consultoria', route: '/head', name: 'Head Consultoria' },
  'consultor@adapta.com': { role: 'consultor', route: '/consultor', name: 'Consultor' },
  'cslead@adapta.com': { role: 'cs_lead', route: '/cs-lead', name: 'CS Lead' },
  'gerente@adapta.com': { role: 'gerente_cs', route: '/cs/pipeline', name: 'Gerente CS' },
  'gestor@empresa.com': { role: 'gestor_cliente', route: '/gestor', name: 'Gestor' },
  'colaborador@empresa.com': { role: 'colaborador', route: '/colaborador', name: 'Colaborador' },
}

const simulateDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('auth_user')
    return saved ? JSON.parse(saved) : null
  })
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (email: string, password?: string) => {
    setIsLoading(true)
    try {
      await simulateDelay(1500)

      if (email.toLowerCase().includes('erro')) {
        throw new Error('E-mail ou senha incorretos')
      }

      const mapped = ROLE_MAP[email.toLowerCase()] || {
        role: 'colaborador',
        route: '/colaborador',
        name: email.split('@')[0],
      }

      const newUser: User = {
        email,
        nome: mapped.name,
        perfil: mapped.role,
        avatar_url: `https://img.usecurling.com/ppl/thumbnail?seed=${email}`,
      }

      setUser(newUser)
      localStorage.setItem('auth_user', JSON.stringify(newUser))

      toast.success('Login realizado com sucesso!')
      return mapped.route
    } catch (error: any) {
      toast.error(error.message || 'Erro ao realizar login')
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('auth_user')
  }, [])

  return React.createElement(
    AuthContext.Provider,
    { value: { user, isAuthenticated: !!user, isLoading, login, logout } },
    children,
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
