const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TelemetrySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  units: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now,
    index: true
  }
});

module.exports = Telemetry = mongoose.model("telemetries", TelemetrySchema);
