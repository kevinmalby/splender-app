import io from 'socket.io-client';

export class App {
  constructor() {
    this.socket = io('http://localhost:5000');
    this.socket.on('receive name', (name) => this.userName = name);
  }
}