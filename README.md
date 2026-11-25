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

| Variável                                       | Uso                                                                                                                                                                       |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_SITE_URL`                                | Domínio final. Gera canonical, Open Graph, `sitemap.xml` e `robots.txt`. Sem ela, o build bloqueia indexação.                                                             |
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` | Integração futura com Supabase (somente chave pública `anon`).                                                                                                            |
| `VITE_SHOW_DEMO_CONTENT`                       | `true` exibe o cardápio de **teste** (`src/dev/demo-menu.ts`) enquanto o oficial está vazio. Sem a flag, os dados de teste ficam fora do build. Nunca ativar em produção. |

## Estrutura

```
src/
├── styles/        tokens.css (design system), fonts.css e globals.css
├── components/
│   ├── ui/        Button, Heading, Container, Eyebrow, Editorial
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
scripts/seo-files.ts     gera robots.txt e sitemap.xml no build
scripts/font-preload.ts  pré-carrega as fontes críticas no index.html
```

## Design system

- **Tokens**: `src/styles/tokens.css` — cores, escala tipográfica, espaçamentos, larguras,
  raios, sombras e movimento. Gera classes Tailwind (`bg-accent`, `text-h2`, `rounded-lg`,
  `max-w-narrow`, `gap-stack-md`, `px-gutter`…).
- **Fontes** (`src/styles/fonts.css`, licença SIL OFL 1.1, cópias em `public/licenses/`):
  Oswald (títulos) · Inter (texto e interface) · Playfair Display itálico (detalhes editoriais).
  Hospedadas localmente, só subconjunto latin; Inter e Oswald pré-carregadas no build.
- **Componentes** (`src/components/ui`): `Button` (primary · secondary · ghost; sm · md · lg;
  ícones, carregando, desabilitado, link), `Heading` (nível semântico separado do tamanho
  visual), `Container` (narrow · default · wide · full), `Eyebrow`, `Editorial`.
- **Utilitários de interação** (`globals.css`): `link-underline`, `interactive-lift`.
- **Movimento** (`src/components/motion`): `Reveal`, `Parallax`, `SplitText`.

Página oficial em construção: `/` (Header, Hero, espaços reservados das seções, Footer).
Telas de demonstração (temporárias, `src/dev`): `/?demo=identidade` · `/?demo=movimento`.

## Marca

- **Logo oficial**: `brand/logo-original.png` (PNG 1254×1254, único arquivo existente — não há vetor).
- **Selo para o site**: `python3 scripts/process-logo.py` (requer Pillow) recorta apenas o
  exterior do círculo da corrente, verifica que o interior é idêntico ao original e gera
  `src/assets/brand/logo-selo-*.{avif,webp}`, ícones em `public/` e o mestre transparente
  `public/brand/logo-casa-da-pizza-selo.png`. Use sempre `<Logo size={…} />`.
- **Nunca** recolorir, distorcer, redesenhar ou sobrepor elementos à logo.

## Conteúdo

- Modelo em `src/content/types.ts`; dados em `src/content/*.ts` (negócio, cardápio, destaques,
  avaliações). Componentes leem via `src/services/`, preparado para migrar ao Supabase.
- **Campo ausente = pendente**: o rodapé mostra "A confirmar"; seções sem dados não exibem
  valores inventados. Preencher somente com informações oficiais da Casa da Pizza.
- **Cardápio**: produtos com tamanhos (`prices`) e grupos de opções (borda, adicionais) com
  acréscimos fixos ou por tamanho; cálculo em `src/lib/pricing.ts`. Detalhe com transição
  GSAP Flip entre cartão e painel.
- **Destaques**: mais vendidos = `Product.bestSeller` do cardápio (mesmo detalhe e preços);
  combos com itens vinculados por `productId`; promoções exigem `terms` e validade e só aparecem
  vigentes (fuso de Brasília, `src/lib/dates.ts`).
- Horários em `America/Sao_Paulo`; "Aberto agora" calculado por `src/lib/opening-hours.ts`.
- **Foto do Hero**: `src/content/media.ts` (requisitos no arquivo). Sem foto, o Hero exibe um
  espaço reservado identificado. Nunca usar imagem gerada por IA como fotografia de produto.

## Convenções

- **Cores**: use tokens semânticos (`bg-surface`, `text-foreground`, `text-accent`) ou de marca
  (`bg-brand-red`). Nunca hexadecimais soltos.
- **Vermelho com moderação**: ação principal e destaques pontuais (≤ 5% da área). Nunca fundo
  de seções inteiras.
- **Contraste**: vermelho como texto sobre preto (3.83:1) e branco sobre verde (3.53:1) só
  em texto grande e ícones; texto pequeno sempre branco/cinza claro. Branco sobre o vermelho
  #DB0102: 5.23:1. Foco: anel branco.
- **Breakpoints** mobile-first: base < 640 · `sm` 640 · `md` 768 (tablet) · `lg` 1024 · `xl` 1280 (desktop) · `2xl` 1536.
- **Movimento**: toda animação deve respeitar `prefers-reduced-motion`.
- **Conteúdo**: apenas informações reais fornecidas pela Casa da Pizza.

## Deploy (Vercel)

`vercel.json` já define build, rotas da SPA, cache imutável para `/assets` e cabeçalhos de
segurança. Basta importar o repositório na Vercel e definir as variáveis de ambiente.
