import { cn } from '@/lib/utils'

export type ASAStatus = 'Amplificar' | 'Sistematizar' | 'Automatizar'

interface BadgeASAProps {
  type: ASAStatus
  className?: string
}

export function BadgeASA({ type, className }: BadgeASAProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ease-in-out',
        type === 'Amplificar' && 'border-blue-500 text-blue-700 bg-blue-50',
        type === 'Sistematizar' && 'border-purple-500 text-purple-700 bg-purple-50',
        type === 'Automatizar' && 'border-orange-500 text-orange-700 bg-orange-50',
        className,
      )}
    >
      {type}
    </div>
  )
}
