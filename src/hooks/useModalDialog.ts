import { useEffect, useLayoutEffect, useRef } from 'react'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

interface Options {
  open: boolean
  /** Pedido de fechamento (Esc ou clique fora). Quem chama decide como fechar (ex.: animar). */
  onRequestClose: () => void
}

/**
 * Controla um <dialog> modal nativo:
 * - showModal()/close() conforme `open` (foco preso e página inerte pelo navegador);
 * - trava a rolagem da página (Lenis e nativa) enquanto aberto;
 * - Esc e clique no fundo viram onRequestClose, permitindo animar antes de fechar;
 * - ao fechar, o navegador devolve o foco ao elemento que abriu o diálogo.
 */
export function useModalDialog({ open, onRequestClose }: Options) {
  const ref = useRef<HTMLDialogElement>(null)
  const { lenis } = useSmoothScroll()
  const requestClose = useRef(onRequestClose)
  useLayoutEffect(() => {
    requestClose.current = onRequestClose
  })

  useLayoutEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      lenis?.stop()
      document.documentElement.style.overflow = 'hidden'
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open, lenis])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const unlock = () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
    }
    const onCancel = (e: Event) => {
      e.preventDefault() // Esc: deixa quem chama animar o fechamento
      requestClose.current()
    }
    const onClick = (e: MouseEvent) => {
      if (e.target === dialog) requestClose.current() // clique no fundo
    }
    dialog.addEventListener('close', unlock)
    dialog.addEventListener('cancel', onCancel)
    dialog.addEventListener('click', onClick)
    return () => {
      dialog.removeEventListener('close', unlock)
      dialog.removeEventListener('cancel', onCancel)
      dialog.removeEventListener('click', onClick)
      if (dialog.open) unlock()
    }
  }, [lenis])

  return ref
}
