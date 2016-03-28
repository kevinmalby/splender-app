import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthService, AuthorizeStep, FetchConfig } from 'aurelia-auth';
import { User } from './services/user-service';
import 'bootstrap';

@inject(FetchConfig, AuthService, EventAggregator, User)
export class App {
    profileName = null;
    brandText = '';

    constructor(fetchConfig, auth, eventAggregator, user) {
      this.fetchConfig = fetchConfig;
      this.fetchConfig.configure();

      this.auth = auth;

      this.eventAggregator = eventAggregator;
      this.subscribe();

      this.setBrandText();

      this.user = user;
    }

    // Sets up the configuration for the router
    configureRouter(config, router) {
      config.title = 'Splendor';
      config.addPipelineStep('authorize', AuthorizeStep);
      config.map([{
          route: ['', 'home'],
          name: 'home',
          moduleId: 'home',
          title: 'Home',
          nav: true,
          auth: true
      }, {
          route: 'signin',
          name: 'signin',
          moduleId: 'signin',
          title: 'Sign In',
          nav: false
      }, {
          route: 'signup',
          name: 'signup',
          moduleId: 'signup',
          title: 'Sign Up',
          nav: false
      }]);

      this.router = router;
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

    // Updates the profileName when the viewmodel
    // is activated
    activate() {
      this.setUserProfile();
    }

    // TODO: See if there is a better way to cause the profileName to
    // update that doesn't involve the Event Aggregator, perhaps
    // a life-cycle event of some kind
    subscribe() {
      this.eventAggregator.subscribe('router:navigation:complete', eventArgs => {
        if (eventArgs.instruction.fragment == '/' ||
          eventArgs.instruction.fragment == '/home') {
          this.setUserProfile();
          this.setBrandText();
        }
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
        if (profile.stats) {
          console.log(JSON.stringify(profile.stats, null, 2));
        }

        console.log(JSON.stringify(this.user, null, 2));

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