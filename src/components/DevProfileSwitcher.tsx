import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase/client'
import { PROFILE_ROUTES, PROFILE_LABELS } from '@/constants/constants'
import type { UserRole } from '@/types/auth'

const PROFILES = Object.keys(PROFILE_LABELS) as UserRole[]

export function DevProfileSwitcher({ mobileMode }: { mobileMode?: boolean }) {
  // Only render in development
  if (import.meta.env.MODE !== 'development') return null

  return <DevProfileSwitcherInner mobileMode={mobileMode} />
}

function DevProfileSwitcherInner({ mobileMode }: { mobileMode?: boolean }) {
  const navigate = useNavigate()

  const { user } = useAuth()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleChange = async (newPerfil: string) => {
    if (!user || isUpdating) return
    setIsUpdating(true)

    try {
      await supabase.from('usuarios').update({ perfil: newPerfil }).eq('id', user.id)

      // Navigate to new role's default route; AuthContext listener will refresh user
      const route = PROFILE_ROUTES[newPerfil] ?? '/'
      navigate(route, { replace: true })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div
      className={mobileMode ? 'flex flex-col gap-2 w-full' : 'hidden md:flex items-center gap-2'}
    >
      {!mobileMode && (
        <span className="text-xs text-muted-foreground whitespace-nowrap">Visão:</span>
      )}
      <Select value={user?.perfil ?? ''} onValueChange={handleChange} disabled={isUpdating}>
        <SelectTrigger
          className="h-8 w-40 text-xs border-border bg-card"
          aria-label="Alternar perfil de desenvolvimento"
        >
          <SelectValue placeholder="Perfil…" />
        </SelectTrigger>
        <SelectContent>
          {PROFILES.map((p) => (
            <SelectItem key={p} value={p} className="text-xs">
              {PROFILE_LABELS[p]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
