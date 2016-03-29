import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthService } from 'aurelia-auth';
import { ensure, Validation } from 'aurelia-validation';

@inject(Router, AuthService, Validation, EventAggregator)
export class SignUp {

  @ensure((it) => { it.isNotEmpty().hasLengthBetween(4,50) })
  username = '';

  @ensure((it) => { it.isNotEmpty().hasLengthBetween(7,20) })
  password = '';

  @ensure((it) => { it.isNotEmpty().validEmail() })
  email = '';

  errors = [];

  constructor(router, auth, validation, eventAggregator) {
    this.router = router;
    this.auth = auth;
    this.validation = validation.on(this);
    this.eventAggregator = eventAggregator;
  }

  // Submits the user sign up information to
  // the backend of the app and displays errors
  // if there were any
  submitSignUp() {
    this.validation.validate().then( () => {
      let userInfo = {
        username: this.username,
        password: this.password,
        email: this.email
      };

      this.errors = [];
      return this.auth.signup(userInfo)
        .then(response => {
          if (response.success) {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.router.navigate('home');
            this.eventAggregator.publish('signin');
          }
          else {
            for (let error of response.errors) {
              this.errors.push(error);
            }
          }
        })
        .catch(error => {
          // TODO: Handle when these errors happen which I don't
          // know what they are
          console.log(error);
        });
    })
    .catch(err => console.log(err));
  }
}