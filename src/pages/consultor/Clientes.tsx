import { Link } from 'react-router-dom'
import { SectionTitle } from '@/components/ui/section-title'
import { Card, CardContent } from '@/components/ui/card'
import { HealthDot } from '@/components/ui/health-dot'
import { BadgeASA } from '@/components/ui/badge-asa'

export default function ConsultorClientes() {
  const clientes = [
    { id: '1', nome: 'TechCorp S.A.', status: 'Green', fase: 'Sistematizar' },
    { id: '2', nome: 'Innova Solutions', status: 'Yellow', fase: 'Amplificar' },
    { id: '3', nome: 'Global Logistics', status: 'Red', fase: 'Automatizar' },
  ]

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Meus Clientes"
        subtitle="Lista de todos os clientes sob sua responsabilidade."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientes.map((c) => (
          <Link key={c.id} to={`/consultor/clientes/${c.id}`}>
            <Card className="hover:border-primary/50 transition-colors h-full">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-display text-lg font-bold">{c.nome}</h3>
                  <HealthDot status={c.status as any} tooltipText={`Status: ${c.status}`} />
                </div>
                <BadgeASA type={c.fase as any} />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
