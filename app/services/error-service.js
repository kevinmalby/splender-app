'use strict';

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