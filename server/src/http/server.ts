import fastify from 'fastify' // Importa o framework Fastify para criação de um servidor web rápido e leve.
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod' // Importa os compiladores de validadores e serializadores para trabalhar com o Zod no Fastify.
import { criarMetaRoute } from './routes/criar-meta' // Importa a rota que lida com a criação de metas.
import { metaConcluidaRoute } from './routes/metas-concluidas' // Importa a rota que lida com metas concluídas.
import { metasPendentesRoute } from './routes/metas-pendentes' // Importa a rota que lida com metas pendentes.
import { resumoSemanaRoute } from './routes/resumo-semana' // Importa a rota que gera o resumo da semana.
import fastifyCors from '@fastify/cors' // Importa o plugin de CORS (Cross-Origin Resource Sharing) para habilitar o compartilhamento de recursos entre diferentes origens.

const app = fastify().withTypeProvider<ZodTypeProvider>()
// Cria uma instância do Fastify e associa o Zod como o provedor de tipos para validação de dados de entrada e saída.

app.register(fastifyCors, {
  origin: '*', // Configura o CORS permitindo que qualquer origem tenha acesso aos recursos da API.
})

app.setValidatorCompiler(validatorCompiler)
// Configura o compilador de validação para usar o Zod, o que garante que os dados de entrada sejam validados de acordo com os esquemas definidos.

app.setSerializerCompiler(serializerCompiler)
// Configura o compilador de serialização para usar o Zod, o que assegura que a resposta da API siga os esquemas definidos.

app.register(criarMetaRoute) // Registra a rota responsável pela criação de metas.
app.register(metaConcluidaRoute) // Registra a rota responsável por marcar metas como concluídas.
app.register(metasPendentesRoute) // Registra a rota responsável por listar metas pendentes.
app.register(resumoSemanaRoute) // Registra a rota que retorna o resumo semanal.

app
  .listen({
    port: 3333, // Define a porta 3333 para o servidor ouvir requisições.
  })
  .then(() => {
    console.log('Servidor HTTP rodando!') // Exibe no console quando o servidor for iniciado com sucesso.
  })
