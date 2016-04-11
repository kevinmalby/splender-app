import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(HttpClient)
export class GameLobby {
  games = [];

  constructor(http) {
    this.http = http;
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
}