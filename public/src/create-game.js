import { inject } from 'aurelia-framework';
import { User } from './services/user-service';
import { HttpClient, json } from 'aurelia-fetch-client';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(User, HttpClient, EventAggregator)
export class CreateGame {
  gameName = '';
  isPublic = true;
  minPlayers = 2;
  maxPlayers = 4;
  numPlayers = [2, 3, 4];
  willConvertToPublic = false;
  timeToWait = 60*0.5;
  waitTimes = [60*0.5, 60*1, 60*2, 60*5, 60*10];

  constructor(user, http, eventAggregator) {
    this.user = user;
    this.http = http;
    this.eventAggregator = eventAggregator;
  }

  createGameSubmit() {
    let gameInfo = {
      name: this.gameName,
      owner: this.user.data.username,
      isPublic: this.isPublic,
      willConvertToPublic: this.willConvertToPublic,
      timeUntilPublic: this.timeToWait,
      minPlayers: this.minPlayers,
      maxPlayers: this.maxPlayers,
    };

    this.http.fetch('/api/games', {
      method: 'post',
      body: json(gameInfo)
    })
    .then(response => response.json())
    .then(response => {
      this.eventAggregator.publish('New Game Data', response.game);
      //console.log(JSON.stringify(response.game, null, 2));
    })
    .catch(err => console.log(err));
  }

  cancelCreateGame() {
    this.eventAggregator.publish('Game Lobby');
  }
}