import express from "express";
import http from "http";
import socketIo from "socket.io";

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const messages = [
    {
        message: 'hello Ivan', id: 545878,
        user: {id: 872317, name: 'Anton'}
    },
    {
        message: 'hello Anton', id: 1231354,
        user: {id: 55487, name: 'Ivan'}
    }
]

app.get('/', (req, res) => {
    res.send('Hello it`s WS server');
});

io.on('connection', (socketChannel) => {
    socketChannel.on('client-message-sent', (message: string) => {
        console.log(message);
    });
    socketChannel.emit('init-messages-published', messages)
    console.log('a user connected');
});

const PORT = process.env.PORT || 3009

server.listen(PORT, () => {
    console.log(`listening on *: ${PORT}`);
});


