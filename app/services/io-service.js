'use strict';

const socketio = require('socket.io');

module.exports = function(server) {
  let userCount = 1;

  let io = socketio.listen(server);

  io.on('connection', (socket) => {
    socket.join('mainLobby');

    socket.on('chat message', (message) => {
      console.log(JSON.stringify(message, null, 2));
      socket.broadcast.to(message.room)
        .emit('chat message', message.text);
    });
  });
}