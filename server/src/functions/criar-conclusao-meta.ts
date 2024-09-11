import { and, count, eq, gte, lte, sql } from 'drizzle-orm' // Importa operadores e funções da biblioteca ORM
import { db } from '../db' // Importa a instância do banco de dados
import { metas, metasConcluidas } from '../db/schema' // Importa os esquemas das tabelas do banco de dados
import dayjs from 'dayjs' // Importa a biblioteca dayjs para manipulação de datas

interface criarConclusaoMetaRequest {
  idMeta: string // Interface para definir o formato do objeto de entrada com o ID da meta
}

export async function criarConclusaoMeta({
  idMeta,
}: criarConclusaoMetaRequest) {
  // Define o primeiro e o último dia da semana atual
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const LastDayOfWeek = dayjs().endOf('week').toDate()

  // Subconsulta para contar quantas vezes a meta foi concluída na semana atual
  const metasConcluidasNaSemana = db.$with('metas_concluidas_na_semana').as(
    db
      .select({
        idMeta: metasConcluidas.idMeta, // Seleciona o ID da meta concluída
        contagemConcluidas: count(metasConcluidas.id).as('contagemConcluidas'), // Conta quantas vezes a meta foi concluída
      })
      .from(metasConcluidas) // Tabela das metas concluídas
      .where(
        and(
          gte(metasConcluidas.createdAt, firstDayOfWeek), // Filtra metas concluídas a partir do primeiro dia da semana
          lte(metasConcluidas.createdAt, LastDayOfWeek), // Filtra metas concluídas até o último dia da semana
          eq(metasConcluidas.idMeta, idMeta) // Filtra pela ID da meta fornecida
        )
      )
      .groupBy(metasConcluidas.idMeta) // Agrupa por ID da meta para contar as conclusões por meta
  )

  // Consulta principal que junta as metas criadas com as metas concluídas na semana
  const result = await db
    .with(metasConcluidasNaSemana) // Junta a subconsulta
    .select({
      frequenciaSemanalDesejada: metas.frequenciaSemanalDesejada, // Seleciona a frequência semanal desejada da meta
      progressoMeta: sql`
        COALESCE(${metasConcluidasNaSemana.contagemConcluidas}, 0)
      `.mapWith(Number), // Se a meta não foi concluída na semana, retorna 0 (caso contrário, retorna a contagem)
    })
    .from(metas) // Tabela das metas
    .leftJoin(
      metasConcluidasNaSemana, // Faz um left join com as metas concluídas na semana
      eq(metasConcluidasNaSemana.idMeta, metas.id) // Junta as tabelas pela correspondência dos IDs de meta
    )
    .where(eq(metas.id, idMeta)) // Filtra pela ID da meta fornecida
    .limit(1) // Limita a consulta a 1 resultado

  // Desestrutura o resultado da consulta
  const { progressoMeta, frequenciaSemanalDesejada } = result[0]

  // Verifica se a meta já foi concluída o suficiente para a semana
  if (progressoMeta >= frequenciaSemanalDesejada) {
    throw new Error('Meta já concluida essa semana !') // Lança um erro se a meta já foi concluída
  }

  // Insere a conclusão da meta no banco de dados
  const insertResult = await db
    .insert(metasConcluidas)
    .values({
      idMeta,
    })
    .returning() // Retorna o resultado da inserção

  // Retorna o resultado da conclusão da meta
  const conclusaoMeta = result[0]

  return {
    conclusaoMeta,
  }
}
