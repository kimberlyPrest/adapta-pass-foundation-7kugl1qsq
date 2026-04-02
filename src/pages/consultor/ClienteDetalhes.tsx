import { useParams, Link } from 'react-router-dom'
import { SectionTitle } from '@/components/ui/section-title'
import { Button } from '@/components/ui/button'

export default function ConsultorClienteDetalhes() {
  const { id } = useParams()
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <SectionTitle
          title={`Detalhes do Cliente #${id}`}
          subtitle="Informações gerais e progresso do cliente."
        />
        <Button asChild variant="outline">
          <Link to={`/consultor/clientes/${id}/dmo`}>Ver DMO</Link>
        </Button>
      </div>
      <div className="h-64 rounded-xl border bg-card flex items-center justify-center text-muted-foreground">
        Conteúdo do Cliente
      </div>
    </div>
  )
}
