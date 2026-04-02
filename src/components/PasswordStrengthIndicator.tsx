import { Check, X } from 'lucide-react'

interface PasswordStrengthIndicatorProps {
  password?: string
}

export function PasswordStrengthIndicator({ password = '' }: PasswordStrengthIndicatorProps) {
  const hasLength = password.length >= 8
  const hasUpper = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)

  const score = [hasLength, hasUpper, hasNumber].filter(Boolean).length
  const progress = (score / 3) * 100

  let colorClass = 'bg-red-500'
  if (score === 2) colorClass = 'bg-yellow-500'
  if (score === 3) colorClass = 'bg-green-500'

  return (
    <div className="space-y-3 mt-2 animate-fade-in">
      <div className="h-1.5 w-full bg-secondary/20 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ease-out ${colorClass}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <ul className="text-sm space-y-1.5 text-muted-foreground">
        <li className="flex items-center gap-2">
          {hasLength ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4" />}
          <span className={hasLength ? 'text-foreground' : ''}>Mínimo 8 caracteres</span>
        </li>
        <li className="flex items-center gap-2">
          {hasUpper ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4" />}
          <span className={hasUpper ? 'text-foreground' : ''}>Pelo menos uma letra maiúscula</span>
        </li>
        <li className="flex items-center gap-2">
          {hasNumber ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4" />}
          <span className={hasNumber ? 'text-foreground' : ''}>Pelo menos um número</span>
        </li>
      </ul>
    </div>
  )
}
