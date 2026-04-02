import { supabase } from '@/lib/supabase/client'

// ─── Error translation ────────────────────────────────────────────────────────

function translateError(message: string): string {
  if (message.includes('Invalid login credentials')) return 'E-mail ou senha incorretos'
  if (message.includes('Email not confirmed')) return 'Confirme seu e-mail antes de acessar'
  if (message.includes('User already registered')) return 'Este e-mail já está cadastrado'
  return 'Ocorreu um erro. Tente novamente.'
}

// ─── Auth functions ───────────────────────────────────────────────────────────

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(translateError(error.message))
  return data.user
}

export async function signInWithMagicLink(email: string) {
  const { error } = await supabase.auth.signInWithOtp({ email })
  if (error) throw new Error(translateError(error.message))
  return true
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(translateError(error.message))
}

export async function resetPassword(email: string) {
  const redirectTo = `${window.location.origin}/reset-password`
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
  if (error) throw new Error(translateError(error.message))
  return true
}

export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({ password })
  if (error) throw new Error(translateError(error.message))
  return true
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw new Error(translateError(error.message))
  return data.session
}

export function onAuthStateChange(callback: Parameters<typeof supabase.auth.onAuthStateChange>[0]) {
  const { data } = supabase.auth.onAuthStateChange(callback)
  return data.subscription
}
