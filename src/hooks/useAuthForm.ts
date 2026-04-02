import { useForm, UseFormProps } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export function useAuthForm<T extends z.ZodType<any, any>>(
  schema: T,
  options?: Omit<UseFormProps<z.infer<T>>, 'resolver'>,
) {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    ...options,
  })
}
