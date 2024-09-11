import dayjs from 'dayjs' // Importa a biblioteca dayjs para manipulação de datas
import { db } from '../db' // Importa a instância do banco de dados
import { metas, metasConcluidas } from '../db/schema' // Importa os esquemas das tabelas do banco de dados
import { lte, count, and, gte, eq, sql } from 'drizzle-orm' // Importa operadores e funções da biblioteca ORM

export async function getMetasPendentesSemana() {
  // Define o primeiro e o último dia da semana atual
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const LastDayOfWeek = dayjs().endOf('week').toDate()

  // Subconsulta que seleciona metas criadas até o fim da semana atual
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

  // Subconsulta que conta quantas vezes cada meta foi concluída durante a semana atual
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
          lte(metasConcluidas.createdAt, LastDayOfWeek) // Filtra metas concluídas até o último dia da semana
        )
      )
      .groupBy(metasConcluidas.idMeta) // Agrupa por ID da meta para contar as conclusões por meta
  )

  // Consulta principal que junta as metas criadas com as metas concluídas na semana
  const metasPendentes = await db
    .with(metasCriadasAteSemanaAtual, metasConcluidasNaSemana) // Junta as subconsultas
    .select({
      id: metasCriadasAteSemanaAtual.id, // Seleciona o ID da meta
      titulo: metasCriadasAteSemanaAtual.titulo, // Seleciona o título da meta
      frequenciaSemanalDesejada:
        metasCriadasAteSemanaAtual.frequenciaSemanalDesejada, // Seleciona a frequência semanal desejada
      metasConcluidas: sql`
        COALESCE(${metasConcluidasNaSemana.contagemConcluidas}, 0)
      `.mapWith(Number), // Se a meta não foi concluída na semana, retorna 0 (caso contrário, retorna a contagem)
    })
    .from(metasCriadasAteSemanaAtual) // A partir das metas criadas
    .leftJoin(
      metasConcluidasNaSemana, // Faz um left join com as metas concluídas na semana
      eq(metasConcluidasNaSemana.idMeta, metasCriadasAteSemanaAtual.id) // Junta as tabelas pela correspondência dos IDs de meta
    )

  // Retorna o resultado das metas pendentes
  return {
    metasPendentes,
  }
}
