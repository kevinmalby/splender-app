/**
 * This class simply parses the stored user data and
 * makes it available in object form for the rest of the
 * Aurelia app
 */
export class User {
  data = {};

  constructor() {
    this.initializeUser();
  }

  initializeUser() {
    this.data = JSON.parse(localStorage.getItem('user'));
  }
}