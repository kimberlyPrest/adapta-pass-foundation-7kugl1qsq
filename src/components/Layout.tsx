import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Moon, Sun, LogOut, Menu, Upload } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { PROFILE_ROUTES } from '@/constants/constants'
import { DevProfileSwitcher } from '@/components/DevProfileSwitcher'

const AUTH_PAGES = ['/login', '/magic-link-confirm', '/reset-password', '/primeiro-acesso']

function getInitials(nome?: string | null): string {
  if (!nome) return '?'
  const parts = nome.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : ''
  return (first + last).toUpperCase()
}

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()
  const [isDark, setIsDark] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const root = document.documentElement
    if (!root.classList.contains('light') && !root.classList.contains('dark')) {
      root.classList.add('dark')
    }
    setIsDark(root.classList.contains('dark'))
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    if (isDark) {
      root.classList.remove('dark')
      root.classList.add('light')
    } else {
      root.classList.remove('light')
      root.classList.add('dark')
    }
    setIsDark(!isDark)
  }

  const handleLogout = async () => {
    await logout()
  }

  const handleAvatarClick = () => {
    if (!isAuthenticated) return
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return

    const MAX_BYTES = 2 * 1024 * 1024
    const ALLOWED = ['image/jpeg', 'image/png', 'image/webp']

    if (!ALLOWED.includes(file.type)) {
      toast.error('Formato não suportado. Use JPEG, PNG ou WebP.')
      return
    }
    if (file.size > MAX_BYTES) {
      toast.error('A imagem deve ter no máximo 2 MB.')
      return
    }

    const ext = file.name.split('.').pop() ?? 'jpg'
    const path = `${user.id}/avatar.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(path, file, { upsert: true, contentType: file.type })

    if (uploadError) {
      toast.error('Erro ao enviar foto. Tente novamente.')
      return
    }

    const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(path)
    const publicUrl = urlData.publicUrl

    const { error: dbError } = await supabase
      .from('usuarios')
      .update({ avatar_url: publicUrl })
      .eq('id', user.id)

    if (dbError) {
      toast.error('Erro ao atualizar perfil.')
      return
    }

    toast.success('Foto atualizada!')
    e.target.value = ''
  }

  const isAuthPage = AUTH_PAGES.some((p) => location.pathname.startsWith(p))

  if (isAuthPage) {
    return <Outlet />
  }

  const logoRoute = user?.perfil ? (PROFILE_ROUTES[user.perfil] ?? '/') : '/'

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">

          {/* ── Left: mobile menu trigger + logo ── */}
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[260px] sm:w-[300px]">
                <div className="flex flex-col gap-6 py-4">
                  <Link to={logoRoute} className="flex items-center gap-2">
                    {/* Logo text in sheet */}
                    <span
                      className="text-lg tracking-wider"
                      style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700 }}
                    >
                      <span className="text-[hsl(var(--secondary))]">ADAPTA</span>
                      <span className="text-destructive"> PASS</span>
                    </span>
                  </Link>

                  {/* Dev switcher inside sheet on mobile */}
                  {import.meta.env.MODE === 'development' && (
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">Visão (dev):</span>
                      <DevProfileSwitcher mobileMode />
                    </div>
                  )}

                  <nav className="flex flex-col gap-2">
                    <Link
                      to="/"
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      Dashboard
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo text — desktop */}
            <Link
              to={logoRoute}
              className="flex items-center hover:opacity-80 transition-opacity"
              aria-label="Ir para dashboard"
            >
              <span
                className="text-xl tracking-wider select-none"
                style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700 }}
              >
                <span className="text-[hsl(var(--secondary))]">ADAPTA</span>
                <span className="text-destructive"> PASS</span>
              </span>
            </Link>
          </div>

          {/* ── Right: dev switcher + theme + user ── */}
          <div className="flex items-center gap-3">
            {/* Dev profile switcher — desktop only (component handles md: internally) */}
            <DevProfileSwitcher />

            {/* Theme toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Alternar tema">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* Avatar (clickable for upload) */}
                <button
                  type="button"
                  onClick={handleAvatarClick}
                  className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-border hover:ring-[hsl(var(--secondary))] transition-all focus:outline-none focus:ring-[hsl(var(--secondary))] group flex-shrink-0"
                  aria-label="Alterar foto de perfil"
                  title="Clique para alterar foto"
                >
                  {user?.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt={user?.nome ?? 'Avatar'}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center bg-[hsl(var(--secondary))] text-white text-xs font-semibold">
                      {getInitials(user?.nome)}
                    </span>
                  )}
                  <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="h-3.5 w-3.5 text-white" />
                  </span>
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {/* User name — hidden on mobile */}
                {user?.nome && (
                  <span className="hidden md:block text-sm text-muted-foreground max-w-[140px] truncate">
                    {user.nome}
                  </span>
                )}

                {/* Logout button — icon only with tooltip */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleLogout}
                      aria-label="Sair"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Sair</TooltipContent>
                </Tooltip>
              </div>
            ) : (
              <Button variant="default" size="sm" onClick={() => navigate('/login')}>
                Entrar
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
