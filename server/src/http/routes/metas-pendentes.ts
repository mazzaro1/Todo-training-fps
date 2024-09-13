// Importa o pacote 'zod' para validação de esquemas de dados
import { z } from 'zod'

// Importa o tipo 'FastifyPluginAsyncZod' para definir a rota assincrona com suporte a validação via Zod no Fastify
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

// Importa a função 'getMetasPendentesSemana' que recupera as metas pendentes da semana
import { getMetasPendentesSemana } from '../../functions/metas-pendentes'

// Define a rota 'metasPendentesRoute' usando Fastify com validação de schema via Zod
export const metasPendentesRoute: FastifyPluginAsyncZod = async (
  app,
  _opts
) => {
  // Define a rota HTTP GET para '/metas-pendentes'
  app.get('/metas-pendentes', async () => {
    // Chama a função 'getMetasPendentesSemana' para obter as metas pendentes da semana
    const { metasPendentes } = await getMetasPendentesSemana()

    // Retorna as metas pendentes no formato JSON
    return { metasPendentes }
  })
}
