import { bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthService, AuthorizeStep, FetchConfig } from 'aurelia-auth';
import { User } from './services/user-service';

@inject(FetchConfig, AuthService, EventAggregator, User)
export class NavBar {
  @bindable router = null;

  profileName = null;
  brandText = '';

  constructor(fetchConfig, auth, eventAggregator, user) {
    // Assign dependency injected values
    this.fetchConfig = fetchConfig;
    this.auth = auth;
    this.eventAggregator = eventAggregator;
    this.user = user;

    // Initialize the dependency injected values
    this.subscribe();
    this.fetchConfig.configure();

    // Initialize bound values
    this.setBrandText();
  }

  attached() {
    this.setUserProfile();
  }

  // Checks if the user is authenticated
  get isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  signOut() {
    localStorage.removeItem('profile');
    this.auth.logout();
    this.setBrandText();
    this.router.navigate('signin');
  }

  // TODO: See if there is a better way to cause the profileName to
  // update that doesn't involve the Event Aggregator, perhaps
  // a life-cycle event of some kind
  subscribe() {
    this.eventAggregator.subscribe('signin', () => {
        this.setUserProfile();
        this.setBrandText();
    });
  }

  // Gets the username for the current user from the local storage
  // which was set when the user logged in
  setUserProfile() {
    if (this.isAuthenticated) {
      let profile = JSON.parse(localStorage.getItem('profile'));

      // Fill in the user's information for access as a service
      this.user.username = profile.username;
      this.user.email = profile.email;

      this.profileName = profile.username;
    }
  }

  setBrandText() {
    if (this.isAuthenticated)
      this.brandText = 'Splendor';
    else
      this.brandText = 'Welcome!';
  }

}