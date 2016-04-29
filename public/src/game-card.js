import { bindable, inject } from 'aurelia-framework';
import { Socket } from './services/socket-service';

@inject(Socket)
export class GameCard {
  @bindable gameData = null;
  countdown = 0;
  countdownInterval = null;

  constructor(socket) {
    this.io = socket;
    this.io.socket.on('update game privacy', gameName => this.updateGamePrivacy(gameName));
  }

  bind() {
    if (!this.gameData.isPublic && this.gameData.willConvertToPublic) {
      this.setTimeUntilPublicCountdown(this.gameData.created, this.gameData.timeUntilPublic);
    }
  }

  joinGame() {
    
  }

  setTimeUntilPublicCountdown(created, timeUntilPublic) {
    let timeInSeconds = (((new Date()).getTime() - (new Date(created)).getTime()) / 1000);
    this.countdown = Math.floor(timeUntilPublic - timeInSeconds);
    this.countdown = this.countdown < 0 ? 0 : this.countdown;

    if (this.countdown > 0) {
      this.countdownInterval = setInterval(() => this.timerIntervalHandler(), 1000);
    }
  }

  timerIntervalHandler() {
    this.countdown--;
    if (this.countdown === 0) {
      this.io.socket.emit('open to public', this.gameData.name);
      clearInterval(this.countdownInterval);
      this.gameData.isPublic = true;
    }
  }

  updateGamePrivacy(gameName) {
    if (gameName === this.gameData.name) {
      console.log('game name: ' + gameName);
      this.gameData.isPublic = true;
    }
  }
}