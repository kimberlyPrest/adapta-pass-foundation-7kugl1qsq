import { useParams } from 'react-router-dom'
import { SectionTitle } from '@/components/ui/section-title'
import { ProgressBar } from '@/components/ui/progress-bar'

export default function ConsultorClienteDMO() {
  const { id } = useParams()
  return (
    <div className="space-y-6">
      <SectionTitle
        title={`DMO do Cliente #${id}`}
        subtitle="Diagnóstico de Maturidade Organizacional."
      />
      <div className="space-y-8 rounded-xl border bg-card p-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Liderança</span>
            <span>75%</span>
          </div>
          <ProgressBar value={75} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Operações</span>
            <span>40%</span>
          </div>
          <ProgressBar value={40} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Vendas</span>
            <span>90%</span>
          </div>
          <ProgressBar value={90} />
        </div>
      </div>
    </div>
  )
}
