import { AuthorizeStep } from 'aurelia-auth';
import 'bootstrap';

export class App {

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
}
