import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { criarMeta } from '../../functions/criar-meta'

export const criarMetaRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.post(
    '/metas',
    {
      schema: {
        body: z.object({
          titulo: z.string(), // Define que o campo 'titulo' deve ser uma string
          frequenciaSemanalDesejada: z.number().int().min(1).max(7),
          // Define que o campo 'frequenciaSemanalDesejada' deve ser um número inteiro entre 1 e 7
        }),
      },
    },

    async request => {
      const { titulo, frequenciaSemanalDesejada } = request.body
      // Extrai os dados do corpo da requisição POST

      await criarMeta({
        titulo,
        frequenciaSemanalDesejada,
      })
      // Chama a função 'criarMeta' passando os dados extraídos do corpo da requisição
    }
  )
}
