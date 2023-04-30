import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

const sqliteConnection = {
  filename: env.DATABASE_URL,
}

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection:
    env.DATABASE_CLIENT === 'sqlite' ? sqliteConnection : env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './database/migrations',
  },
}

export const knex = setupKnex(config)
