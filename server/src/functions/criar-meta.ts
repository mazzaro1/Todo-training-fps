// Importa o banco de dados configurado e o esquema da tabela 'metas'
import { db } from '../db'
import { metas } from '../db/schema'

// Define uma interface para o pedido de criação de uma meta
// A interface garante que o objeto passado para a função contenha
// um título (string) e uma frequência semanal desejada (número)
interface criarMetaRequest {
  titulo: string
  frequenciaSemanalDesejada: number
}

// Função assíncrona que cria uma nova meta no banco de dados
// Recebe como parâmetro um objeto que segue a interface 'criarMetaRequest'
export async function criarMeta({
  titulo,
  frequenciaSemanalDesejada,
}: criarMetaRequest) {
  // Insere uma nova linha na tabela 'metas' com os valores fornecidos
  // Retorna os resultados da inserção
  const result = await db
    .insert(metas) // Insere na tabela 'metas'
    .values({
      titulo, // O título da meta
      frequenciaSemanalDesejada, // A frequência semanal desejada
    })
    .returning() // Retorna os dados inseridos

  // Pega o primeiro resultado da inserção (a meta criada)
  const meta = result[0]

  // Retorna um objeto contendo a meta criada
  return {
    meta,
  }
}
