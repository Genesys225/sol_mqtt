const TelemDb = require("../db/TelemDb");
const telemDb = new TelemDb();
const messageEmitter = require("./messageEmitter");

module.exports = telemetryActions = {
  registeredList: {},
  setRegisteredList(newRegisteredList) {
    this.registeredList = newRegisteredList;
  },
  logTelemetry(mqttPacket) {
    const { topic, payload } = mqttPacket;
    // check if packet is from a registered node
    this.registeredList &&
    Object.keys(this.registeredList).filter(
      service => service === topic.split("/")[0]
    ).length > 0
      ? telemDb // write to db
          .createTelemDoc(topic, payload)
          // emit to socket
          .then(storedTelem => messageEmitter.registeredMessage(storedTelem))
      : // emit to deferent socket if not registered
      topic.substr(0, 11) === "relayClient" &&
        Object.keys(this.registeredList).filter(
          service => service === topic.split("/")[1]
        ).length > 0
      ? messageEmitter.relayClientMessage(topic, payload)
      : messageEmitter.unRegisteredMessage(topic, payload);
  },

  getTelemetryBetweenDates(nodeName, sonsorType, from, to) {
    return new Promise((resolve, reject) => {
      telemDb
        .getBetweenDates(nodeName, sonsorType, from, to)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
};
