import { Flame, Leaf } from 'lucide-react'
import type { ProductTag } from '@/content/types'

const TAG_LABEL: Record<ProductTag, string> = {
  vegetariano: 'Vegetariano',
  vegano: 'Vegano',
  picante: 'Picante',
  novidade: 'Novidade',
  'sem-lactose': 'Sem lactose',
}

export function TagChip({ tag }: { tag: ProductTag }) {
  const Icon = tag === 'picante' ? Flame : tag === 'vegetariano' || tag === 'vegano' ? Leaf : null
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-caption text-foreground-muted">
      {Icon && <Icon className="size-3 text-accent-secondary" aria-hidden="true" />}
      {TAG_LABEL[tag]}
    </span>
  )
}
