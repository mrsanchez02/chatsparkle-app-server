import express from 'express'
import morgan from 'morgan'
import cors from 'cors';
import AuthRoutes from '../routes/auth/auth.routes'
import RoomRoutes from '../routes/rooms/room.routes'
import cookieParser from 'cookie-parser'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth/', AuthRoutes)
app.use('/api/rooms/', RoomRoutes)

export default app
