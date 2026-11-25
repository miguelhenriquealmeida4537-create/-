import { X } from 'lucide-react'
import { useId, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { Button } from '@/components/ui'
import type { OptionGroup, Product } from '@/content/types'
import { DemoContentNotice, TestBadge } from '@/dev/DemoContent'
import { useModalDialog } from '@/hooks/useModalDialog'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/lib/format'
import { EASE_BRAND, Flip, gsap } from '@/lib/gsap'
import {
  choiceDelta,
  computePrice,
  initialSelection,
  sizeKey,
  toggleChoice,
  type ProductSelection,
} from '@/lib/pricing'
import { TagChip } from '@/sections/menu/TagChip'
import { ProductImage } from '@/sections/menu/ProductImage'

interface ProductDetailProps {
  product: Product | null
  isDemo: boolean
  /** Imagem do cartão de origem (para a transição Flip de ida e volta) */
  originRef: RefObject<HTMLElement | null>
  onClosed: () => void
}

const deltaLabel = (cents: number) => (cents === 0 ? 'Incluso' : `+ ${formatPrice(cents)}`)

/**
 * Detalhe do produto em <dialog> modal.
 *
 * Celular: folha que sobe de baixo (até 92% da altura). Desktop: painel com a
 * foto à esquerda e as opções à direita. A foto "voa" do cartão para o detalhe
 * (GSAP Flip) e volta ao fechar. Com redução de movimento, abre e fecha sem animação.
 */
export function ProductDetail({ product, isDemo, originRef, onClosed }: ProductDetailProps) {
  const reducedMotion = useReducedMotion()
  const imageRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closing = useRef(false)

  // Mantém o último produto renderizado durante a animação de saída
  const [shown, setShown] = useState<Product | null>(product)
  if (product && product !== shown) setShown(product)

  const open = product !== null

  // Cada abertura é uma nova "sessão": as opções sempre recomeçam do padrão
  const [session, setSession] = useState(0)
  const [wasOpen, setWasOpen] = useState(open)
  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) setSession((n) => n + 1)
  }

  const requestClose = () => {
    const dialog = dialogRef.current
    if (!dialog || closing.current) return
    const origin = originRef.current
    const image = imageRef.current

    if (reducedMotion || !origin || !image) {
      dialog.close()
      onClosed()
      return
    }

    closing.current = true
    const state = Flip.getState(image)
    dialog.close() // foco volta ao cartão; rolagem destrava
    gsap.set(origin, { opacity: 1 })
    Flip.from(state, {
      targets: origin,
      duration: 0.5,
      ease: 'power3.inOut',
      scale: true,
      zIndex: 40,
      onComplete: () => {
        closing.current = false
      },
    })
    onClosed()
  }

  const dialogRef = useModalDialog({ open, onRequestClose: requestClose })

  // Entrada: Flip do cartão para o detalhe + painel e conteúdo
  useLayoutEffect(() => {
    if (!open || reducedMotion) return
    const origin = originRef.current
    const image = imageRef.current
    const panel = panelRef.current
    if (!origin || !image || !panel) return

    const state = Flip.getState(origin)
    gsap.set(origin, { opacity: 0 }) // a foto "sai" do cartão
    const isSheet = window.matchMedia('(max-width: 767.98px)').matches

    const tl = gsap.timeline({ defaults: { ease: EASE_BRAND } })
    tl.from(panel.querySelector('[data-detail-surface]'), {
      opacity: 0,
      ...(isSheet ? { yPercent: 12 } : { scale: 0.97 }),
      duration: 0.45,
    })
      .add(
        Flip.from(state, { targets: image, duration: 0.65, ease: 'power3.inOut', scale: true }),
        0,
      )
      .from(
        panel.querySelectorAll('[data-detail-fade]'),
        { opacity: 0, y: 14, duration: 0.5, stagger: 0.05, clearProps: 'all' },
        0.2,
      )

    return () => {
      tl.progress(1).kill()
    }
  }, [open, reducedMotion, originRef])

  // Se o detalhe fechar por outro caminho (ex.: desmontagem), devolve a foto ao cartão
  useLayoutEffect(() => {
    if (!open && originRef.current && !closing.current) gsap.set(originRef.current, { opacity: 1 })
  }, [open, originRef])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="produto-titulo"
      className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-foreground backdrop:bg-brand-black/75"
    >
      {shown && (
        <ProductDetailContent
          key={`${shown.id}-${session}`}
          product={shown}
          isDemo={isDemo}
          imageRef={imageRef}
          panelRef={panelRef}
          onClose={requestClose}
        />
      )}
    </dialog>
  )
}

interface ContentProps {
  product: Product
  isDemo: boolean
  imageRef: RefObject<HTMLDivElement | null>
  panelRef: RefObject<HTMLDivElement | null>
  onClose: () => void
}

function ProductDetailContent({ product, isDemo, imageRef, panelRef, onClose }: ContentProps) {
  const [selection, setSelection] = useState<ProductSelection>(() => initialSelection(product))
  const { totalCents, lines } = computePrice(product, selection)
  const uid = useId()
  const multipleSizes = product.prices.length > 1

  return (
    <div className="pointer-events-none flex h-full items-end justify-center md:items-center md:p-8">
      <div
        ref={panelRef}
        className="pointer-events-auto relative flex max-h-[92dvh] w-full flex-col md:max-h-[min(88dvh,52rem)] md:max-w-5xl md:flex-row"
      >
        {/* Superfície do painel (animada separadamente da foto) */}
        <div
          data-detail-surface
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-t-xl border border-border bg-surface-raised shadow-lg md:rounded-xl"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes do produto"
          className="absolute top-3 right-3 z-10 grid size-11 place-items-center rounded-full bg-surface/85 backdrop-blur transition-colors hover:bg-surface"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <ProductImage
          ref={imageRef}
          image={product.image}
          flipId={`produto-${product.id}`}
          priority
          className="h-[28dvh] shrink-0 rounded-t-xl md:h-auto md:w-[46%] md:rounded-l-xl md:rounded-tr-none"
        />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <div className="flex flex-col gap-stack-md p-5 sm:p-8">
              {isDemo && (
                <div data-detail-fade>
                  <DemoContentNotice />
                </div>
              )}

              <header data-detail-fade className="flex flex-col gap-3 pr-10">
                <div className="flex items-start gap-3">
                  <h2 id="produto-titulo" className="font-display text-h3 font-semibold">
                    {product.name}
                  </h2>
                  {isDemo && <TestBadge className="mt-1.5" />}
                </div>
                {product.description && (
                  <p className="text-foreground-muted">{product.description}</p>
                )}
                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {product.tags.map((t) => (
                      <TagChip key={t} tag={t} />
                    ))}
                  </div>
                )}
                {product.ingredients && product.ingredients.length > 0 && (
                  <p className="text-small text-foreground-subtle">
                    <span className="text-foreground-muted">Ingredientes: </span>
                    {product.ingredients.join(', ')}
                  </p>
                )}
              </header>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-stack-md"
                aria-label="Opções do produto"
              >
                {multipleSizes && (
                  <fieldset data-detail-fade className="flex flex-col gap-3">
                    <legend className="mb-3 flex w-full items-baseline justify-between">
                      <span className="font-display text-h4 font-medium">Tamanho</span>
                      <span className="text-caption text-foreground-subtle">Obrigatório</span>
                    </legend>
                    <div className="grid gap-2 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3">
                      {product.prices.map((size, i) => {
                        const id = sizeKey(size, i)
                        return (
                          <label
                            key={id}
                            className="flex cursor-pointer flex-col gap-1 rounded-md border border-border px-4 py-3 transition-colors hover:border-border-strong has-checked:border-brand-white has-checked:bg-brand-white/6 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus"
                          >
                            <span className="flex items-center gap-2.5">
                              <input
                                type="radio"
                                name={`${uid}-tamanho`}
                                value={id}
                                checked={selection.sizeId === id}
                                onChange={() => setSelection((s) => ({ ...s, sizeId: id }))}
                                className="size-4 shrink-0 accent-(--color-accent) focus-visible:outline-none"
                              />
                              <span className="text-small font-medium">{size.label}</span>
                            </span>
                            {size.detail && (
                              <span className="pl-6.5 text-caption text-foreground-subtle">
                                {size.detail}
                              </span>
                            )}
                            <span className="pl-6.5 font-display text-body font-semibold tabular-nums">
                              {formatPrice(size.amountCents)}
                            </span>
                          </label>
                        )
                      })}
                    </div>
                  </fieldset>
                )}

                {(product.optionGroups ?? []).map((group) => (
                  <OptionGroupField
                    key={group.id}
                    group={group}
                    name={`${uid}-${group.id}`}
                    selection={selection}
                    onToggle={(choiceId) => setSelection((s) => toggleChoice(s, group, choiceId))}
                  />
                ))}
              </form>
            </div>
          </div>

          {/* Rodapé fixo com o total */}
          <footer
            data-detail-fade
            className="flex shrink-0 flex-col gap-2 border-t border-border bg-surface-raised px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8 md:rounded-br-xl"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:flex-col md:items-stretch xl:flex-row xl:items-center">
              <p className="flex items-baseline gap-2">
                <span className="text-small text-foreground-muted">Total</span>
                <span
                  aria-live="polite"
                  aria-atomic="true"
                  className="font-display text-h3 font-semibold tabular-nums"
                >
                  <span className="sr-only">Total: </span>
                  {formatPrice(totalCents)}
                </span>
                {isDemo && <TestBadge />}
              </p>
              <Button disabled aria-describedby={`${uid}-pedido`}>
                Pedido online em breve
              </Button>
            </div>
            <div className="flex flex-col gap-1 text-caption text-foreground-subtle">
              {lines.length > 1 && (
                <p>{lines.map((l) => `${l.label} ${formatPrice(l.amountCents)}`).join(' + ')}</p>
              )}
              <p id={`${uid}-pedido`}>Pedidos pelo site ainda não estão disponíveis.</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

interface OptionGroupFieldProps {
  group: OptionGroup
  name: string
  selection: ProductSelection
  onToggle: (choiceId: string) => void
}

function OptionGroupField({ group, name, selection, onToggle }: OptionGroupFieldProps) {
  const selected = selection.choices[group.id] ?? []
  const isMultiple = group.type === 'multiple'
  const atMax = isMultiple && group.max !== undefined && selected.length >= group.max
  const hintId = `${name}-dica`

  const hint = isMultiple
    ? `${group.required ? 'Obrigatório' : 'Opcional'}${group.max ? ` · até ${group.max}` : ''}`
    : group.required
      ? 'Obrigatório · escolha 1'
      : 'Opcional'

  return (
    <fieldset data-detail-fade aria-describedby={hintId} className="flex flex-col">
      <legend className="mb-3 flex w-full items-baseline justify-between gap-3">
        <span className="font-display text-h4 font-medium">{group.label}</span>
        <span id={hintId} className="text-caption text-foreground-subtle">
          {hint}
          {isMultiple && group.max !== undefined && (
            <span aria-live="polite">
              {' '}
              · {selected.length}/{group.max} selecionados
            </span>
          )}
        </span>
      </legend>
      <ul className="flex flex-col divide-y divide-border rounded-md border border-border">
        {group.choices.map((choice) => {
          const checked = selected.includes(choice.id)
          const disabled = choice.available === false || (atMax && !checked)
          const delta = choiceDelta(choice, selection.sizeId)
          return (
            <li key={choice.id}>
              <label
                className={cn(
                  'flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-brand-white/4 has-checked:bg-brand-white/6',
                  disabled && 'cursor-not-allowed opacity-50 hover:bg-transparent',
                )}
              >
                <input
                  type={isMultiple ? 'checkbox' : 'radio'}
                  name={name}
                  value={choice.id}
                  checked={checked}
                  disabled={disabled}
                  onChange={() => onToggle(choice.id)}
                  className="size-4 shrink-0 accent-(--color-accent)"
                />
                <span className="flex-1 text-small">
                  {choice.label}
                  {choice.description && (
                    <span className="block text-caption text-foreground-subtle">
                      {choice.description}
                    </span>
                  )}
                </span>
                <span className="text-small text-foreground-muted tabular-nums">
                  {deltaLabel(delta)}
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}
