import * as React from 'react'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  className?: string
}

export function ProgressBar({ value, className }: ProgressBarProps) {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 100)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-muted', className)}>
      <div
        className="h-full bg-secondary transition-all duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)] rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
