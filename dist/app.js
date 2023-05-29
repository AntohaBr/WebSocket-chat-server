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
const io = (0, socket_io_1.default)(server);
const messages = [
    {
        message: 'hello Ivan', id: 545878,
        user: { id: 872317, name: 'Anton' }
    },
    {
        message: 'hello Anton', id: 1231354,
        user: { id: 55487, name: 'Ivan' }
    }
];
app.get('/', (req, res) => {
    res.send('Hello it`s WS server');
});
io.on('connection', (socketChannel) => {
    socketChannel.on('client-message-sent', (message) => {
        console.log(message);
    });
    socketChannel.emit('init-messages-published', messages);
    console.log('a user connected');
});
const PORT = process.env.PORT || 3009;
server.listen(PORT, () => {
    console.log(`listening on *: ${PORT}`);
});
//# sourceMappingURL=app.js.map