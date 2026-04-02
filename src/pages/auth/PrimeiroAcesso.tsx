import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function PrimeiroAcesso() {
  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elevation">
        <CardHeader>
          <CardTitle className="font-display text-2xl">Primeiro Acesso</CardTitle>
          <CardDescription>Crie sua senha para acessar a plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="token">Token de Convite</Label>
              <Input id="token" type="text" placeholder="Cole o token recebido" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Nova Senha</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Criar Conta
            </Button>
            <div className="text-center">
              <Button variant="ghost" asChild>
                <Link to="/login">Voltar ao Login</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
