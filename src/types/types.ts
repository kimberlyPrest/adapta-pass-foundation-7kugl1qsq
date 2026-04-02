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
