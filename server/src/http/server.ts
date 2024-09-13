import fastify from 'fastify' // Importa o framework Fastify
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod' // Importa compiladores de validadores e serializadores para trabalhar com Zod no Fastify
import { criarMetaRoute } from './routes/criar-meta'
import { metaConcluidaRoute } from './routes/metas-concluidas'
import { metasPendentesRoute } from './routes/metas-pendentes'
import { resumoSemanaRoute } from './routes/resumo-semana'

const app = fastify().withTypeProvider<ZodTypeProvider>()
// Cria uma instância do Fastify com suporte ao Zod para validação de dados de entrada e saída

app.setValidatorCompiler(validatorCompiler)
// Configura o compilador de validação para usar o Zod

app.setSerializerCompiler(serializerCompiler)
// Configura o compilador de serialização para usar o Zod

app.register(criarMetaRoute)
app.register(metaConcluidaRoute)
app.register(metasPendentesRoute)
app.register(resumoSemanaRoute)

app
  .listen({
    port: 3333, // O servidor será iniciado na porta 3333
  })
  .then(() => {
    console.log('Servidor HTTP rodando!') // Exibe no console quando o servidor estiver rodando
  })
