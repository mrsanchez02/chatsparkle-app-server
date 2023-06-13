import {DataSource} from 'typeorm'
import 'dotenv/config'
import { User } from '../entities/User.entity'
import { Room } from '../entities/Room.entity'
import { Message } from '../entities/Message.entity'
import { UserRoom } from '../entities/UserRoom.entity'

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: true,
  entities: [User, Room, Message, UserRoom],
  subscribers: ['src/migrations/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
})