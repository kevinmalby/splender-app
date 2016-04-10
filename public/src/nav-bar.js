import { bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthService, AuthorizeStep } from 'aurelia-auth';
import { User } from './services/user-service';

@inject(AuthService, EventAggregator, User)
export class NavBar {
  @bindable router = null;

  username = null;
  brandText = '';

  constructor(auth, eventAggregator, user) {
    // Assign dependency injected values
    this.auth = auth;
    this.eventAggregator = eventAggregator;
    this.user = user;

    // Initialize the dependency injected values
    this.subscribe();
  }

  attached() {
    // Initialize bound values
    this.setBrandText();
    this.setUsername();
  }

  // Checks if the user is authenticated
  get isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  signOut() {
    localStorage.removeItem('user');
    this.auth.logout();
    this.setBrandText();
    this.router.navigate('signin');
  }

  // TODO: See if there is a better way to cause the profileName to
  // update that doesn't involve the Event Aggregator, perhaps
  // a life-cycle event of some kind
  subscribe() {
    this.eventAggregator.subscribe('signin', () => {
      this.user.initializeUser();
      this.setUsername();
      this.setBrandText();
    });
  }

  // Gets the username for the current user from the local storage
  // which was set when the user logged in
  setUsername() {
    if (this.isAuthenticated) {
      this.username = this.user.data.username;
    }
  }

  setBrandText() {
    if (this.isAuthenticated)
      this.brandText = 'Splendor';
    else
      this.brandText = 'Welcome!';
  }
}