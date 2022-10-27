//Rich Erskine
//senior project
//matchmaking attempt #1
// this is a simple local server socket io rock,paper,scissors game
// this is an attempt to try out "matchmaking" in a simple fifo queue

'use strict';

let http = require('http');
let express = require('express');
let socketio = require('socket.io');
let RpsGame = require('./RpsGame');

let app = express();
let server = http.createServer(app);
let io = socketio(server);

let waitingPlayer;

io.on('connection', onConnection);

app.use(express.static(__dirname + '/client'));
server.listen(8080, () => console.log('Ready to work!'));

function onConnection(sock) {
    sock.emit('msg', 'Welcome to Rock, Paper, Scissors Arena!');
    sock.on('msg', (txt) => io.emit('msg', txt));

    if (waitingPlayer) {
        new RpsGame(waitingPlayer, sock);
        waitingPlayer = null;
    } else {
        waitingPlayer = sock;
        sock.emit('msg', 'Prepare! You are waiting for a second player.');
    }
}
