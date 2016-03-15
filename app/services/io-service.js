'use strict';

const socketio = require('socket.io');

module.exports = function(server) {
  let userCount = 1;

  let io = socketio.listen(server);

  io.on('connection', (socket) => {
    console.log('User connected');
    socket.emit('receive name', `user_${userCount++}`);
  });
}