import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-auth';

@inject(Router, AuthService)
export class SignIn {
  username = '';
  password = '';
  errors = [];

  constructor(router, auth) {
    this.router = router;
    this.auth = auth;
  }

  // Submits the user sign in information to
  // the backend of the app and displays errors
  // if there were any
  submitSignIn() {
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
  }
}