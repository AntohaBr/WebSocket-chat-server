import express from 'express'
import http from 'http'
import socketIo from 'socket.io'

const app = express();
const server = http.createServer(app);
const socket = socketIo(server);

app.get('/', (req, res) => {
    res.send('Hello it`s WS server');
});

const messages = [
    {
        message: 'hello Ivan', id: '54q5878',
        user: {id: '872i317', name: 'Anton'}
    },
    {
        message: 'hello Anton', id: '1231f354',
        user: {id: '55e487', name: 'Ivan'}
    }
]

const usersState = new Map()

socket.on('connection', (socketChannel) => {
    usersState.set(socketChannel, {id: new Date().getTime().toString(), name: 'anonym'})

    socket.on('disconnect', () => {
        usersState.delete(socketChannel)
    })

    socketChannel.on('client-name-sent', (name: string) => {
        if (typeof name !== 'string') {
            return
        }

        const user = usersState.get(socketChannel)
        user.name = name
    });

    socketChannel.on('client-message-sent', (message: string) => {
        if (typeof message !== 'string') {
            return
        }
        const user = usersState.get(socketChannel)

        let messageItem = {
            message: message, id: new Date().getTime(),
            user: {id: user.id, name: user.name}
        }
        socketChannel.emit('new-message-sent', messageItem)
    });

    socketChannel.emit('init-messages-published', messages)
    console.log('a user connected');
});

const PORT = process.env.PORT || 3009

server.listen(PORT, () => {
    console.log(`listening on *: ${PORT}`);
});


