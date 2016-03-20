import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-auth';

@inject(Router, AuthService)
export class SignUp {
  username;
  password;
  email;
  errors = [];

  constructor(router, auth) {
    this.router = router;
    this.auth = auth;
  }

  // Submits the user sign up information to
  // the backend of the app and displays errors
  // if there were any
  submitSignUp() {
    let userInfo = {
      username: this.username,
      password: this.password,
      email: this.email
    };

    this.errors = [];
    return this.auth.signup(userInfo)
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