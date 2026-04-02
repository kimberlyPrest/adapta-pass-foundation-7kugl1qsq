export type UserRole =
  | 'ceo_adapta'
  | 'head_consultoria'
  | 'consultor'
  | 'cs_lead'
  | 'gerente_cs'
  | 'gestor_cliente'
  | 'colaborador'

export interface User {
  id: string
  email: string
  nome: string
  perfil: UserRole
  avatar_url?: string | null
  empresa_id?: string | null
}

/** Alias kept for consistency */
export type AuthUser = User

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  loginWithMagicLink: (email: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (password: string) => Promise<void>
}
