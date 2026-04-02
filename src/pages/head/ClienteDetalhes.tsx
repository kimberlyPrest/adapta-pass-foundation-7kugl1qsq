import { useParams } from 'react-router-dom'
import { SectionTitle } from '@/components/ui/section-title'
export default function HeadClienteDetalhes() {
  const { id } = useParams()
  return (
    <SectionTitle
      title={`Análise Executiva - Cliente #${id}`}
      subtitle="Aprofundamento de resultados para Heads."
    />
  )
}
