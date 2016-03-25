import { inject } from 'aurelia-framework';
import { Socket } from './services/socket-service';
import { User } from './services/user-service';

@inject(Socket, User)
export class Chat {
  messages = [];
  messageText = '';

  constructor(socket, user) {
    this.io = socket;
    this.user = user;
    this.io.socket.on('chat message', message => this.receiveMessage(message));
  }

  sendMessage() {
    let chatText = `${this.user.username}: ${this.messageText}`;
    this.messages.push(chatText);

    console.log(`Here for: ${this.user.username}`);

    // TODO: For now hard-code room, but that will need to change
    this.io.socket.emit('chat message',
      {room: 'mainLobby', text: chatText});

    this.messageText = '';
  }

  receiveMessage(message) {
    if (message) {
      this.messages.push(message);
    }
  }
}