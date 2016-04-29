import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Socket } from './services/socket-service';

@inject(EventAggregator, Socket)
export class GameLobby {
  gameData = null;
  countdownInterval = null;
  countdown = 0;
  readyPlayers = [];
  adminPlayer = false;
  waitingChatRoom = '';

  constructor(eventAggregator, socket) {
    this.eventAggregator = eventAggregator;
    this.io = socket;

    this.io.socket.on('joined room', roomName => {
      this.waitingChatRoom = roomName
    });
  }

  bind() {
    this.io.socket.emit('join chat room', this.gameData.name);
  }

  /**
   * Loads the game data into the respective fields
   * for presentation
   * @param  {Game Object} gameData [Contains metadata for this game]
   */
  activate(gameData) {
    this.gameData = gameData;
    this.addReadyPlayer(this.gameData.adminPlayer);
    if (!this.gameData.isPublic && this.gameData.willConvertToPublic) {
      this.setTimeUntilPublicCountdown(this.gameData.timeUntilPublic);
    }
  }

  /**
   * Sets the timer which tracks the time until this game becomes
   * available to the public
   * @param {[type]} timeUntilPublic [Time in seconds until the game
   *                                 becomes publicly available]
   */
  setTimeUntilPublicCountdown(timeUntilPublic) {
    this.countdown = timeUntilPublic;
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0)
        clearInterval(this.countdownInterval);
    }, 1000);
  }

  /**
   * Adds a new player to the list of players that are ready to start
   * @param {String} playerName [Username of the new ready player]
   */
  addReadyPlayer(playerName) {
    this.readyPlayers.push(playerName);
  }
}