import { useState, useCallback, useRef } from 'react'
import { clientesService } from '@/services/clientesService'
import { Cliente, ClientesFilters } from '@/types/types'
import { useToast } from '@/hooks/use-toast'

export function useClientes(initialFilters?: ClientesFilters) {
  const [data, setData] = useState<Cliente[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const currentFiltersRef = useRef<ClientesFilters | undefined>(initialFilters)

  const fetchClientes = useCallback(
    async (filters?: ClientesFilters, append = false) => {
      setIsLoading(true)
      setError(null)
      currentFiltersRef.current = filters

      try {
        const response = await clientesService.getClientes(filters)
        setData((prev) => (append ? [...prev, ...response.data] : response.data))

        if (filters?.pageSize && response.count !== null) {
          setHasMore((filters.pageOffset || 0) + filters.pageSize < response.count)
        } else {
          setHasMore(false)
        }
      } catch (err: any) {
        const errMsg = err instanceof Error ? err.message : 'Ocorreu um erro'
        setError(errMsg)
        toast({ title: 'Erro', description: errMsg, variant: 'destructive' })
      } finally {
        setIsLoading(false)
      }
    },
    [toast],
  )

  const refetch = useCallback(() => {
    fetchClientes(currentFiltersRef.current)
  }, [fetchClientes])

  const createMutation = {
    mutate: async (cliente: Partial<Cliente>, options?: { onSuccess?: () => void }) => {
      try {
        await clientesService.createCliente(cliente)
        toast({ title: 'Sucesso', description: 'Empresa adicionada com sucesso!' })
        refetch()
        options?.onSuccess?.()
      } catch (err: any) {
        const errMsg = err instanceof Error ? err.message : 'Ocorreu um erro'
        toast({ title: 'Erro', description: errMsg, variant: 'destructive' })
      }
    },
  }

  const updateMutation = {
    mutate: async (
      { id, ...cliente }: Partial<Cliente> & { id: string },
      options?: { onSuccess?: () => void },
    ) => {
      try {
        await clientesService.updateCliente(id, cliente)
        toast({ title: 'Sucesso', description: 'Empresa atualizada com sucesso!' })
        refetch()
        options?.onSuccess?.()
      } catch (err: any) {
        const errMsg = err instanceof Error ? err.message : 'Ocorreu um erro'
        toast({ title: 'Erro', description: errMsg, variant: 'destructive' })
      }
    },
  }

  const deleteMutation = {
    mutate: async (id: string, options?: { onSuccess?: () => void }) => {
      try {
        await clientesService.deleteCliente(id)
        toast({ title: 'Sucesso', description: 'Empresa inativada com sucesso!' })
        refetch()
        options?.onSuccess?.()
      } catch (err: any) {
        const errMsg = err instanceof Error ? err.message : 'Ocorreu um erro'
        toast({ title: 'Erro', description: errMsg, variant: 'destructive' })
      }
    },
  }

  return {
    data,
    isLoading,
    error,
    hasMore,
    createMutation,
    updateMutation,
    deleteMutation,
    refetch,
    fetchClientes,
  }
}
