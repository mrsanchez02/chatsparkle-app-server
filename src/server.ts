import app from "./app/app";
import http from 'http';
import { Server } from "socket.io";
import 'dotenv/config'

const PORT = process.env.PORT;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket) => {
    socket.on("join", (data) =>{
      socket.join(data)
    })
})

app.get('/', (_, res) => {
  res.json({ msg: 'works!' })
})

export default server