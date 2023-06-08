import {DataSource} from 'typeorm'
import 'dotenv/config'
import { User } from '../entities/User.entity'

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: ['error'],
  entities: [User],
  subscribers: [],
  migrations: ['../migrations/'],
})