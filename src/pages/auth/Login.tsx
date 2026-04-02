import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Loader2, Sparkles } from 'lucide-react'
import { useAuthForm } from '@/hooks/useAuthForm'
import { loginSchema, LoginFormData } from '@/lib/validations'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function Login() {
  const [searchParams] = useSearchParams()
  const isMagicLink = searchParams.get('mode') === 'magic-link'
  const redirectPath = searchParams.get('redirect')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const { login, isLoading } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useAuthForm(loginSchema)

  const onSubmit = async (data: LoginFormData) => {
    if (isMagicLink) {
      toast.success('Link mágico enviado para o seu e-mail!')
      return
    }

    if (!data.password) {
      toast.error('Informe sua senha')
      return
    }

    try {
      const route = await login(data.email, data.password)
      navigate(redirectPath || route, { replace: true })
    } catch {
      // Error handled in context
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-muted/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <Card className="w-full max-w-md shadow-elevation animate-fade-in-up border-border/40 backdrop-blur-sm bg-background/95">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="flex justify-center font-display text-4xl font-bold tracking-tight mb-2">
            <span className="text-secondary">ADAPTA</span>
            <span className="text-destructive">PASS</span>
          </div>
          <CardTitle className="text-2xl font-display">
            {isMagicLink ? 'Acesso sem senha' : 'Acesse sua conta'}
          </CardTitle>
          <CardDescription>
            {isMagicLink
              ? 'Enviaremos um link mágico para o seu e-mail.'
              : 'Insira seu e-mail e senha para continuar.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="nome@empresa.com"
                disabled={isLoading}
                className={cn(errors.email && 'border-destructive focus-visible:ring-destructive')}
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-destructive animate-fade-in">{errors.email.message}</p>
              )}
            </div>

            {!isMagicLink && (
              <div className="space-y-2 animate-fade-in">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    to="/reset-password"
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    disabled={isLoading}
                    className={cn(
                      errors.password && 'border-destructive focus-visible:ring-destructive',
                    )}
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
                {errors.password && (
                  <p className="text-sm text-destructive animate-fade-in">
                    {errors.password.message}
                  </p>
                )}
              </div>
            )}

            <Button type="submit" className="w-full font-medium" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isMagicLink ? 'Enviar link mágico' : 'Entrar'}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/40" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Ou</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate(isMagicLink ? '/login' : '/login?mode=magic-link')}
              disabled={isLoading}
            >
              {isMagicLink ? (
                'Voltar para login com senha'
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  Entrar com link mágico
                </>
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground mt-8">
              <Link
                to="/primeiro-acesso"
                className="hover:text-primary transition-colors font-medium"
              >
                Primeiro Acesso?
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
