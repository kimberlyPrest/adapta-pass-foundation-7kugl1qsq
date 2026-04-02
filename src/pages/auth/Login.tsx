import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'
import logoImg from '@/assets/adapta-pass-logo-white-5b4d9-crdoq5rj-cd8ab.png'
import { useAuth } from '@/contexts/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login, loginWithMagicLink } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isMagicLinkMode, setIsMagicLinkMode] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  useEffect(() => {
    const root = document.documentElement
    if (!root.classList.contains('light') && !root.classList.contains('dark')) {
      root.classList.add('dark')
    }
  }, [])

  const loginSchema = useMemo(
    () =>
      z.object({
        email: z.string().min(1, 'Informe seu e-mail').email('E-mail inválido'),
        password: isMagicLinkMode ? z.string().optional() : z.string().min(1, 'Informe sua senha'),
      }),
    [isMagicLinkMode],
  )

  type LoginFormValues = z.infer<typeof loginSchema>

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    form.clearErrors('password')
    setFormError(null)
  }, [isMagicLinkMode, form])

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    setFormError(null)

    try {
      if (isMagicLinkMode) {
        await loginWithMagicLink(data.email)
        navigate('/magic-link-confirm')
        return
      }

      await login(data.email, data.password ?? '')
      // Redirect is handled by onAuthStateChange in AuthContext
    } catch (error: any) {
      setFormError(error.message ?? 'Ocorreu um erro. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in-up">
        <div className="flex justify-center mb-8">
          <img src={logoImg} alt="ADAPTA PASS Logo" className="h-10 w-auto object-contain" />
        </div>

        <Card className="border-border shadow-lg bg-card">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Bem-vindo de volta</CardTitle>
            <CardDescription>
              {isMagicLinkMode
                ? 'Digite seu e-mail para receber um link de acesso'
                : 'Insira seu e-mail e senha para entrar'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="m@exemplo.com"
                          type="email"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!isMagicLinkMode && (
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Senha</FormLabel>
                          <Button variant="link" asChild className="p-0 h-auto text-xs">
                            <Link to="/reset-password">Esqueci minha senha</Link>
                          </Button>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="••••••••"
                            type="password"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {formError && (
                  <p className="text-sm text-destructive text-center animate-fade-in">
                    {formError}
                  </p>
                )}

                <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                  {isLoading
                    ? isMagicLinkMode
                      ? 'Enviando...'
                      : 'Entrando...'
                    : isMagicLinkMode
                      ? 'Enviar link mágico'
                      : 'Entrar'}
                </Button>
              </form>
            </Form>

            <div className="mt-4 text-center">
              <Button
                variant="ghost"
                className="text-sm text-muted-foreground w-full"
                onClick={() => setIsMagicLinkMode(!isMagicLinkMode)}
                disabled={isLoading}
                type="button"
              >
                {isMagicLinkMode ? 'Voltar para login com senha' : 'Entrar com link mágico'}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-4">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              <Button variant="link" asChild className="p-0 h-auto font-medium">
                <Link to="/primeiro-acesso">Criar conta</Link>
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
