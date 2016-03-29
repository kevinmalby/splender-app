export class User {
  data = {};

  constructor() {
    this.initializeUser();
  }

  initializeUser() {
    this.data = JSON.parse(localStorage.getItem('user'));
  }
}