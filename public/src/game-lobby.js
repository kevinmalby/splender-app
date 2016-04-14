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

  /**
   * Load all of the currently available games when the
   * game lobby is accessed
   */
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

  /**
   * Adds a new game sent from the server to the list of games
   * @param {Game Object} game [Contains metadata about the game]
   */
  addGame(game) {
    this.games.push(game);
  }
}