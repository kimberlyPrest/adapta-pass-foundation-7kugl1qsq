import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { HealthStatus } from '@/types/types'

interface HealthDotProps {
  status: HealthStatus
  tooltipText?: string
  className?: string
}

export function HealthDot({ status, tooltipText, className }: HealthDotProps) {
  const colors = {
    Green: 'bg-[hsl(142,70%,45%)]',
    Yellow: 'bg-[hsl(45,90%,50%)]',
    Red: 'bg-[hsl(0,84%,60%)]',
  }

  const dot = <div className={cn('h-3 w-3 rounded-full', colors[status], className)} />

  if (!tooltipText) return dot

  return (
    <Tooltip>
      <TooltipTrigger asChild>{dot}</TooltipTrigger>
      <TooltipContent>
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  )
}
