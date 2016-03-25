import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-auth';
import { ensure, Validation } from 'aurelia-validation';

@inject(Router, AuthService, Validation, User)
export class SignIn {
  @ensure(function(it){ it.isNotEmpty().hasLengthBetween(4,50) })
  username = '';

  @ensure(function(it){ it.isNotEmpty().hasLengthBetween(7,20) })
  password = '';

  errors = [];

  constructor(router, auth, validation, user) {
    this.router = router;
    this.auth = auth;
    this.validation = validation.on(this);
    this.user = user;
  }

  // Submits the user sign in information to
  // the backend of the app and displays errors
  // if there were any
  submitSignIn() {
    this.validation.validate().then( () => {
      this.errors = [];
      return this.auth.login(this.username, this.password)
        .then(response => {
          if (response.success) {

            localStorage.setItem('profile', JSON.stringify(response.user));
            this.router.navigate('home');
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