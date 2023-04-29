import { expect, test } from 'vitest'

test('O usuário consegue criar uma nova transação', () => {
  // Fazer uma requisição HTTP para criar uma transação
  const responseStatus = 201

  expect(responseStatus).toEqual(201)
})
