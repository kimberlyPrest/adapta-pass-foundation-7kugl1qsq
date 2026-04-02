import { SectionTitle } from '@/components/ui/section-title'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
export default function ColaboradorProcessos() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Meus Processos" subtitle="Processos em andamento." />
      <Button asChild>
        <Link to="/colaborador/processos/novo">Novo Processo</Link>
      </Button>
    </div>
  )
}
