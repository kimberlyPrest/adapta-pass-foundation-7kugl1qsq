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

export const isValidCNPJ = (cnpj: string) => {
  cnpj = cnpj.replace(/[^\d]+/g, '')
  if (cnpj.length !== 14) return false
  if (/^(\d)\1+$/.test(cnpj)) return false
  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0, tamanho)
  const digitos = cnpj.substring(tamanho)
  let soma = 0
  let pos = tamanho - 7
  for (let i = 0; i < tamanho; i++) {
    soma += parseInt(numeros.charAt(i)) * pos--
    if (pos < 2) pos = 9
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  if (resultado !== parseInt(digitos.charAt(0))) return false
  tamanho = tamanho + 1
  numeros = cnpj.substring(0, tamanho)
  soma = 0
  pos = tamanho - 7
  for (let i = 0; i < tamanho; i++) {
    soma += parseInt(numeros.charAt(i)) * pos--
    if (pos < 2) pos = 9
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  if (resultado !== parseInt(digitos.charAt(1))) return false
  return true
}

export const clienteSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  cnpj: z.string().min(1, 'CNPJ é obrigatório').refine(isValidCNPJ, 'CNPJ inválido'),
  responsavel_nome: z.string().min(1, 'Nome do responsável é obrigatório'),
  responsavel_email: z.string().email('E-mail inválido'),
  setor: z.string().optional(),
})

export type ClienteFormData = z.infer<typeof clienteSchema>
