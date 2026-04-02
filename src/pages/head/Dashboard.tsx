import { SectionTitle } from '@/components/ui/section-title'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
export default function HeadDashboard() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Visão Head" subtitle="Métricas agregadas da diretoria." />
      <Button asChild>
        <Link to="/head/clientes/123">Análise Cliente 123</Link>
      </Button>
    </div>
  )
}
