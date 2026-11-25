/**
 * Leitura centralizada das variáveis de ambiente.
 * Nenhum outro arquivo deve acessar import.meta.env diretamente.
 */
const trimOrUndefined = (value: string | undefined) => {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

export const env = {
  siteUrl: trimOrUndefined(import.meta.env.VITE_SITE_URL)?.replace(/\/+$/, ''),
  supabaseUrl: trimOrUndefined(import.meta.env.VITE_SUPABASE_URL),
  supabaseAnonKey: trimOrUndefined(import.meta.env.VITE_SUPABASE_ANON_KEY),
  isDev: import.meta.env.DEV,
} as const

export const isSupabaseConfigured = Boolean(env.supabaseUrl && env.supabaseAnonKey)
