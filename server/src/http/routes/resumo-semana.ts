// Importa o tipo FastifyPluginAsyncZod do provedor Zod para Fastify.
// Isso é utilizado para tipagem segura e validação dos dados em runtime.
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

// Importa a função getResumoSemana de outro módulo, responsável por gerar
// ou buscar o resumo da semana.
import { getResumoSemana } from '../../functions/resumo-semana'

// Define a rota 'resumoSemanaRoute' como um plugin assíncrono usando FastifyPluginAsyncZod.
// O plugin define as rotas e suas funções handlers.
export const resumoSemanaRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  // Define a rota HTTP GET em "/resumo". Quando o cliente faz uma requisição
  // para essa rota, a função abaixo será executada.
  app.get('/resumo', async () => {
    // Chama a função getResumoSemana e extrai a propriedade 'resumo' da resposta.
    // Essa função provavelmente retorna o resumo das atividades da semana.
    const { resumo } = await getResumoSemana()

    // Retorna um objeto com a propriedade 'resumo', que será a resposta da API.
    // O Fastify se encarregará de transformar isso em JSON.
    return { resumo }
  })
}
