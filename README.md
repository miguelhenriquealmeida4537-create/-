# Casa da Pizza

Site institucional da Casa da Pizza — direção visual **Modern Pizzeria | Premium Casual**.

## Stack

Vite · React 19 · TypeScript (strict) · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis · React Bits · Lucide React

## Comandos

```bash
npm install        # instala dependências
npm run dev        # servidor de desenvolvimento (http://localhost:5173)
npm run build      # typecheck + build + pré-renderização do HTML em dist/
npm run preview    # serve o build localmente
npm test           # testes unitários (Vitest): preço, datas, horários, avaliações
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
| `VITE_ALLOW_INDEXING`                          | `true` libera buscadores (remove `noindex`, gera `sitemap.xml`, `robots.txt` com `Allow`). Exige `VITE_SITE_URL`. Só no lançamento.                                       |
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` | Integração futura com Supabase (somente chave pública `anon`).                                                                                                            |
| `VITE_SHOW_DEMO_CONTENT`                       | `true` exibe o cardápio de **teste** (`src/dev/demo-menu.ts`) enquanto o oficial está vazio. Sem a flag, os dados de teste ficam fora do build. Nunca ativar em produção. |

## Estrutura

```
src/
├── App.tsx            página única: Header + seções + Footer
├── main.tsx           hidrata o HTML pré-renderizado (ou renderiza no dev)
├── entry-server.tsx   pré-renderização (usado só no build)
├── styles/            tokens.css (design system), fonts.css e globals.css
├── components/
│   ├── brand/         Logo (selo oficial)
│   ├── ui/            Button, Heading, Container, Eyebrow, Editorial, Pending, Rating
│   ├── layout/        Header, MobileMenu, Footer, OpeningStatus, SkipLink
│   ├── motion/        Reveal, Parallax, SplitText (GSAP)
│   └── reactbits/     componentes React Bits adaptados à marca (nenhum em uso ainda)
├── sections/          hero/, menu/, highlights/, reviews/ e HomeSections.tsx
├── providers/         Lenis e preferência de movimento
├── hooks/             useModalDialog, useActiveSection, useClientNow, useReducedMotion…
├── lib/               pricing, dates, opening-hours, reviews, format, gsap, env (+ __tests__)
├── services/          leitura de dados — componentes nunca importam content/ direto
├── content/           dados OFICIAIS (vazios = pendente) e types.ts (modelo)
├── seo/               site.config.ts (fonte única), Seo/HeadTags, jsonld.ts
└── dev/               conteúdo de TESTE (demo-menu, demo-reviews) e seus avisos
scripts/
├── prerender.mjs      injeta HTML da página e meta tags no dist/index.html
├── seo-files.ts       robots.txt e sitemap.xml (conforme VITE_ALLOW_INDEXING)
├── font-preload.ts    pré-carrega as fontes críticas
└── process-logo.py    selo circular, ícones e imagem de compartilhamento a partir da logo
```

## Build e desempenho

- **Pré-renderização**: o build gera o HTML completo da página (e as meta tags no `<head>`);
  no navegador o React apenas hidrata. Primeira pintura sem esperar o JavaScript.
- **Datas sempre no navegador**: validade de promoções e "Aberto agora" usam `useClientNow`
  e nunca são decididas na data do build.
- **Entrada do Hero**: o HTML chega com `data-hero-intro` (conteúdo oculto pelo CSS até o JS
  assumir, com revelação automática após 1,6 s se o JS atrasar — sem piscar).
- **CSP** (`vercel.json`): sem `unsafe-inline`. Não use `style="…"`/`<script>` inline; ao
  integrar serviços externos (mapas, analytics), acrescente os domínios na política.

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

Página única em `/`. Telas de demonstração das Etapas 3 e 4 foram removidas na 5.6 (estão no histórico do git).

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
- **Avaliações**: só verificadas (`src/content/reviews.ts`), com fonte obrigatória e link/data
  quando houver. Nota média **nunca é calculada**: só aparece via `ratingSummaries` (resumo oficial
  da plataforma, com link e data da consulta).
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

## Checklist de lançamento

1. Preencher os dados **oficiais** em `src/content/` (negócio, cardápio, combos, promoções,
   avaliações e `ratingSummaries`) e a foto do Hero em `src/content/media.ts`.
2. Conferir que o conteúdo de teste não aparece: sem `VITE_SHOW_DEMO_CONTENT` em produção
   (com dados oficiais, os de teste já são ignorados automaticamente).
3. Definir `VITE_SITE_URL` (domínio final) e `VITE_ALLOW_INDEXING=true` na Vercel (Produção).
4. Revisar a descrição do site em `src/seo/site.config.ts` e, se houver foto oficial,
   trocar `public/og/og-default.jpg` (1200×630).
5. `npm test && npm run build` sem erros; validar o `robots.txt`, o `sitemap.xml` e as meta tags
   do `dist/index.html`.
6. Apagar `src/dev/` quando não houver mais conteúdo de teste e remover os imports em
   `src/services/`.
