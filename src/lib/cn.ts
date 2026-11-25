type ClassValue = string | false | null | undefined

/**
 * Junta classes condicionais. Sem dependência externa: os componentes do
 * design system evitam conflitos de classe por construção (variantes
 * definidas em objetos), então não é preciso "mesclar" utilitários.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}
