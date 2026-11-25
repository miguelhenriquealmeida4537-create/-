interface SkipLinkProps {
  targetId?: string
}

/** Primeiro elemento focável da página: permite pular direto ao conteúdo. */
export function SkipLink({ targetId = 'conteudo' }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only-focusable fixed top-4 left-4 z-[100] rounded-md bg-brand-white px-4 py-3 font-semibold text-brand-black"
    >
      Pular para o conteúdo
    </a>
  )
}
