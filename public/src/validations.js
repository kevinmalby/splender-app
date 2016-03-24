import { ValidationGroup } from 'aurelia-validation';
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export class CustomValidations {

    static setValidations() {
        this.setEmailValidator();
    }

    static setEmailValidator() {
        ValidationGroup.prototype.validEmail = function()
        {
          this.matches(emailRegex)
              .withMessage((newValue, threshold) => {return `is not valid`;});
          return this;
        }
    }
}