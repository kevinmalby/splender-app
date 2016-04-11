import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class GameLobby {
  gameData = null;
  countdownInterval = null;
  countdown = 0;
  readyPlayers = [];
  adminPlayer = false;

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
  }

  activate(gameData) {
    this.gameData = gameData;
    this.addReadyPlayer(this.gameData.adminPlayer);
    if (this.gameData.timeUntilPublic) {
      this.setTimeUntilPublicCountdown(this.gameData.timeUntilPublic);
    }
  }

  setTimeUntilPublicCountdown(timeUntilPublic) {
    this.countdown = timeUntilPublic;
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0)
        clearInterval(this.countdownInterval);
    }, 1000);
  }

  addReadyPlayer(playerName) {
    this.readyPlayers.push(playerName);
  }
}