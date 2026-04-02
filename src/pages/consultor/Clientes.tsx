import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SectionTitle } from '@/components/ui/section-title'
import { Card, CardContent } from '@/components/ui/card'
import { HealthDot } from '@/components/ui/health-dot'
import { BadgeASA } from '@/components/ui/badge-asa'
import { useClientes } from '@/hooks/useClientes'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { ClienteFormData, clienteSchema } from '@/lib/validations'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Cliente } from '@/types/types'

export default function ConsultorClientes() {
  const [ativoFilter, setAtivoFilter] = useState<boolean>(true)
  const [pageOffset, setPageOffset] = useState(0)
  const pageSize = 12

  const {
    data: clientes,
    isLoading,
    error,
    hasMore,
    createMutation,
    updateMutation,
    deleteMutation,
    fetchClientes,
  } = useClientes({ ativo: ativoFilter, pageSize, pageOffset })

  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const form = useForm<ClienteFormData>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      nome: '',
      cnpj: '',
      responsavel_nome: '',
      responsavel_email: '',
      setor: '',
    },
  })

  useEffect(() => {
    fetchClientes({ ativo: ativoFilter, pageSize, pageOffset }, pageOffset > 0)
  }, [pageOffset, ativoFilter, fetchClientes])

  const handleOpenCreate = () => {
    setEditingId(null)
    form.reset({
      nome: '',
      cnpj: '',
      responsavel_nome: '',
      responsavel_email: '',
      setor: '',
    })
    setIsSheetOpen(true)
  }

  const handleOpenEdit = (e: React.MouseEvent, cliente: Cliente) => {
    e.preventDefault()
    setEditingId(cliente.id)
    form.reset({
      nome: cliente.nome,
      cnpj: cliente.cnpj,
      responsavel_nome: cliente.responsavel_nome,
      responsavel_email: cliente.responsavel_email,
      setor: cliente.setor || '',
    })
    setIsSheetOpen(true)
  }

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    if (confirm('Deseja realmente inativar esta empresa?')) {
      deleteMutation.mutate(id)
    }
  }

  const onSubmit = (values: ClienteFormData) => {
    if (editingId) {
      updateMutation.mutate(
        { id: editingId, ...values },
        { onSuccess: () => setIsSheetOpen(false) },
      )
    } else {
      createMutation.mutate(values, {
        onSuccess: () => {
          setIsSheetOpen(false)
          form.reset()
        },
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <SectionTitle
          title="Meus Clientes"
          subtitle="Lista de todos os clientes sob sua responsabilidade."
        />
        <Button onClick={handleOpenCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Empresa
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="ativo-filter"
          checked={ativoFilter}
          onCheckedChange={(checked) => {
            setAtivoFilter(checked as boolean)
            setPageOffset(0)
          }}
        />
        <label
          htmlFor="ativo-filter"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Mostrar apenas ativos
        </label>
      </div>

      {error ? (
        <div className="p-4 bg-destructive/10 text-destructive rounded-md">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading && pageOffset === 0 ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-24" />
                </CardContent>
              </Card>
            ))
          ) : clientes.length === 0 ? (
            <div className="col-span-full py-12 text-center text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
              Nenhuma empresa encontrada.
            </div>
          ) : (
            clientes.map((c) => (
              <Link key={c.id} to={`/consultor/clientes/${c.id}`}>
                <Card className="hover:border-primary/50 transition-colors h-full relative group">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-display text-lg font-bold pr-16">{c.nome}</h3>
                      <HealthDot status={'Green'} tooltipText="Status: Green" />
                    </div>
                    <BadgeASA type={'Sistematizar'} />
                    <div className="text-sm text-muted-foreground mt-2">
                      <p>
                        CNPJ:{' '}
                        {c.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')}
                      </p>
                      <p>Responsável: {c.responsavel_nome}</p>
                    </div>
                  </CardContent>

                  <div className="absolute top-4 right-10 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 bg-background/80 backdrop-blur-sm rounded-md shadow-sm p-1 border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-primary"
                      onClick={(e) => handleOpenEdit(e, c)}
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    {c.ativo && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={(e) => handleDelete(e, c.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      )}

      {hasMore && !isLoading && (
        <div className="flex justify-center mt-6">
          <Button variant="outline" onClick={() => setPageOffset((prev) => prev + pageSize)}>
            Carregar mais
          </Button>
        </div>
      )}
      {isLoading && pageOffset > 0 && (
        <div className="flex justify-center mt-6">
          <p className="text-sm text-muted-foreground animate-pulse">Carregando...</p>
        </div>
      )}

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{editingId ? 'Editar Empresa' : 'Nova Empresa'}</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: TechCorp S.A." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cnpj"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CNPJ</FormLabel>
                      <FormControl>
                        <Input placeholder="00.000.000/0000-00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="responsavel_nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Responsável</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="responsavel_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail do Responsável</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@empresa.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="setor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Setor (Opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Tecnologia" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-4 flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsSheetOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">{editingId ? 'Salvar Alterações' : 'Criar Empresa'}</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
