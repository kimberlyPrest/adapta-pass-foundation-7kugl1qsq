import { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Trend } from '@/types/types'

interface StatCardProps {
  icon: ReactNode
  title: string
  value: string
  subtitle?: string
  trend?: Trend
  className?: string
}

export function StatCard({ icon, title, value, subtitle, trend, className }: StatCardProps) {
  return (
    <Card className={cn('transition-transform hover:scale-[1.02] duration-300', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="h-8 w-8 rounded-md bg-muted/50 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-3xl font-display font-bold">{value}</div>
          {trend && (
            <p className="flex items-center text-xs text-muted-foreground">
              <span
                className={cn(
                  'mr-1 flex items-center font-medium',
                  trend.direction === 'up'
                    ? 'text-[hsl(142,70%,45%)]'
                    : trend.direction === 'down'
                      ? 'text-destructive'
                      : 'text-muted-foreground',
                )}
              >
                {trend.direction === 'up' && <ArrowUpIcon className="h-3 w-3 mr-1" />}
                {trend.direction === 'down' && <ArrowDownIcon className="h-3 w-3 mr-1" />}
                {trend.direction === 'neutral' && <MinusIcon className="h-3 w-3 mr-1" />}
                {trend.value}%
              </span>
              em relação ao mês passado
            </p>
          )}
          {subtitle && !trend && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
