import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getMetasPendentesSemana } from '../../functions/metas-pendentes'

export const metasPendentesRoute: FastifyPluginAsyncZod = async (
  app,
  _opts
) => {
  app.get('/metas-pendentes', async () => {
    const { metasPendentes } = await getMetasPendentesSemana()

    return { metasPendentes }
  })
}
