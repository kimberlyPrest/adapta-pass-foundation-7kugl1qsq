import { cn } from '@/lib/utils'

export type HealthStatus = 'Green' | 'Yellow' | 'Red'

interface HealthDotProps {
  status: HealthStatus
  className?: string
  tooltipText?: string
}

export function HealthDot({ status, className, tooltipText }: HealthDotProps) {
  return (
    <div
      className={cn(
        'h-3 w-3 rounded-full transition-all ease-in-out duration-300',
        status === 'Green' && 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]',
        status === 'Yellow' && 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]',
        status === 'Red' && 'bg-rose-500 shadow-[0_0_8px_rgba(225,29,72,0.5)]',
        className,
      )}
      title={tooltipText || `Status: ${status}`}
    />
  )
}
