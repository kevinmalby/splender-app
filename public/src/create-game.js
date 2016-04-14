import { inject } from 'aurelia-framework';
import { User } from './services/user-service';
import { HttpClient, json } from 'aurelia-fetch-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Socket } from './services/socket-service';

@inject(User, HttpClient, EventAggregator, Socket)
export class CreateGame {
  gameName = '';
  isPublic = true;
  minPlayers = 2;
  maxPlayers = 4;
  numPlayers = [2, 3, 4];
  willConvertToPublic = false;
  timeToWait = 60*0.5;
  waitTimes = [60*0.5, 60*1, 60*2, 60*5, 60*10];

  constructor(user, http, eventAggregator, io) {
    this.user = user;
    this.http = http;
    this.eventAggregator = eventAggregator;
    this.io = io;
  }

  /**
   * Constructs and sends the new game object which is sent to
   * the server via POST request.
   */
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
      // Let the other clients know when a game is successfully created
      // so that the game lobby can refresh
      this.io.socket.emit('game created', this.gameName);

      // Tell the game-section viewmodel to transition to the game lobby
      this.eventAggregator.publish('game waiting room', response.game);
    })
    .catch(err => console.log(err));
  }

  /**
   * Cancel creating a new game and tell the game-section viewmodel to
   * return to the game lobby
   */
  cancelCreateGame() {
    this.eventAggregator.publish('game lobby');
  }
}