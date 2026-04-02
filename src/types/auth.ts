export type UserRole =
  | 'ceo_adapta'
  | 'head_consultoria'
  | 'consultor'
  | 'cs_lead'
  | 'gerente_cs'
  | 'gestor_cliente'
  | 'colaborador'

export interface User {
  email: string
  nome: string
  perfil: UserRole
  avatar_url?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AuthContextType extends AuthState {
  login: (email: string, password?: string) => Promise<string>
  logout: () => void
}
