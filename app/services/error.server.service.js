'use strict';

/**
 * Generates error messages and compiles them into an
 * array. Also converts MongoDB error codes into useful messages
 * @param  {Error Object} err [The error object that has been generated]
 * @return {Array}     [An array containing all the errors retrieved from
 *                         the err object parameter]
 */
exports.getErrors = function(err) {
  let errors = [];

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        errors.push('Username already exists');
        break;
      default:
        errors.push('Something went wrong');
    }
  } else {
    for (let errName in err.errors) {
      if (err.errors[errName].message) {
        errors.push(err.errors[errName].message);
      }
    }
  }

  return errors;
};