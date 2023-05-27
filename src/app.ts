import {Server} from 'socket.io'

const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
    res.send('Hello it`s WS server');
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

const PORT = process.env.PORT || 3009

server.listen(PORT, () => {
    console.log(`listening on *: ${PORT}`);
});