import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

/**
 * Registro centralizado do GSAP.
 *
 * Todo o projeto importa gsap, plugins e useGSAP DESTE arquivo — nunca
 * diretamente de 'gsap'. Assim os plugins são registrados uma única vez,
 * antes de qualquer uso, e os padrões da marca valem em todo lugar.
 */
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Flip)

gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
})

ScrollTrigger.config({
  // Em celulares, a barra de endereço aparece/some e muda a altura da tela.
  // Ignorar esse resize evita recálculos e "pulos" durante a rolagem.
  ignoreMobileResize: true,
})

/** Easing da marca (equivale a --ease-brand em tokens.css). */
export const EASE_BRAND = 'power3.out'

export { Flip, gsap, ScrollTrigger, SplitText, useGSAP }
