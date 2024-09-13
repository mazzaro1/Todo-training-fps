import { db } from '../db' // A instância do banco de dados
import { metas } from '../db/schema' // O esquema da tabela 'metas', que define a estrutura das colunas e o formato dos dados

// Define uma interface para o pedido de criação de uma meta
// A interface garante que o objeto passado para a função tenha um título (string) e uma frequência semanal desejada (número)
interface criarMetaRequest {
  titulo: string // O título da meta (nome ou descrição da meta)
  frequenciaSemanalDesejada: number // A frequência semanal desejada (quantas vezes a meta deve ser realizada por semana)
}

// Função assíncrona que cria uma nova meta no banco de dados
// Recebe como parâmetro um objeto que segue a interface 'criarMetaRequest'
// Isso garante que a função sempre receba os parâmetros corretos para criar a meta
export async function criarMeta({
  titulo, // O título da meta, passado no objeto de parâmetros
  frequenciaSemanalDesejada, // A frequência semanal desejada para a meta, também passada no objeto de parâmetros
}: criarMetaRequest) {
  // Insere uma nova linha na tabela 'metas' com os valores fornecidos
  // O método .insert insere os dados, enquanto .values especifica quais valores serão inseridos
  // Retorna os resultados da inserção para que possamos obter a meta criada
  const result = await db
    .insert(metas) // Insere na tabela 'metas' (tabela já definida no esquema)
    .values({
      titulo, // Insere o título fornecido no campo 'titulo' da tabela
      frequenciaSemanalDesejada, // Insere a frequência semanal desejada no campo correspondente
    })
    .returning() // .returning() garante que os dados da meta recém-criada sejam retornados pelo banco de dados

  // Pega o primeiro resultado da inserção (a meta criada)
  // Como 'result' é um array com os resultados da inserção, pegamos o primeiro item, que é a meta criada
  const meta = result[0]

  // Retorna um objeto contendo a meta criada
  // O retorno será um objeto com a chave 'meta' que contém os dados da meta criada
  return {
    meta, // Retorna a meta recém-criada para que possa ser usada em outras partes do código
  }
}
