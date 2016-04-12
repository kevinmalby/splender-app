import { bindable } from 'aurelia-framework';

export class GameCard {
  @bindable gameData = null;

  bind() {
    console.log('card-game-data: ' + JSON.stringify(this.gameData, null, 2));
  }

  joinGame() {
    
  }
}