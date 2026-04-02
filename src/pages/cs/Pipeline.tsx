import { SectionTitle } from '@/components/ui/section-title'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
export default function CSPipeline() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Pipeline CS" subtitle="Acompanhamento de onboarding e retenção." />
      <Button asChild>
        <Link to="/cs/clientes/123">Exemplo Cliente</Link>
      </Button>
    </div>
  )
}
