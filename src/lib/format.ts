/** Formatação pt-BR. Funções puras, sem dependências. */

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

/** 4590 → "R$ 45,90" */
export function formatPrice(amountCents: number): string {
  return brl.format(amountCents / 100)
}

/**
 * "5511987654321" → "(11) 98765-4321"; "551132345678" → "(11) 3234-5678".
 * Aceita com ou sem DDI 55. Retorna o valor original se não reconhecer.
 */
export function formatPhoneBR(digits: string): string {
  const d = digits.replace(/\D/g, '').replace(/^55(?=\d{10,11}$)/, '')
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return digits
}

/** Link "tel:" no formato internacional. */
export function telHref(digits: string): string {
  return `tel:+${digits.replace(/\D/g, '')}`
}

/** Link de conversa no WhatsApp (sem integração de pedidos). */
export function whatsappHref(digits: string, message?: string): string {
  const base = `https://wa.me/${digits.replace(/\D/g, '')}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
