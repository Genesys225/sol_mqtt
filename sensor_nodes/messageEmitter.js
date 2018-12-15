const SocketIO = require("../socket-io/SocketIO");

const messageEmitter = {
  registeredList: {},

  unRegisteredMessage(topic, payload) {
    const newTelemetry = {
      value: payload.toString("utf8").split(" ")[0],
      units: payload.toString("utf8").split(" ")[1],
      name: topic.split("/")[0],
      type: topic.split("/")[1]
    };
    //SocketIO.emit(newTelemetry.name);
  },

  relayClientMessage(topic, payload) {
    const newTelemetry = {
      value: payload.toString("utf8").split(" ")[0],
      units: payload.toString("utf8").split(" ")[1],
      name: topic.split("/")[1],
      type: topic.split("/")[2]
    };
    SocketIO.emit(newTelemetry);
  },

  registeredMessage(storedTelem) {
    SocketIO.emit(storedTelem);
  }
};

module.exports = messageEmitter;
