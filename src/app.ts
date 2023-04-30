import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { transactionsRoutes } from './routes/transactions'

export const app = fastify()

app.register(cookie)

// Caso queira que seja válido para todos, declare globalmente.
/* app.addHook('preHandler', async (request, reply) => {
  console.log(`[${request.method}] ${request.url}`)
}) */

app.register(transactionsRoutes, {
  prefix: 'transactions',
})

app.get('/', async () => {
  return {
    title: 'Ignite fastify transactions api',
    description: 'Developed on nodejs track section 02',
    version: '1.0.0',
    date: '29/04/2023',
  }
})
