/**
 * Com a página pré-renderizada, o HTML aparece antes do JavaScript.
 * Se o conteúdo já está visível na tela há algum tempo quando o JS chega,
 * animar a "entrada" faria o conteúdo sumir e voltar (pisca). Nesses casos
 * a animação de entrada é pulada.
 */
const LATE_MS = 1200

export function isPrerendered(): boolean {
  return document.getElementById('root')?.dataset.prerendered === 'true'
}

/** true quando o elemento já estava à vista e o JS chegou "tarde". */
export function alreadySeen(el: Element): boolean {
  if (!isPrerendered() || performance.now() < LATE_MS) return false
  const r = el.getBoundingClientRect()
  return r.top < window.innerHeight && r.bottom > 0
}
