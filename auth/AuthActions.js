const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load Input Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const UserDb = require("../db/UserDb");

module.exports = class UserActions extends UserDb {
  constructor(userObject) {
    super(userObject);
    this.userObject = userObject;
    ({
      userName: this.userName,
      email: this.email,
      password: this.password
    } = userObject);
  }

  register() {
    return new Promise((resolve, reject) => {
      const { errors, isValid } = validateRegisterInput(this.userObject);
      // Check Validation
      if (!isValid) {
        reject(errors);
      }
      super
        .findByUserName()
        .then(user => {
          if (user) {
            errors.userName = "User name already exists";
            // console.trace(errors);
            reject(errors);
          }
        })
        .catch(err => {
          //console.trace(err);
          const identicon = this.ascii_to_hexa(this.userName);
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
              if (err) throw err;
              super
                .createUser(hash, identicon)
                .then(createdUser => {
                  resolve(createdUser);
                })
                .catch(errors => reject(errors));
            });
          });
        });
    });
  }

  changeEmail(id, email) {
    return new Promise((resolve, reject) => {
      const { errors, isValid } = validateEmailInput(email);
      // Check Validation
      if (!isValid) {
        reject(errors);
      }
      super
        .updateUser(null, id)
        .then(updatedUser => {
          resolve(updatedUser);
        })
        .catch(errors => reject(errors));
    });
  }

  changePassword(id) {
    return new Promise((resolve, reject) => {
      const { errors, isValid } = validateRegisterInput(this.userObject);
      // Check Validation
      if (!isValid) {
        reject(errors);
      }
      super.findByUserName().then(user => {
        if (user) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
              if (err) throw err;
              super
                .updateUser(hash, id)
                .then(updatedUser => {
                  resolve(updatedUser);
                })
                .catch(errors => reject(errors));
            });
          });
        }
      });
    });
  }

  logIn() {
    return new Promise((resolve, reject) => {
      const tokenExpDue = "12h";
      const { errors, isValid } = validateLoginInput(this.userObject);
      // Check Validation
      if (!isValid) {
        reject(errors);
      }
      // Find user by email
      super
        .findByUserName()
        .then(user => {
          // Check Password
          bcrypt.compare(this.password, user.password).then(isMatch => {
            if (isMatch) {
              // User Matched
              const payload = {
                id: user.id,
                userName: user.userName,
                email: user.email,
                identicon: user.identicon
              }; // Create JWT Payload
              // Sign Token
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: tokenExpDue },
                (err, token) => {
                  resolve({
                    success: true,
                    token: "Bearer " + token
                  });
                }
              );
            } else {
              errors.password = "Password incorrect";
              reject(errors);
            }
          });
        })
        .catch(err => {
          errors.userName = "User not found";
          reject(errors);
        });
    });
  }

  identIcon(hex) {
    return new Identicon(hex, 420).toString();
  }

  ascii_to_hexa(str) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
      var hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join("");
  }
};
