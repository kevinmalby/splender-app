/**
 * Service that handles all of the chat communication in the application
 * with the use of Socket.io
 * @param  {Socket.io Server} io     [The Socket.io server for the application]
 * @param  {Socket.io Socket} socket [The socket for the current connection]
 */
module.exports = function(io, socket) {
  socket.join('mainLobby');

  socket.on('chat message', (message) => {
    socket.broadcast.to(message.room)
      .emit('chat message', message.text);
  });
}