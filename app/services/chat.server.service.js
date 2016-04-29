const colors = ['#e57373', '#ce93d8', '#9fa8da', '#64b5f6', '#4dd0e1', '#4db6ac', '#81c784', '#dce775',
  '#ffb74d', '#bcaaa4', '#bcaaa4', '#ffffff'];

/**
 * Service that handles all of the chat communication in the application
 * with the use of Socket.io
 * @param  {Socket.io Server} io     [The Socket.io server for the application]
 * @param  {Socket.io Socket} socket [The socket for the current connection]
 */
module.exports = function(io, socket) {
  socket.join('MainLobby');

  socket.on('chat message', message => {
    socket.broadcast.to(message.room)
      .emit('chat message', { user: message.user, color: message.color, text: message.text });
  });

  socket.on('get chat color', chatRoom => {
    io.sockets.connected[socket.id].emit('chat color', { color: colors[randomInt(0, colors.length)], room: chatRoom });
  });

  socket.on('join chat room', gameName => {
    socket.join(gameName);
    io.sockets.connected[socket.id].emit('joined room', gameName);
  });
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}