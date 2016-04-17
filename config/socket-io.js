'use strict';

const socketio = require('socket.io');

module.exports = function(server) {
  let io = socketio.listen(server);

  // This section is where we require all
  // of the io related services we define for the project
  io.on('connection', (socket) => {
    console.log('User connected!');

    require('../app/services/chat.server.service')(io, socket);
    require('../app/services/game-communication.server.service')(io, socket);
  });

  return io;
};