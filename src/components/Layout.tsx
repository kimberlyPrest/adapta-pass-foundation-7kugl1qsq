import { Suspense, useMemo } from 'react'
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { LoadingScreen } from './LoadingScreen'
import { ErrorBoundary } from './ErrorBoundary'
import { cn } from '@/lib/utils'

export default function Layout() {
  const location = useLocation()
  const navigate = useNavigate()

  const navLinks = useMemo(() => {
    const path = location.pathname
    if (path.startsWith('/consultor')) {
      return [
        { label: 'Visão Geral', to: '/consultor' },
        { label: 'Clientes', to: '/consultor/clientes' },
      ]
    }
    if (path.startsWith('/gestor')) {
      return [
        { label: 'Visão Geral', to: '/gestor' },
        { label: 'Áreas', to: '/gestor/areas' },
        { label: 'DMO', to: '/gestor/dmo' },
        { label: 'Tarefas', to: '/gestor/tarefas' },
        { label: 'Overdelivery', to: '/gestor/overdelivery' },
      ]
    }
    if (path.startsWith('/colaborador')) {
      return [
        { label: 'Dashboard', to: '/colaborador' },
        { label: 'Processos', to: '/colaborador/processos' },
      ]
    }
    if (path.startsWith('/cs') && !path.startsWith('/cs-lead')) {
      return [{ label: 'Pipeline', to: '/cs/pipeline' }]
    }
    if (path.startsWith('/head')) {
      return [{ label: 'Visão Geral', to: '/head' }]
    }
    if (path.startsWith('/ceo')) {
      return [{ label: 'Visão Geral', to: '/ceo' }]
    }
    return [{ label: 'Dev Preview', to: '/dev-preview' }]
  }, [location.pathname])

  const isAuthPage = [
    '/login',
    '/magic-link-confirm',
    '/reset-password',
    '/primeiro-acesso',
  ].includes(location.pathname)

  if (isAuthPage) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen />}>
          <main className="flex min-h-screen bg-background text-foreground animate-fade-in">
            <Outlet />
          </main>
        </Suspense>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-50 h-16 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border/40">
          <div className="flex h-full items-center justify-between px-6">
            <Link
              to="/dev-preview"
              className="flex items-center gap-1 font-display text-2xl font-bold"
            >
              <span className="text-secondary">ADAPTA</span>
              <span className="text-destructive">PASS</span>
            </Link>

            <div className="flex items-center gap-4">
              <Avatar className="h-9 w-9 border border-border">
                <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                  JD
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => navigate('/login')}
              >
                Sair
              </Button>
            </div>
          </div>
        </header>

        <div className="border-b border-border/40 bg-muted/10 overflow-x-auto scrollbar-hide">
          <nav className="flex items-center px-6 h-12 gap-6 min-w-max">
            {navLinks.map((link) => {
              const isExact = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'text-sm font-medium transition-colors duration-200 h-full flex items-center border-b-2',
                    isExact
                      ? 'border-primary text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <main className="flex-1 w-full max-w-7xl mx-auto p-6 animate-fade-in">
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  )
}
