import config from './config/auth-config';
import { CustomValidations } from './validations';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-validation', (config) => {
      config.useLocale('en-US');
      CustomValidations.setValidations();
    })
    .plugin('aurelia-auth', (baseConfig) => {
      baseConfig.configure(config);
    });

  aurelia.start().then(() => aurelia.setRoot());
}