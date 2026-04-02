import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { ASAStatus } from '@/types/types'

interface BadgeASAProps {
  type: ASAStatus
  className?: string
}

export function BadgeASA({ type, className }: BadgeASAProps) {
  const typeClasses = {
    Amplificar: 'bg-primary text-primary-foreground hover:bg-primary/80',
    Sistematizar: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent',
    Automatizar:
      'bg-[hsl(280,70%,55%)] text-white hover:bg-[hsl(280,70%,55%)]/80 border-transparent',
  }
  return <Badge className={cn(typeClasses[type], className)}>{type}</Badge>
}
