import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Moon, Sun, LogOut, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import logoImg from '@/assets/adapta-pass-logo-white-5b4d9-crdoq5rj-cd8ab.png'

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    // Default to dark mode if not set so the white logo is visible
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

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    navigate('/login')
  }

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  const isAuthPage = location.pathname.startsWith('/login')

  if (isAuthPage) {
    return <Outlet />
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="flex flex-col gap-6 py-4">
                  <Link to="/" className="flex items-center gap-2">
                    <img src={logoImg} alt="ADAPTA PASS" className="h-6 w-auto object-contain" />
                  </Link>
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

            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img
                src={logoImg}
                alt="ADAPTA PASS"
                className="h-6 w-auto hidden md:block object-contain"
              />
              <img
                src={logoImg}
                alt="ADAPTA PASS"
                className="h-5 w-auto md:hidden object-contain"
              />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {isAuthenticated ? (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
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
