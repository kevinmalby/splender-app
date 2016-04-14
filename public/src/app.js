import { AuthorizeStep } from 'aurelia-auth';
import { FetchConfig } from 'aurelia-auth';
import { inject } from 'aurelia-framework';

@inject(FetchConfig)
export class App {

  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  /**
   * Invoke the Aurelia-Auth fetch configuration which adds the json
   * web token to each HTTP request
   */
  activate() {
    this.fetchConfig.configure();
  }

  /**
   * Sets up the configuration for the Aurelia router
   * @param  {Aurelia Router Config Object} config [Configuration object
   *                         for the Aurelia Router]
   * @param  {Aurelia Router Object} router [Aurelia router object]
   */
  configureRouter(config, router) {
    config.title = 'Splendor';

    // Adds authorization logic for routes
    config.addPipelineStep('authorize', AuthorizeStep);

    // Configure the mappings for the router
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
