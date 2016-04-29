import { inject, bindable, transient } from 'aurelia-framework';
import { Socket } from './services/socket-service';
import { User } from './services/user-service';

const colors = ['#e57373', '#ce93d8', '#9fa8da', '#64b5f6', '#4dd0e1', '#4db6ac', '#81c784', '#dce775',
  '#ffb74d', '#bcaaa4', '#bcaaa4', '#ffffff'];

@inject(Socket, User)
@transient()
export class Chat {
  messages = [];
  messageText = '';
  scrollPosition = 10000;
  userColor = {};

  @bindable
  chatRoom = "MainLobby";

  constructor(socket, user) {
    this.io = socket;
    this.user = user;
    this.io.socket.on('chat message', message => this.receiveMessage(message));
  }

  attached() {
    this.setUserColor(colors[this.randomInt(0, colors.length)]);
  }

  setUserColor(color) {
    this.userColor = {
      color: color,
      'border-bottom': '1px solid ' + color,
      '-webkit-box-shadow': '0 1px 0 0 ' + color,
      '-moz-box-shadow': '0 1px 0 0 ' + color,
      'box-shadow': '0 1px 0 0 ' + color
    };
  }

  /**
   * Sends the current message for the user to the server to then
   * broadcast to all other clients
   */
  sendMessage() {
    if (this.messageText) {
      let chatMessage = { user: this.user.data.username, color: this.userColor.color, text: this.messageText}
      this.messages.push(chatMessage);

      chatMessage.room = this.chatRoom;
      // TODO: For now hard-code room, but that will need to change
      this.io.socket.emit('chat message', chatMessage);

      // Keep the chat window fixed to the bottom
      this.scrollToBottom();
      this.messageText = '';
    }
  }

  /**
   * Receives a chat message from the server and adds it to the list
   * of messages
   * @param  {String} message [A message from another client sent by the server]
   */
  receiveMessage(message) {
    if (message) {
      this.messages.push(message);
      this.scrollToBottom();
    }
  }

  /**
   * Scroll to the bottom of the div to show most recent
   */
  scrollToBottom() {
    // TODO: 2000 is currently some arbitrary large number
    // but it should be set more logically
    this.scrollPosition = this.messages.length * 2000;
  }

  randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
  }
}