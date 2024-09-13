import { and, count, eq, gte, lte, sql } from 'drizzle-orm'
import { db } from '../db'
import { metas, metasConcluidas } from '../db/schema'
import dayjs from 'dayjs'

export async function getResumoSemana() {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const LastDayOfWeek = dayjs().endOf('week').toDate()

  const metasCriadasAteSemanaAtual = db
    .$with('metas_criadas_ate_semana_atual') // Nomeia a subconsulta
    .as(
      db
        .select({
          id: metas.id, // Seleciona o ID da meta
          titulo: metas.titulo, // Seleciona o título da meta
          frequenciaSemanalDesejada: metas.frequenciaSemanalDesejada, // Seleciona a frequência semanal desejada
          createdAt: metas.createdAt, // Seleciona a data de criação da meta
        })
        .from(metas) // Tabela das metas
        .where(lte(metas.createdAt, LastDayOfWeek)) // Filtra metas criadas até o último dia da semana atual
    )

  const metasConcluidasNaSemana = db.$with('metas_concluidas_na_semana').as(
    db
      .select({
        id: metasConcluidas.id, // Seleciona o ID da meta concluída
        titulo: metas.titulo,
        completedAt: metasConcluidas.createdAt,
        completedAtDate: sql /*sql*/`
          DATE(${metasConcluidas.createdAt})
        `.as('completedAtDate'),
      })
      .from(metasConcluidas) // Tabela das metas concluídas
      .innerJoin(metas, eq(metas.id, metasConcluidas.idMeta))
      .where(
        and(
          gte(metasConcluidas.createdAt, firstDayOfWeek), // Filtra metas concluídas a partir do primeiro dia da semana
          lte(metasConcluidas.createdAt, LastDayOfWeek) // Filtra metas concluídas até o último dia da semana
        )
      )
  )

  // Criação de uma subconsulta chamada 'metas_concluidas_por_dia_da_semana'
  const metasConcluidasPorDiaDaSemana = db
    .$with('metas_concluidas_por_dia_da_semana') // Nomeia a subconsulta
    .as(
      db
        .select({
          completedAtDate: metasConcluidasNaSemana.completedAtDate, // Seleciona a data de conclusão das metas
          conclusoes: sql /*sql*/`
        JSON_AGG( 
          JSON_BUILD_OBJECT( 
            'id', ${metasConcluidasNaSemana.id}, 
            'title', ${metasConcluidasNaSemana.titulo}, 
            'completedAt', ${metasConcluidasNaSemana.completedAt} 
          )
        )
      `.as('conclusoes'), // O resultado agregado será chamado de 'conclusoes'
        })
        .from(metasConcluidasNaSemana) // Consulta a subconsulta 'metasConcluidasNaSemana'
        .groupBy(metasConcluidasNaSemana.completedAtDate) // Agrupa os resultados pela data de conclusão das metas
    )

  // Consulta principal que gera o resumo das metas concluídas na semana
  const result = await db
    .with(
      metasCriadasAteSemanaAtual, // Inclui a subconsulta que obtém metas criadas até a semana atual
      metasConcluidasNaSemana, // Inclui a subconsulta que obtém metas concluídas na semana
      metasConcluidasPorDiaDaSemana // Inclui a subconsulta que agrupa metas concluídas por dia da semana
    )
    .select({
      completo: sql /*sql*/`
    (SELECT COUNT(*) FROM ${metasConcluidasNaSemana}) 
  `.mapWith(Number), // Mapeia o resultado para um número

      total: sql /*sql*/`
    (SELECT SUM(${metasCriadasAteSemanaAtual.frequenciaSemanalDesejada}) FROM ${metasCriadasAteSemanaAtual})
    
  `.mapWith(Number), // Mapeia o resultado para um número

      metarPorDia: sql /*sql*/`
    JSON_OBJECT_AGG( 
      ${metasConcluidasPorDiaDaSemana.completedAtDate}, 
      ${metasConcluidasPorDiaDaSemana.conclusoes} 
    )
  `,
    })
    .from(metasConcluidasPorDiaDaSemana) // A consulta principal é baseada nas metas agrupadas por dia da semana

  // Retorna o resultado final que contém o resumo
  return {
    resumo: result, // O objeto resultante da consulta principal é retornado como 'resumo'
  }
}
