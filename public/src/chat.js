import { inject } from 'aurelia-framework';
import { Socket } from './services/socket-service';
import { User } from './services/user-service';

@inject(Socket, User)
export class Chat {
  messages = [];
  messageText = '';
  scrollPosition = 10000;

  constructor(socket, user) {
    this.io = socket;
    this.user = user;
    this.io.socket.on('chat message', message => this.receiveMessage(message));
  }

  sendMessage() {
    if (this.messageText) {
      let chatText = `${this.user.username}: ${this.messageText}`;
      this.messages.push(chatText);

      // TODO: For now hard-code room, but that will need to change
      this.io.socket.emit('chat message',
        {room: 'mainLobby', text: chatText});

      // Scroll to the bottom of the div to show most recent
      this.scrollPosition = this.messages.length * 2000;

      this.messageText = '';
    }
  }

  receiveMessage(message) {
    if (message) {
      this.messages.push(message);
    }
  }
}