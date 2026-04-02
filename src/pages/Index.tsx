import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowRight, LayoutDashboard, Users } from 'lucide-react'

export default function Index() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      <div className="mx-auto max-w-[800px] text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Bem-vindo ao <span className="text-primary">Adapta Pass</span>
          </h1>
          <p className="mx-auto max-w-[600px] text-lg text-muted-foreground sm:text-xl leading-relaxed">
            Plataforma fundacional com tema personalizado, layout, rotas e suporte a modo escuro.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="h-12 px-8 w-full sm:w-auto text-base">
            <Link to="/consultor/clientes">
              <Users className="mr-2 h-5 w-5" />
              Área do Consultor
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 px-8 w-full sm:w-auto text-base"
          >
            <Link to="/">
              <LayoutDashboard className="mr-2 h-5 w-5" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
