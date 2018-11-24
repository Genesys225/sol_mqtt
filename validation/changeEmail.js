const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEmailInput(email) {
  let errors = {};

  email = !isEmpty(email) ? email : "";

  if (!Validator.isEmpty(email) && !Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
