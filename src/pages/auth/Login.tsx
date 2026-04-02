import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/dev-preview')
  }

  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elevation">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center font-display text-4xl font-bold tracking-tight">
            <span className="text-secondary">ADAPTA</span>
            <span className="text-destructive">PASS</span>
          </div>
          <CardTitle className="text-2xl font-display">Acesse sua conta</CardTitle>
          <CardDescription>Insira seu e-mail e senha para continuar.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="nome@empresa.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link
                  to="/reset-password"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full font-medium">
              Entrar
            </Button>
            <div className="text-center text-sm text-muted-foreground mt-4">
              <Link to="/primeiro-acesso" className="hover:text-primary transition-colors">
                Primeiro Acesso?
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
