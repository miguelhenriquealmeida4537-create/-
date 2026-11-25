import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

/** Barra fina de progresso da rolagem (indicador, não decoração). */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const bar = ref.current
    if (!bar) return
    const setScale = gsap.quickSetter(bar, 'scaleX')
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => setScale(self.progress),
    })
  })

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand-red"
    />
  )
}
