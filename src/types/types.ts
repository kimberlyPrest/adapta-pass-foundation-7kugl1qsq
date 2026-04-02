export interface Trend {
  value: number
  direction: 'up' | 'down' | 'neutral'
}

export type HealthStatus = 'Green' | 'Yellow' | 'Red'
export type ASAStatus = 'Amplificar' | 'Sistematizar' | 'Automatizar'

export interface Client {
  id: string
  nome: string
  status: HealthStatus
  fase: ASAStatus
}

export interface Cliente {
  id: string
  nome: string
  cnpj: string
  setor?: string | null
  responsavel_nome: string
  responsavel_email: string
  consultor_id?: string | null
  gerente_cs_id?: string | null
  data_inicio_programa?: string | null
  ativo: boolean
  created_at?: string
  updated_at?: string
}

export interface ClientesFilters {
  ativo?: boolean
  pageSize?: number
  pageOffset?: number
}
