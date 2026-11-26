/**
 * ⚠️ AVALIAÇÕES DE TESTE — NÃO SÃO AVALIAÇÕES REAIS DE CLIENTES.
 *
 * Servem apenas para validar o layout. Autores, notas, textos e datas são
 * genéricos e identificados como teste; links apontam para example.com
 * (domínio reservado para exemplos). Propositalmente NÃO há nota média de
 * teste: a média só pode vir de fonte oficial.
 * Exibidas apenas com conteúdo de teste habilitado e sem avaliações oficiais.
 */
import type { Review } from '@/content/types'

const TEXT =
  'Texto de exemplo de uma avaliação, usado apenas para validar o layout. Não é uma avaliação real.'
const LONG =
  'Texto de exemplo propositalmente longo para testar o recurso "Ler mais". ' +
  'Este conteúdo não é uma avaliação real e existe somente para verificar como cartões com textos extensos se comportam no celular, no tablet e no desktop. ' +
  'O texto completo continua disponível ao expandir, sem qualquer alteração. Fim do texto de exemplo.'

/** Datas FIXAS (não relativas a hoje): o HTML pré-renderizado e o navegador mostram o mesmo. */
export function buildDemoReviews(): Review[] {
  const src = (n: number, withLink = true) => ({
    name: 'Plataforma de teste',
    url: withLink ? `https://example.com/avaliacao-de-teste-${n}` : undefined,
  })
  return [
    {
      id: 'teste-1',
      author: 'Cliente de teste 1',
      rating: 5,
      text: TEXT,
      date: '2026-11-22',
      source: src(1),
    },
    {
      id: 'teste-2',
      author: 'Cliente de teste 2',
      rating: 4,
      text: LONG,
      date: '2026-11-13',
      source: src(2),
    },
    {
      id: 'teste-3',
      author: 'Cliente de teste 3',
      rating: 5,
      text: TEXT,
      date: '2026-11-05',
      source: src(3, false),
    },
    {
      id: 'teste-4',
      author: 'Cliente de teste 4',
      rating: 3,
      text: TEXT,
      date: '2026-10-15',
      source: src(4),
    },
    { id: 'teste-5', author: 'Cliente de teste 5', rating: 5, text: TEXT, source: src(5) },
    {
      id: 'teste-6',
      author: 'Cliente de teste 6',
      rating: 4,
      text: TEXT,
      date: '2026-09-22',
      source: src(6),
    },
    {
      id: 'teste-7',
      author: 'Cliente de teste 7',
      rating: 5,
      text: TEXT,
      date: '2026-08-27',
      source: src(7),
    },
    { id: 'teste-8', author: 'Cliente de teste 8', rating: 4, text: TEXT, source: src(8, false) },
  ]
}
