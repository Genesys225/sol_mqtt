const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NodeSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  host: {
    type: String,
    required: true
  },
  capabilities: {
    type: Array,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  port: {
    type: String,
    required: true
  },
  firmwareVersion: {
    type: String,
    required: true
  }
});

module.exports = Node = mongoose.model("nodes", NodeSchema);
