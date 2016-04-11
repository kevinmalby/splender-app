import { bindable } from 'aurelia-framework';

export class GameCard {
  @bindable gameData = null;
  @bindable name = '';

  bind() {
    console.log('card-game-data: ' + JSON.stringify(this.gameData, null, 2));
    console.log('name: ' + this.name);
  }
}