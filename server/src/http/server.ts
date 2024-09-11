import fastify from 'fastify' // Importa o framework Fastify
import { criarMeta } from '../functions/criar-meta' // Importa a função criarMeta, que provavelmente insere uma meta em um banco de dados
import z from 'zod' // Importa a biblioteca Zod, usada para validação de esquemas de dados
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod' // Importa compiladores de validadores e serializadores para trabalhar com Zod no Fastify

const app = fastify().withTypeProvider<ZodTypeProvider>()
// Cria uma instância do Fastify com suporte ao Zod para validação de dados de entrada e saída

app.setValidatorCompiler(validatorCompiler)
// Configura o compilador de validação para usar o Zod

app.setSerializerCompiler(serializerCompiler)
// Configura o compilador de serialização para usar o Zod

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

app
  .listen({
    port: 3333, // O servidor será iniciado na porta 3333
  })
  .then(() => {
    console.log('Servidor HTTP rodando!') // Exibe no console quando o servidor estiver rodando
  })
