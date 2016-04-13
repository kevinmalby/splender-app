const gameState = require('../services/game-state.server.service');

/**
 * Service that handles all of the updates about the game state in the application
 * with the use of Socket.io
 * @param  {Socket.io Server} io     [The Socket.io server for the application]
 * @param  {Socket.io Socket} socket [The socket for the current connection]
 */
module.exports = function(io, socket) {
  socket.on('game created', gameName => {
    socket.broadcast.emit('add game', gameState.getGameMetadata(gameName));
  });
}