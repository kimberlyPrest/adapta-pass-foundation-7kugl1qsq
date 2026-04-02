import { SectionTitle } from '@/components/ui/section-title'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
export default function CEODashboard() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Painel do CEO" subtitle="Visão estratégica 360° da operação." />
      <Button asChild>
        <Link to="/ceo/clientes/123">Visão Cliente 123</Link>
      </Button>
    </div>
  )
}
