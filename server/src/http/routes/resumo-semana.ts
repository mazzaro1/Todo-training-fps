import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getResumoSemana } from '../../functions/resumo-semana'

export const resumoSemanaRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.get('/resumo', async () => {
    const { resumo } = await getResumoSemana()

    return { resumo }
  })
}
