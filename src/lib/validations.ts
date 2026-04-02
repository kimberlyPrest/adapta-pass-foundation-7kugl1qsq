import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'Informe seu e-mail').email('E-mail inválido'),
  password: z.string().min(1, 'Informe sua senha').optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>

const passwordValidation = z
  .string()
  .min(8, 'Mínimo 8 caracteres')
  .regex(/[A-Z]/, 'Pelo menos uma letra maiúscula')
  .regex(/[0-9]/, 'Pelo menos um número')

export const resetPasswordSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export const firstAccessSchema = z.object({
  nome: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  password: passwordValidation,
})

export type FirstAccessFormData = z.infer<typeof firstAccessSchema>
