import { lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'
import NotFound from './pages/NotFound'

const Login = lazy(() => import('./pages/auth/Login'))
const MagicLinkConfirm = lazy(() => import('./pages/auth/MagicLinkConfirm'))
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'))
const PrimeiroAcesso = lazy(() => import('./pages/auth/PrimeiroAcesso'))
const DevPreview = lazy(() => import('./pages/DevPreview'))

const ConsultorDashboard = lazy(() => import('./pages/consultor/Dashboard'))
const ConsultorClientes = lazy(() => import('./pages/consultor/Clientes'))
const ConsultorClienteDetalhes = lazy(() => import('./pages/consultor/ClienteDetalhes'))
const ConsultorClienteDMO = lazy(() => import('./pages/consultor/ClienteDMO'))

const GestorDashboard = lazy(() => import('./pages/gestor/Dashboard'))
const GestorAreas = lazy(() => import('./pages/gestor/Areas'))
const GestorDMO = lazy(() => import('./pages/gestor/DMO'))
const GestorDMOResultado = lazy(() => import('./pages/gestor/DMOResultado'))
const GestorTarefas = lazy(() => import('./pages/gestor/Tarefas'))
const GestorOverdelivery = lazy(() => import('./pages/gestor/Overdelivery'))

const ColaboradorDashboard = lazy(() => import('./pages/colaborador/Dashboard'))
const ColaboradorProcessos = lazy(() => import('./pages/colaborador/Processos'))
const ColaboradorProcessoNovo = lazy(() => import('./pages/colaborador/ProcessoNovo'))

const CSPipeline = lazy(() => import('./pages/cs/Pipeline'))
const CSClienteDetalhes = lazy(() => import('./pages/cs/ClienteDetalhes'))
const CSLead = lazy(() => import('./pages/cs/Lead'))

const HeadDashboard = lazy(() => import('./pages/head/Dashboard'))
const HeadClienteDetalhes = lazy(() => import('./pages/head/ClienteDetalhes'))

const CEODashboard = lazy(() => import('./pages/ceo/Dashboard'))
const CEOClienteDetalhes = lazy(() => import('./pages/ceo/ClienteDetalhes'))

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/magic-link-confirm" element={<MagicLinkConfirm />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/primeiro-acesso" element={<PrimeiroAcesso />} />
          <Route path="/dev-preview" element={<DevPreview />} />

          <Route path="/consultor" element={<ConsultorDashboard />} />
          <Route path="/consultor/clientes" element={<ConsultorClientes />} />
          <Route path="/consultor/clientes/:id" element={<ConsultorClienteDetalhes />} />
          <Route path="/consultor/clientes/:id/dmo" element={<ConsultorClienteDMO />} />

          <Route path="/gestor" element={<GestorDashboard />} />
          <Route path="/gestor/areas" element={<GestorAreas />} />
          <Route path="/gestor/dmo" element={<GestorDMO />} />
          <Route path="/gestor/dmo/resultado" element={<GestorDMOResultado />} />
          <Route path="/gestor/tarefas" element={<GestorTarefas />} />
          <Route path="/gestor/overdelivery" element={<GestorOverdelivery />} />

          <Route path="/colaborador" element={<ColaboradorDashboard />} />
          <Route path="/colaborador/processos" element={<ColaboradorProcessos />} />
          <Route path="/colaborador/processos/novo" element={<ColaboradorProcessoNovo />} />

          <Route path="/cs/pipeline" element={<CSPipeline />} />
          <Route path="/cs/clientes/:id" element={<CSClienteDetalhes />} />
          <Route path="/cs-lead" element={<CSLead />} />

          <Route path="/head" element={<HeadDashboard />} />
          <Route path="/head/clientes/:id" element={<HeadClienteDetalhes />} />

          <Route path="/ceo" element={<CEODashboard />} />
          <Route path="/ceo/clientes/:id" element={<CEOClienteDetalhes />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
