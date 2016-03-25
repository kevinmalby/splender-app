import io from 'socket.io-client';
import config from '../config/config';

export class Socket {
  socket = null;

  constructor() {
    this.socket = io(config.hostUrl);
  }
}