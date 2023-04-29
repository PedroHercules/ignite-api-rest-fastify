import { afterAll, beforeAll, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

// Antes de executar todos os testes
beforeAll(async () => {
  // Aguardar todos os plugins estarem prontos
  await app.ready()
})

// Depois de executar todos os testes
afterAll(async () => {
  // Fechar a aplicação, remover da memória
  await app.close()
})

test('User can create a new transaction', async () => {
  // Fazer uma requisição HTTP para criar uma transação
  const response = await request(app.server).post('/transactions').send({
    title: 'New transaction test',
    amount: 5000,
    type: 'credit',
  })

  expect(response.statusCode).toEqual(201)
})
