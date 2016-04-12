import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { Socket } from './services/socket-service';

@inject(HttpClient, Socket)
export class GameLobby {
  games = [];

  constructor(http, socket) {
    this.http = http;
    this.io = socket;

    this.io.socket.on('add game', game => this.addGame(game));
  }

  attached() {
    this.http.fetch('/api/games')
    .then(response => response.json())
    .then(response => {
      if (response) {
        this.games = response.games;
      }
    })
    .catch(err => console.log(err));
  }

  addGame(game) {
    console.log('new game: ' + JSON.stringify(game, null, 2));
    this.games.push(game);
  }
}