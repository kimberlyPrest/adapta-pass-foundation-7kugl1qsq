import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Index from './pages/Index'
import ConsultorClientes from './pages/consultor/Clientes'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'

function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold leading-none">A</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Adapta Pass</h1>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <Outlet />
      </main>
      <Toaster />
      <Sonner />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/consultor/clientes" element={<ConsultorClientes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
