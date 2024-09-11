import { client, db } from '.' // Importa o cliente do banco de dados e a instância do banco de dados da configuração local
import { metasConcluidas, metas } from './schema' // Importa os esquemas/tabelas de "metasConcluidas" e "metas"
import dayjs from 'dayjs' // Importa a biblioteca "dayjs" para manipulação de datas

// Função assíncrona responsável por realizar o seed (inicialização) de dados no banco
async function seed() {
  // Apaga todos os registros existentes nas tabelas 'metasConcluidas' e 'metas'
  await db.delete(metasConcluidas)
  await db.delete(metas)

  // Insere novos registros na tabela 'metas' e retorna os resultados inseridos
  const result = await db
    .insert(metas)
    .values([
      { titulo: 'Vencer 3 mata-mata de Vandal', frequenciaSemanalDesejada: 5 }, // Meta de Vencer 3 mata-mata de Vandal, com frequência semanal desejada de 5 vezes
      { titulo: 'Vencer 3 mata-mata de Phantom', frequenciaSemanalDesejada: 3 }, // Meta de Vencer 3 mata-mata de Phantom, com frequência semanal desejada de 3 vezes
      { titulo: 'Vencer 1 mata-mata de Sheriff', frequenciaSemanalDesejada: 1 }, // Meta de Vencer 1 mata-mata de Sheriff, com frequência semanal desejada de 1 vez
    ])
    .returning() // Retorna os registros inseridos, incluindo os IDs gerados

  // Define o início da semana atual usando a função dayjs
  const startOfWeek = dayjs().startOf('week')

  // Insere registros na tabela 'metasConcluidas', vinculando as metas inseridas anteriormente
  await db.insert(metasConcluidas).values([
    { idMeta: result[0].id, createdAt: startOfWeek.toDate() }, // Meta de 'Vencer 3 mata-mata de Vandal', concluída no início da semana
    { idMeta: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate() }, // Meta de 'Vencer 3 mata-mata de Phantom', concluída um dia após o início da semana
  ])
}

// Chama a função de seed e, ao final da execução (seja sucesso ou erro), encerra a conexão com o banco
seed().finally(() => {
  client.end() // Encerra a conexão com o cliente do banco de dados
})
