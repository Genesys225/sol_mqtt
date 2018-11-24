const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  identicon: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  preferences: {
    nodes: [
      {
        node: {
          type: Schema.Types.ObjectId,
          ref: "nodes",
          type: String
        },
        handle: {
          type: String
        }
      }
    ]
  }
});

module.exports = User = mongoose.model("users", UserSchema);
