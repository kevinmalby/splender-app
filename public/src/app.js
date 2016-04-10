import { AuthorizeStep } from 'aurelia-auth';
import { FetchConfig } from 'aurelia-auth';
import { inject } from 'aurelia-framework';

@inject(FetchConfig)
export class App {

  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  activate() {
    this.fetchConfig.configure();
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
}
