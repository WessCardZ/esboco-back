const express = require('express');
const app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});

app.use(express.json());

io.on('connection', function (socket) {
    console.log('Usuario conectado com o id:', socket.id);

    socket.on('enviarMensagem', function (msg) {
        io.emit('receberMensagem', { id: socket.id, mensagem: msg })
    })

    socket.on('audio', function (base64Data) {
        io.emit('receberMensagem', { id: socket.id, base64Data })
    })

    socket.on('disconnect', function () {
        console.log('Usuario desconectado!');
    })
})

http.listen(8000, async () => {
    console.log('Servidor iniciado na porta 8000');
})