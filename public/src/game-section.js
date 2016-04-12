import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class GameSection {
  content = '';
  viewData = null;

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.subscribe();

    this.content = './game-lobby';
  }

  createGame() {
    this.content = './create-game';
  }

  subscribe() {
    this.eventAggregator.subscribe('game waiting room', gameData => {
      this.viewData = gameData;
      this.content = './game-waiting-room';
    });

    this.eventAggregator.subscribe('game lobby', () => {
      this.content = './game-lobby';
    });
  }
}