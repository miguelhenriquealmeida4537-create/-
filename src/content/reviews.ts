import type { RatingSummary, Review } from '@/content/types'

/**
 * Avaliações de clientes reais — PENDENTE.
 * Cada avaliação precisa de fonte pública (plataforma e, quando houver, link) e,
 * quando disponível, a data original. Não editar o texto do cliente além de
 * cortes sinalizados com "…". Usar apenas identificação pública ou autorizada.
 */
export const reviews: Review[] = []

/**
 * Nota média OFICIAL por plataforma — PENDENTE.
 * Copiar da fonte (média, total, link) e registrar a data da consulta.
 * Sem item aqui, o site não exibe nota média.
 */
export const ratingSummaries: RatingSummary[] = []
