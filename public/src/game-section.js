import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class GameSection {
  content = '';
  viewData = null;

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.subscribe();

    // Set the compose element to the game lobby when
    // the game-section is first loaded
    this.content = './game-lobby';
  }

  /**
   * Sets the compose element to the create game form
   */
  createGame() {
    this.content = './create-game';
  }

  /**
   * Method to subscribe to all necessary events that are published
   * through the Aurelia EventAggregator
   */
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