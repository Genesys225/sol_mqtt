const User = require("../models/User");

class UsersDb {
  constructor(userObject) {
    ({
      userName: this.userName,
      email: this.email,
      password: this.password
    } = userObject);
  }

  findByUserName() {
    return new Promise((resolve, reject) => {
      User.findOne({ userName: this.userName }).then(foundUser => {
        foundUser
          ? resolve(foundUser)
          : reject({ user: "No user with that User name" });
      });
    });
  }

  static findByUserId(id) {
    //console.trace(this.email);
    return new Promise((resolve, reject) => {
      User.findById(id)
        .populate("preferences.nodes.node", "name")
        .then(foundUser => resolve(foundUser))
        .catch(() => reject({ user: "No user with that ID" }));
    });
  }

  findByUserNameDelete() {
    return new Promise((resolve, reject) => {
      User.findOneAndDelete({ email: this.userName }).then(bool => {
        bool
          ? resolve({ success: true })
          : reject({ user: "No user with that User name" });
      });
    });
  }

  createUser(hashedPassword, identicon) {
    return new Promise((resolve, reject) => {
      const newUser = new User({
        email: this.email,
        userName: this.userName,
        identicon,
        password: hashedPassword
      });

      newUser
        .save()
        .then(createdUser => {
          resolve(createdUser);
        })
        .catch(err => reject(err));
    });
  }

  updateUser(hashedPassword, id) {
    return new Promise((resolve, reject) => {
      User.findById(id).then(foundUser => {
        foundUser.email = this.email;
        hashedPassword && (foundUser.password = hashedPassword);
        foundUser
          .save()
          .then(updatedUser => {
            resolve(updatedUser);
          })
          .catch(err => reject(err));
      });
    });
  }
}
module.exports = UsersDb;
