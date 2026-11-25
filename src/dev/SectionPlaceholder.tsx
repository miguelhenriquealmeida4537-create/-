import { Construction } from 'lucide-react'
import { Container, Eyebrow, Heading } from '@/components/ui'
import { cn } from '@/lib/cn'

interface SectionPlaceholderProps {
  id: string
  title: string
  stage: string
  /** O que esta seção vai conter (sem dados comerciais) */
  description: string
  /** Nível do título (1 apenas no primeiro bloco da página) */
  level?: 1 | 2
  className?: string
}

/**
 * TEMPORÁRIO — reserva o lugar de uma seção ainda não construída.
 * Visual tracejado e rótulo explícito para não ser confundido com conteúdo real.
 */
export function SectionPlaceholder({
  id,
  title,
  stage,
  description,
  level = 2,
  className,
}: SectionPlaceholderProps) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={cn('py-section-sm', className)}>
      <Container>
        <div className="flex min-h-72 flex-col items-start justify-center gap-stack-sm rounded-xl border border-dashed border-border-strong p-8 sm:p-12">
          <Eyebrow marker="none" className="gap-2">
            <Construction className="size-4" aria-hidden="true" />
            Em construção · {stage}
          </Eyebrow>
          <Heading level={level} size="h3" id={`${id}-titulo`}>
            {title}
          </Heading>
          <p className="max-w-prose text-foreground-muted">{description}</p>
        </div>
      </Container>
    </section>
  )
}
