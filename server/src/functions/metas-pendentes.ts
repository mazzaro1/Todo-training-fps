import dayjs from 'dayjs' // Importa a biblioteca dayjs para manipulação de datas
import { db } from '../db' // Importa a instância do banco de dados configurado
import { metas, metasConcluidas } from '../db/schema' // Importa os esquemas das tabelas do banco de dados, 'metas' e 'metasConcluidas'
import { lte, count, and, gte, eq, sql } from 'drizzle-orm' // Importa operadores e funções da biblioteca ORM para construção de queries

// Função assíncrona que retorna as metas pendentes da semana atual
export async function getMetasPendentesSemana() {
  // Define o primeiro e o último dia da semana atual usando o dayjs
  const firstDayOfWeek = dayjs().startOf('week').toDate() // Define o início da semana (primeiro dia)
  const LastDayOfWeek = dayjs().endOf('week').toDate() // Define o fim da semana (último dia)

  // Subconsulta que seleciona metas criadas até o final da semana atual
  const metasCriadasAteSemanaAtual = db
    .$with('metas_criadas_ate_semana_atual') // Nomeia a subconsulta para reutilização
    .as(
      db
        .select({
          id: metas.id, // Seleciona o ID da meta
          titulo: metas.titulo, // Seleciona o título da meta
          frequenciaSemanalDesejada: metas.frequenciaSemanalDesejada, // Seleciona a frequência semanal desejada para a meta
          createdAt: metas.createdAt, // Seleciona a data de criação da meta
        })
        .from(metas) // Seleciona da tabela 'metas'
        .where(lte(metas.createdAt, LastDayOfWeek)) // Filtra metas criadas até o último dia da semana atual
    )

  // Subconsulta que conta quantas vezes cada meta foi concluída na semana atual
  const contagemMetasConcluidas = db.$with('contagem_metas_concluidas').as(
    db
      .select({
        idMeta: metasConcluidas.idMeta, // Seleciona o ID da meta concluída
        contagemConcluidas: count(metasConcluidas.id).as('contagemConcluidas'), // Conta quantas vezes a meta foi concluída
      })
      .from(metasConcluidas) // Seleciona da tabela 'metasConcluidas'
      .where(
        and(
          gte(metasConcluidas.createdAt, firstDayOfWeek), // Filtra metas concluídas a partir do primeiro dia da semana
          lte(metasConcluidas.createdAt, LastDayOfWeek) // Filtra metas concluídas até o último dia da semana
        )
      )
      .groupBy(metasConcluidas.idMeta) // Agrupa por ID da meta para contar quantas vezes ela foi concluída na semana
  )

  // Consulta principal que junta as metas criadas até a semana atual com as conclusões na semana
  const metasPendentes = await db
    .with(metasCriadasAteSemanaAtual, contagemMetasConcluidas) // Junta as duas subconsultas criadas
    .select({
      id: metasCriadasAteSemanaAtual.id, // Seleciona o ID da meta
      titulo: metasCriadasAteSemanaAtual.titulo, // Seleciona o título da meta
      frequenciaSemanalDesejada:
        metasCriadasAteSemanaAtual.frequenciaSemanalDesejada, // Seleciona a frequência semanal desejada
      metasConcluidas: sql`
        COALESCE(${contagemMetasConcluidas.contagemConcluidas}, 0) 
      `.mapWith(Number), // Se a meta não foi concluída, retorna 0, senão retorna a quantidade de vezes concluída
    })
    .from(metasCriadasAteSemanaAtual) // A partir das metas criadas até o final da semana atual
    .leftJoin(
      contagemMetasConcluidas, // Faz um left join com as metas concluídas na semana
      eq(contagemMetasConcluidas.idMeta, metasCriadasAteSemanaAtual.id) // Junta as tabelas comparando o ID da meta
    )

  // Retorna o resultado das metas pendentes da semana atual
  return {
    metasPendentes, // Retorna as metas pendentes, que incluem as metas e o número de vezes concluídas
  }
}
