import { supabase } from '@/lib/supabase/client'
import { Cliente, ClientesFilters } from '@/types/types'
import { isValidCNPJ } from '@/lib/validations'

const mapError = (error: any) => {
  const msg = error?.message || ''
  if (msg.includes('duplicate key value violates unique constraint') && msg.includes('cnpj')) {
    return 'Este CNPJ já está cadastrado'
  }
  if (msg.includes('Row level security policy')) {
    return 'Você não tem permissão para acessar esta empresa'
  }
  if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
    return 'Erro de conexão. Verifique sua internet.'
  }
  return 'Ocorreu um erro inesperado.'
}

export const clientesService = {
  getClientes: async (filters?: ClientesFilters) => {
    try {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error('Não autenticado')

      let query = supabase
        .from('clientes')
        .select('*', { count: 'exact' })
        .eq('consultor_id', userData.user.id)
        .order('created_at', { ascending: false })

      if (filters?.ativo !== undefined) {
        query = query.eq('ativo', filters.ativo)
      }

      if (filters?.pageSize && filters?.pageOffset !== undefined) {
        query = query.range(filters.pageOffset, filters.pageOffset + filters.pageSize - 1)
      }

      const { data, error, count } = await query

      if (error) throw error

      return { data: data as Cliente[], count }
    } catch (error) {
      throw new Error(mapError(error))
    }
  },

  getClienteById: async (id: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error('Não autenticado')

      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('id', id)
        .eq('consultor_id', userData.user.id)
        .single()

      if (error) throw error
      if (!data) throw new Error('Empresa não encontrada')

      return data as Cliente
    } catch (error) {
      if ((error as any)?.message === 'Empresa não encontrada') throw error
      throw new Error(mapError(error))
    }
  },

  createCliente: async (cliente: Partial<Cliente>) => {
    try {
      if (cliente.cnpj && !isValidCNPJ(cliente.cnpj)) {
        throw new Error('CNPJ inválido')
      }

      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error('Não autenticado')

      const { data, error } = await supabase
        .from('clientes')
        .insert({
          nome: cliente.nome!,
          cnpj: cliente.cnpj!.replace(/\D/g, ''),
          responsavel_nome: cliente.responsavel_nome!,
          responsavel_email: cliente.responsavel_email!,
          setor: cliente.setor || null,
          gerente_cs_id: cliente.gerente_cs_id || null,
          consultor_id: userData.user.id,
          ativo: true,
        })
        .select()
        .single()

      if (error) throw error

      return data as Cliente
    } catch (error) {
      if ((error as any)?.message === 'CNPJ inválido') throw error
      throw new Error(mapError(error))
    }
  },

  updateCliente: async (id: string, cliente: Partial<Cliente>) => {
    try {
      if (cliente.cnpj && !isValidCNPJ(cliente.cnpj)) {
        throw new Error('CNPJ inválido')
      }

      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error('Não autenticado')

      const updateData = { ...cliente }
      if (updateData.cnpj) {
        updateData.cnpj = updateData.cnpj.replace(/\D/g, '')
      }
      if (updateData.setor === '') {
        updateData.setor = null
      }

      const { data, error } = await supabase
        .from('clientes')
        .update(updateData)
        .eq('id', id)
        .eq('consultor_id', userData.user.id)
        .select()
        .single()

      if (error) throw error

      return data as Cliente
    } catch (error) {
      if ((error as any)?.message === 'CNPJ inválido') throw error
      throw new Error(mapError(error))
    }
  },

  deleteCliente: async (id: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error('Não autenticado')

      const { error } = await supabase
        .from('clientes')
        .update({ ativo: false })
        .eq('id', id)
        .eq('consultor_id', userData.user.id)

      if (error) throw error

      return 'Empresa inativada com sucesso!'
    } catch (error) {
      throw new Error(mapError(error))
    }
  },
}
