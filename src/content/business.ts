import type { BusinessInfo } from '@/content/types'

/**
 * Dados institucionais da Casa da Pizza.
 *
 * PENDENTE: endereço, telefone, WhatsApp, e-mail, horários, redes sociais e apps
 * de delivery aguardam confirmação. Preencha somente com dados oficiais.
 * Enquanto vazios, o rodapé exibe "A confirmar".
 */
export const business: BusinessInfo = {
  name: 'Casa da Pizza',
  slogan: 'Da nossa casa, pra sua casa', // presente na logo oficial
  address: undefined,
  phone: undefined,
  whatsapp: undefined,
  email: undefined,
  openingHours: [],
  timeZone: 'America/Sao_Paulo',
  social: [],
  deliveryApps: [],
}
