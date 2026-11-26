import { useEffect, useState } from 'react'

/**
 * Qual das seções (por id) está no centro da tela.
 * Usa IntersectionObserver numa faixa central fina da viewport; o scroll só é
 * ouvido (passivo) para detectar o fim da página. Retorna null quando nenhuma delas está no centro
 * (ex.: no Hero).
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join('|')

  useEffect(() => {
    const targets = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (targets.length === 0) return

    const visible = new Set<string>()
    let atBottom = false
    const update = () => {
      // No fim da página, a última seção (ex.: rodapé) nunca chega ao centro:
      // ela passa a ser a ativa.
      if (atBottom) return setActive(targets[targets.length - 1]?.id ?? null)
      // a primeira na ordem da página entre as que cruzam a faixa central
      setActive(targets.find((t) => visible.has(t.id))?.id ?? null)
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id)
          else visible.delete(e.target.id)
        }
        update()
      },
      { rootMargin: '-45% 0px -54% 0px' },
    )
    const onScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (bottom !== atBottom) {
        atBottom = bottom
        update()
      }
    }
    targets.forEach((t) => io.observe(t))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [key])

  return active
}
