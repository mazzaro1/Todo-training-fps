import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { criarConclusaoMeta } from '../../functions/criar-conclusao-meta'

export const metaConcluidaRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.post(
    '/metas-concluidas',
    {
      schema: {
        body: z.object({
          idMeta: z.string(),
        }),
      },
    },

    async request => {
      const { idMeta } = request.body

      await criarConclusaoMeta({
        idMeta,
      })
    }
  )
}
