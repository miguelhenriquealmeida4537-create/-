/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
  readonly VITE_SHOW_DEMO_CONTENT?: string
  readonly VITE_ALLOW_INDEXING?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** Definido em vite.config.ts: exibe conteúdo de teste (dev ou VITE_SHOW_DEMO_CONTENT=true). */
declare const __SHOW_DEMO_CONTENT__: boolean
