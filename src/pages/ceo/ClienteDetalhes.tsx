import { useParams } from 'react-router-dom'
import { SectionTitle } from '@/components/ui/section-title'
export default function CEOClienteDetalhes() {
  const { id } = useParams()
  return (
    <SectionTitle
      title={`CEO - Detalhes do Cliente #${id}`}
      subtitle="Relatórios gerenciais e impacto."
    />
  )
}
