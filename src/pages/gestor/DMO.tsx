import { SectionTitle } from '@/components/ui/section-title'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
export default function GestorDMO() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Diagnóstico DMO" subtitle="Realize ou acompanhe diagnósticos." />
      <Button asChild>
        <Link to="/gestor/dmo/resultado">Ver Resultados Recentes</Link>
      </Button>
    </div>
  )
}
