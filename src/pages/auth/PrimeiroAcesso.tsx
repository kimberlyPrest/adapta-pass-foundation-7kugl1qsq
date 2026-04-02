import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useAuthForm } from '@/hooks/useAuthForm'
import { firstAccessSchema, FirstAccessFormData } from '@/lib/validations'
import { PasswordStrengthIndicator } from '@/components/PasswordStrengthIndicator'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function PrimeiroAcesso() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Mock email based on token or generic
  const mockEmail = token
    ? `novo_usuario_${token.slice(0, 4)}@empresa.com`
    : 'convidado@empresa.com'

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useAuthForm(firstAccessSchema, { mode: 'onChange' })

  const currentPassword = watch('password')

  useEffect(() => {
    if (!token) {
      toast.info('Nenhum token fornecido na URL. Utilizando modo de demonstração.')
    }
  }, [token])

  const onSubmit = async (data: FirstAccessFormData) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)

    toast.success('Conta criada com sucesso!')
    navigate('/colaborador')
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-muted/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <Card className="w-full max-w-md shadow-elevation animate-fade-in-up border-border/40">
        <CardHeader className="text-center pb-6">
          <CardTitle className="font-display text-2xl">Bem-vindo(a)!</CardTitle>
          <CardDescription>Configure seu perfil para acessar a plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label>E-mail (apenas leitura)</Label>
              <Input value={mockEmail} disabled className="bg-muted/50" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nome">Seu nome completo</Label>
              <Input
                id="nome"
                placeholder="Ex: João da Silva"
                disabled={isLoading}
                className={cn(errors.nome && 'border-destructive')}
                {...register('nome')}
              />
              {errors.nome && (
                <p className="text-sm text-destructive animate-fade-in">{errors.nome.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Criar Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  disabled={isLoading}
                  className={cn(errors.password && 'border-destructive')}
                  {...register('password')}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <PasswordStrengthIndicator password={currentPassword} />
            </div>

            <Button
              type="submit"
              className="w-full font-medium mt-6"
              disabled={!isValid || isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Criar Conta
            </Button>

            <div className="text-center pt-2">
              <Button
                variant="ghost"
                asChild
                className="text-muted-foreground hover:text-foreground"
              >
                <Link to="/login">Voltar ao Login</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
