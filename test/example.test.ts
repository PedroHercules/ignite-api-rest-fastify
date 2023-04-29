import { afterAll, beforeAll, expect, it, describe, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

describe('Transaction routes', () => {
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

  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  /**
   * The method it have some methods
   * skip: skip a test
   * todo: check a test with todo
   * only: execute only test with this method
   */

  it('should be able to create a new transaction', async () => {
    // Fazer uma requisição HTTP para criar uma transação
    const response = await request(app.server).post('/transactions').send({
      title: 'New transaction test',
      amount: 5000,
      type: 'credit',
    })

    expect(response.statusCode).toEqual(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction test',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction test',
        amount: 5000,
      }),
    ])
  })
})
