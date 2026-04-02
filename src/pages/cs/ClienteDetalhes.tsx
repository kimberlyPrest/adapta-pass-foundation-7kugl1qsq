import { useParams } from 'react-router-dom'
import { SectionTitle } from '@/components/ui/section-title'
export default function CSClienteDetalhes() {
  const { id } = useParams()
  return (
    <SectionTitle
      title={`CS - Cliente #${id}`}
      subtitle="Histórico de atendimento e métricas de saúde."
    />
  )
}
