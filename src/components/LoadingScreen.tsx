import { Skeleton } from '@/components/ui/skeleton'

export function LoadingScreen() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-16 border-b flex items-center px-6 gap-4 border-border/40">
        <Skeleton className="h-8 w-32" />
        <div className="ml-auto flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
      <div className="h-12 border-b flex items-center px-6 gap-4 border-border/40">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="max-w-7xl mx-auto w-full p-6 space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    </div>
  )
}
