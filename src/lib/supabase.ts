import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env, isSupabaseConfigured } from '@/lib/env'

/**
 * Cliente Supabase — preparado, ainda sem uso.
 *
 * - Criado sob demanda (só quando algum serviço chamar getSupabase()).
 * - Enquanto nada importar este arquivo, o SDK não entra no bundle.
 * - Componentes não devem chamar o Supabase diretamente: use src/services/.
 */
let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY em .env.local.',
    )
  }

  client ??= createClient(env.supabaseUrl!, env.supabaseAnonKey!, {
    auth: { persistSession: false },
  })

  return client
}
