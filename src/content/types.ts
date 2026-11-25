/**
 * MODELO DE CONTEÚDO — Casa da Pizza
 *
 * Contrato único entre os dados reais (fornecidos pela Casa da Pizza) e a interface.
 * Hoje os dados vivem em arquivos .ts nesta pasta; no futuro podem vir do Supabase
 * sem mudar os componentes (eles leem apenas via src/services/).
 *
 * Regra: campo opcional ausente = informação PENDENTE. A interface mostra
 * "A confirmar" (rodapé) ou oculta o bloco — nunca inventa um valor.
 */

/* ------------------------------------------------------------------ */
/* Negócio                                                            */
/* ------------------------------------------------------------------ */

export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

/** Um intervalo de funcionamento. Ex.: ter–dom, 18:00–23:30. */
export interface OpeningHoursRange {
  days: Weekday[]
  /** "HH:MM" (24h), horário de Brasília */
  opens: string
  /** "HH:MM". Se menor que `opens`, fecha após a meia-noite. */
  closes: string
}

export interface Address {
  street: string
  number: string
  complement?: string
  district?: string
  city: string
  /** UF, ex.: "SP" */
  state: string
  /** "00000-000" */
  postalCode: string
  /** Link do Google Maps (ou similar) para "Como chegar" */
  mapsUrl?: string
  geo?: { latitude: number; longitude: number }
}

export type SocialNetwork = 'instagram' | 'facebook' | 'tiktok' | 'youtube'

export interface SocialLink {
  network: SocialNetwork
  url: string
  /** Ex.: "@casadapizza" */
  handle?: string
}

export interface DeliveryApp {
  name: string
  url: string
}

export interface BusinessInfo {
  name: string
  slogan: string
  address?: Address
  /** Formato internacional com DDI, só dígitos: "5511999999999" */
  phone?: string
  /** Formato internacional com DDI, só dígitos: "5511999999999" */
  whatsapp?: string
  email?: string
  /** Vazio = horários pendentes */
  openingHours: OpeningHoursRange[]
  /** Fuso dos horários (IANA). */
  timeZone: string
  social: SocialLink[]
  deliveryApps: DeliveryApp[]
}

/* ------------------------------------------------------------------ */
/* Cardápio                                                           */
/* ------------------------------------------------------------------ */

export interface ImageAsset {
  /** URL resolvida pelo Vite (import) ou caminho público */
  src: string
  /** Descrição real do que aparece na foto (acessibilidade) */
  alt: string
  width: number
  height: number
}

/** Preço em centavos para evitar erros de arredondamento. */
export interface PriceOption {
  /** Identificador do tamanho/variação (necessário para preços por tamanho). */
  id?: string
  /** Tamanho/variação, ex.: "Média (6 fatias)". Ausente = preço único. */
  label?: string
  /** Detalhe opcional, ex.: "6 fatias · 30 cm" */
  detail?: string
  amountCents: number
}

/** Uma escolha dentro de um grupo de opções (ex.: uma borda, um adicional). */
export interface OptionChoice {
  id: string
  label: string
  description?: string
  /** Acréscimo ao preço (0 = incluso). */
  priceDeltaCents: number
  /** Acréscimo específico por tamanho (PriceOption.id → centavos). Sobrepõe priceDeltaCents. */
  priceDeltaBySize?: Record<string, number>
  available?: boolean
}

/**
 * Grupo de opções do produto.
 *  - single: escolha exatamente uma (ex.: borda). Se required, a primeira vem marcada.
 *  - multiple: escolha de `min` a `max` itens (ex.: adicionais).
 * O tamanho NÃO é um grupo: vem de Product.prices.
 */
export interface OptionGroup {
  id: string
  label: string
  type: 'single' | 'multiple'
  required: boolean
  min?: number
  max?: number
  choices: OptionChoice[]
}

export type ProductTag = 'vegetariano' | 'vegano' | 'picante' | 'novidade' | 'sem-lactose'

export interface Category {
  id: string
  name: string
  description?: string
  /** Ordem de exibição */
  order: number
}

export interface Product {
  id: string
  categoryId: Category['id']
  name: string
  description?: string
  ingredients?: string[]
  image?: ImageAsset
  /** Um item por tamanho. Um único item = preço único. */
  prices: PriceOption[]
  /** Borda, adicionais etc. */
  optionGroups?: OptionGroup[]
  tags?: ProductTag[]
  /** false = esgotado/temporariamente indisponível */
  available: boolean
  /** Marca como "mais vendido" (definido pela Casa da Pizza) */
  bestSeller?: boolean
}

export interface Combo {
  id: string
  name: string
  description?: string
  /** Produtos incluídos (ids) ou descrição livre dos itens */
  items: { productId?: Product['id']; label: string; quantity: number }[]
  image?: ImageAsset
  price: PriceOption
  /** Ex.: "Serve 2 a 3 pessoas" (informado pela Casa da Pizza) */
  serves?: string
  available: boolean
}

export interface Promotion {
  id: string
  title: string
  description?: string
  /** Condições exibidas por extenso (obrigatório em promoções) */
  terms: string
  image?: ImageAsset
  /** Chamada curta de destaque, ex.: "2ª pizza pela metade" */
  highlight?: string
  /** Vínculo opcional com o cardápio (para abrir o produto/combo) */
  productId?: Product['id']
  comboId?: Combo['id']
  /** Data ISO "AAAA-MM-DD", inclusive */
  validFrom: string
  /** Data ISO "AAAA-MM-DD", inclusive. Vencida = some automaticamente. */
  validUntil: string
  price?: PriceOption
}

/* ------------------------------------------------------------------ */
/* Avaliações                                                         */
/* ------------------------------------------------------------------ */

export interface ReviewSource {
  /** Plataforma onde a avaliação foi publicada, ex.: "Google", "iFood" */
  name: string
  /** Link para a avaliação original (ou para o perfil, se o link direto não existir) */
  url?: string
}

/**
 * Avaliação VERIFICADA de cliente real.
 * Regras: copiar o texto sem alterações (cortes só com "…"); usar apenas a
 * identificação que o cliente tornou pública na plataforma ou autorizou.
 */
export interface Review {
  id: string
  /** Nome ou identificação autorizada, como aparece na fonte (ex.: "Ana S.") */
  author: string
  /** 1 a 5 */
  rating: 1 | 2 | 3 | 4 | 5
  text: string
  /** Data ISO "AAAA-MM-DD" da avaliação original, quando disponível */
  date?: string
  /** Origem — obrigatória (transparência) */
  source: ReviewSource
}

/**
 * Nota média OFICIAL de uma plataforma (ex.: perfil do Google).
 * O site nunca calcula média própria: este resumo é copiado da fonte,
 * com link e data da consulta para que qualquer pessoa possa verificar.
 */
export interface RatingSummary {
  platform: string
  /** Média exibida pela plataforma, ex.: 4.8 */
  average: number
  /** Escala máxima da plataforma (normalmente 5) */
  scale: number
  /** Total de avaliações informado pela plataforma */
  count: number
  /** Página pública onde a média pode ser conferida */
  url: string
  /** Data ISO "AAAA-MM-DD" em que os números foram consultados */
  checkedAt: string
}
