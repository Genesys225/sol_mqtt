const mongoose = require("mongoose");

class Mongoose {
  constructor() {
    this.db = require("../config/keys").mongoURI;
  }
  connect() {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(this.db)
        .then(() => {
          console.log("Mongo DB Connected");
          resolve(true);
        })
        .catch(err => reject(err));
    });
  }
}

module.exports = Mongoose;
