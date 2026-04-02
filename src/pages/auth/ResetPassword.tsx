import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useAuthForm } from '@/hooks/useAuthForm'
import { resetPasswordSchema, ResetPasswordFormData } from '@/lib/validations'
import { PasswordStrengthIndicator } from '@/components/PasswordStrengthIndicator'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

export default function ResetPassword() {
  const navigate = useNavigate()
  const { updatePassword } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useAuthForm(resetPasswordSchema, { mode: 'onChange' })

  const currentPassword = watch('password')

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true)
    setFormError(null)
    try {
      await updatePassword(data.password)
      toast.success('Senha redefinida com sucesso!')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error: any) {
      setFormError(error.message ?? 'Ocorreu um erro. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-muted/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -z-10" />

      <Card className="w-full max-w-md shadow-elevation animate-fade-in-up border-border/40">
        <CardHeader className="text-center pb-6">
          <CardTitle className="font-display text-2xl">Redefinir Senha</CardTitle>
          <CardDescription>Crie uma nova senha segura para sua conta.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="password">Nova senha</Label>
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                disabled={isLoading}
                className={cn(errors.confirmPassword && 'border-destructive')}
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive animate-fade-in">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {formError && (
              <p className="text-sm text-destructive text-center animate-fade-in">{formError}</p>
            )}

            <Button type="submit" className="w-full font-medium" disabled={!isValid || isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Redefinir senha
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
