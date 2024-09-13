// Importa o pacote 'zod' para validação de esquemas de dados
import { z } from 'zod'

// Importa o tipo 'FastifyPluginAsyncZod' para definir a rota assincrona com suporte a validação via Zod no Fastify
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

// Importa a função 'criarConclusaoMeta', que é responsável por registrar uma conclusão de meta
import { criarConclusaoMeta } from '../../functions/criar-conclusao-meta'

// Define a rota 'metaConcluidaRoute' usando Fastify com validação de schema via Zod
export const metaConcluidaRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  // Define a rota HTTP POST para '/metas-concluidas'
  app.post(
    '/metas-concluidas',
    {
      // Define o schema da requisição, que valida o corpo da requisição (request body)
      schema: {
        body: z.object({
          idMeta: z.string(), // O campo 'idMeta' é obrigatório e deve ser uma string
        }),
      },
    },

    // Função assíncrona que processa a requisição
    async request => {
      // Extrai o campo 'idMeta' do corpo da requisição
      const { idMeta } = request.body

      // Chama a função 'criarConclusaoMeta' para marcar a meta correspondente como concluída
      await criarConclusaoMeta({
        idMeta, // Passa o 'idMeta' para a função, que é o identificador da meta a ser concluída
      })
    }
  )
}
