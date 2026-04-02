import { SectionTitle } from '@/components/ui/section-title'
import { StatCard } from '@/components/ui/stat-card'
import { Briefcase, CheckCircle2 } from 'lucide-react'

export default function ConsultorDashboard() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title="Dashboard do Consultor"
        subtitle="Bem-vindo de volta. Aqui está o resumo das suas atividades."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Briefcase className="h-5 w-5 text-primary" />}
          title="Meus Clientes"
          value="12"
        />
        <StatCard
          icon={<CheckCircle2 className="h-5 w-5 text-secondary" />}
          title="DMOs Pendentes"
          value="5"
          trend={{ value: 10, direction: 'down' }}
        />
      </div>
    </div>
  )
}
