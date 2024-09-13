import { and, count, eq, gte, lte, sql } from 'drizzle-orm' // Importa operadores e funções da biblioteca drizzle-orm para consultas SQL
import { db } from '../db' // Importa a instância do banco de dados
import { metas, metasConcluidas } from '../db/schema' // Importa os esquemas das tabelas metas e metasConcluidas do banco de dados
import dayjs from 'dayjs' // Importa a biblioteca dayjs para manipulação de datas

// Interface para definir o formato do objeto de entrada. Contém o ID da meta que será concluída.
interface criarConclusaoMetaRequest {
  idMeta: string // Define que o ID da meta será uma string
}

// Função assíncrona que cria a conclusão de uma meta
export async function criarConclusaoMeta({
  idMeta,
}: criarConclusaoMetaRequest) {
  // Define o primeiro e o último dia da semana atual usando dayjs
  const firstDayOfWeek = dayjs().startOf('week').toDate() // Começo da semana
  const LastDayOfWeek = dayjs().endOf('week').toDate() // Final da semana

  // Subconsulta que conta quantas vezes a meta foi concluída na semana atual
  const contagemMetasConcluidas = db.$with('metas_concluidas_na_semana').as(
    db
      .select({
        idMeta: metasConcluidas.idMeta, // Seleciona o ID da meta que foi concluída
        contagemConcluidas: count(metasConcluidas.id).as('contagemConcluidas'), // Conta quantas vezes a meta foi concluída usando a função count
      })
      .from(metasConcluidas) // Consulta a tabela metasConcluidas
      .where(
        and(
          gte(metasConcluidas.createdAt, firstDayOfWeek), // Filtra metas concluídas a partir do primeiro dia da semana atual
          lte(metasConcluidas.createdAt, LastDayOfWeek), // Filtra metas concluídas até o último dia da semana atual
          eq(metasConcluidas.idMeta, idMeta) // Filtra as metas que têm o ID fornecido
        )
      )
      .groupBy(metasConcluidas.idMeta) // Agrupa os resultados por ID da meta para obter contagens separadas para cada meta
  )

  // Consulta principal que junta a tabela de metas com a subconsulta das metas concluídas na semana
  const result = await db
    .with(contagemMetasConcluidas) // Adiciona a subconsulta contagemMetasConcluidas à consulta principal
    .select({
      frequenciaSemanalDesejada: metas.frequenciaSemanalDesejada, // Seleciona o campo frequenciaSemanalDesejada da tabela metas
      progressoMeta: sql`
        COALESCE(${contagemMetasConcluidas.contagemConcluidas}, 0)
      `.mapWith(Number), // Usa a função SQL COALESCE para garantir que, se a meta não foi concluída, retorne 0. Converte o resultado para um número.
    })
    .from(metas) // Consulta a tabela metas
    .leftJoin(
      contagemMetasConcluidas, // Faz um left join com a subconsulta contagemMetasConcluidas
      eq(contagemMetasConcluidas.idMeta, metas.id) // Junta a subconsulta com a tabela metas onde os IDs de meta são iguais
    )
    .where(eq(metas.id, idMeta)) // Filtra os resultados para incluir apenas a meta com o ID fornecido
    .limit(1) // Limita a consulta a 1 resultado, já que esperamos um único resultado para uma meta específica

  // Desestrutura o resultado da consulta, obtendo o progresso da meta e a frequência semanal desejada
  const { progressoMeta, frequenciaSemanalDesejada } = result[0]

  // Verifica se o progresso da meta já atingiu ou superou a frequência semanal desejada
  if (progressoMeta >= frequenciaSemanalDesejada) {
    throw new Error('Meta já concluida essa semana !') // Lança um erro se a meta já foi concluída a quantidade suficiente de vezes na semana
  }

  // Insere um novo registro de conclusão da meta na tabela metasConcluidas
  const insertResult = await db
    .insert(metasConcluidas) // Insere na tabela metasConcluidas
    .values({
      idMeta, // Insere o ID da meta que foi concluída
    })
    .returning() // Retorna o resultado da inserção (como, por exemplo, o ID gerado)

  // Retorna o resultado da conclusão da meta
  const conclusaoMeta = result[0] // Pega o primeiro (e único) resultado da consulta anterior

  return {
    conclusaoMeta, // Retorna o progresso da meta e a conclusão
  }
}
