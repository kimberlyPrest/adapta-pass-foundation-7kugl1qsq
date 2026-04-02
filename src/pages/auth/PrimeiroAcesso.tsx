import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase/client'
import { PROFILE_ROUTES } from '@/constants/constants'

export default function PrimeiroAcesso() {
  const navigate = useNavigate()
  const { updatePassword, user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [sessionEmail, setSessionEmail] = useState<string | null>(null)

  // Resolve the session email on mount (magic link sets session before page renders)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSessionEmail(data.session?.user?.email ?? null)
    })
  }, [])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useAuthForm(firstAccessSchema, { mode: 'onChange' })

  const currentPassword = watch('password')

  const onSubmit = async (data: FirstAccessFormData) => {
    setIsLoading(true)
    setFormError(null)

    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const uid = sessionData.session?.user?.id

      if (!uid) throw new Error('Sessão não encontrada. Acesse via link de convite.')

      // Update usuarios row
      const { error: updateError } = await supabase
        .from('usuarios')
        .update({
          nome: data.nome,
          senha_definida: true,
          status: 'ativo',
        })
        .eq('id', uid)

      if (updateError) throw new Error('Ocorreu um erro. Tente novamente.')

      // Set the password via Supabase Auth
      await updatePassword(data.password)

      toast.success('Conta criada com sucesso!')

      const perfil = user?.perfil
      const route = perfil ? (PROFILE_ROUTES[perfil] ?? '/') : '/'
      setTimeout(() => navigate(route), 1500)
    } catch (error: any) {
      setFormError(error.message ?? 'Ocorreu um erro. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-muted/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <Card className="w-full max-w-md shadow-elevation animate-fade-in-up border-border/40">
        <CardHeader className="text-center pb-6">
          <CardTitle className="font-display text-2xl">Bem-vindo ao Adapta Pass</CardTitle>
          <CardDescription>Configure seu perfil para acessar a plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label>E-mail (apenas leitura)</Label>
              <Input value={sessionEmail ?? '…'} disabled className="bg-muted/50" />
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
              <Label htmlFor="password">Defina sua senha</Label>
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

            {formError && (
              <p className="text-sm text-destructive text-center animate-fade-in">{formError}</p>
            )}

            <Button
              type="submit"
              className="w-full font-medium mt-6"
              disabled={!isValid || isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Criar minha conta
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
