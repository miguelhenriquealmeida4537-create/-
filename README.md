# Casa da Pizza

Site institucional da Casa da Pizza — direção visual **Modern Pizzeria | Premium Casual**.

## Stack

Vite · React 19 · TypeScript (strict) · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis · React Bits · Lucide React

## Comandos

```bash
npm install        # instala dependências
npm run dev        # servidor de desenvolvimento (http://localhost:5173)
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o build localmente
npm run lint       # ESLint
npm run typecheck  # checagem de tipos
npm run format     # Prettier (ordena classes Tailwind)
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local`. Na Vercel, cadastre as mesmas variáveis em
_Project Settings → Environment Variables_.

| Variável                                       | Uso                                                                                                           |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `VITE_SITE_URL`                                | Domínio final. Gera canonical, Open Graph, `sitemap.xml` e `robots.txt`. Sem ela, o build bloqueia indexação. |
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` | Integração futura com Supabase (somente chave pública `anon`).                                                |

## Estrutura

```
src/
├── styles/        tokens.css (paleta, tipografia, espaçamentos) e globals.css
├── components/
│   ├── ui/        peças básicas reutilizáveis (Button, Heading…)
│   ├── layout/    Header, Footer, SkipLink
│   ├── motion/    componentes de animação (GSAP)
│   └── reactbits/ componentes React Bits adaptados à marca
├── sections/      blocos da página (Hero, Sobre…)
├── providers/     Lenis, preferência de movimento
├── hooks/         hooks reutilizáveis
├── lib/           env.ts, supabase.ts, gsap.ts
├── services/      acesso a dados (Supabase) — componentes não chamam o Supabase direto
├── seo/           site.config.ts (fonte única), Seo.tsx, jsonld.ts
├── content/       textos reais da marca
├── types/         tipos compartilhados
└── dev/           telas temporárias de verificação (remover antes do lançamento)
scripts/seo-files.ts   gera robots.txt e sitemap.xml no build
```

## Convenções

- **Cores**: use tokens semânticos (`bg-surface`, `text-foreground`, `text-accent`) ou de marca
  (`bg-brand-red`). Nunca hexadecimais soltos.
- **Contraste**: branco sobre vermelho (4.37:1) e branco sobre verde (3.53:1) só para texto
  grande e ícones. Tabela completa em `src/styles/tokens.css`.
- **Breakpoints** mobile-first: base < 640 · `sm` 640 · `md` 768 (tablet) · `lg` 1024 · `xl` 1280 (desktop) · `2xl` 1536.
- **Movimento**: toda animação deve respeitar `prefers-reduced-motion`.
- **Conteúdo**: apenas informações reais fornecidas pela Casa da Pizza.

## Deploy (Vercel)

`vercel.json` já define build, rotas da SPA, cache imutável para `/assets` e cabeçalhos de
segurança. Basta importar o repositório na Vercel e definir as variáveis de ambiente.
