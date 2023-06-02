"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const socket = (0, socket_io_1.default)(server);
app.get('/', (req, res) => {
    res.send('Hello it`s WS server');
});
const messages = [
    {
        message: 'hello Ivan',
        id: '54q5878',
        user: { id: '872i317', name: 'Anton' }
    },
    {
        message: 'hello Anton', id: '1231f354',
        user: { id: '55e487', name: 'Ivan' }
    }
];
const usersState = new Map();
socket.on('connection', (socketChannel) => {
    usersState.set(socketChannel, { id: new Date().getTime().toString(), name: 'anonym' });
    socket.on('disconnect', () => {
        usersState.delete(socketChannel);
    });
    socketChannel.on('client-name-sent', (name) => {
        if (typeof name !== 'string') {
            return;
        }
        const user = usersState.get(socketChannel);
        user.name = name;
    });
    socketChannel.on('client-message-sent', (message, successFn) => {
        if (typeof message !== 'string' || message.length > 150) {
            successFn('Message length should be less than 150 chars');
            return;
        }
        const user = usersState.get(socketChannel);
        let messageItem = {
            message: message, id: new Date().getTime().toString(),
            user: { id: user.id, name: user.name }
        };
        messages.push(messageItem);
        socket.emit('new-message-sent', messageItem);
        successFn(null);
    });
    socketChannel.on('client-typed', () => {
        socketChannel.broadcast.emit('user-typing', usersState.get(socketChannel));
    });
    socketChannel.emit('init-messages-published', messages, () => {
        console.log('Init messages received');
    });
    console.log('a user connected');
});
const PORT = process.env.PORT || 3009;
server.listen(PORT, () => {
    console.log(`listening on *: ${PORT}`);
});
//# sourceMappingURL=app.js.map