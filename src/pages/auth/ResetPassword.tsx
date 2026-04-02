import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function ResetPassword() {
  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elevation">
        <CardHeader>
          <CardTitle className="font-display text-2xl">Recuperar Senha</CardTitle>
          <CardDescription>Enviaremos um link de recuperação para seu e-mail.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="nome@empresa.com" required />
            </div>
            <Button type="submit" className="w-full">
              Enviar Link
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
