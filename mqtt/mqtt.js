// "mosca" mqtt
const mosca = require("mosca");
const mqttClient = require("mqtt");

const telemetryActions = require("../sensor_nodes/telemetryActions");

module.exports = class Mqtt {
  constructor(port = 1883) {
    let settings = {
      port
    };
    this.relayAnabled = false;
    this.broker = new mosca.Server(settings);
    this.initializeBroker(this.broker);
  }

  initializeBroker(broker) {
    this.brokerEstablishedCallBack(broker);
    this.listenOnClientConnected(broker);
    this.listenOnMessageRecieved(broker);
  }

  brokerEstablishedCallBack(broker) {
    broker.on("ready", () => console.log("Mosca server is up and running"));
  }

  listenOnClientConnected(broker) {
    broker.on("clientConnected", client =>
      console.log("client connected", client.id)
    );
  }

  listenOnMessageRecieved(broker) {
    broker.on("published", (packet, client) => {
      telemetryActions.logTelemetry(packet);
      this.relayAnabled &&
        this.relayClient.publish(packet.topic, packet.payload);
    });
  }

  static establishMessageRelay(cloudHost, cloudPort) {
    return new Promise((resolve, reject) => {
      this.relayClient = mqttClient.connect([
        { host: cloudHost, port: cloudPort }
      ]);
      this.relayClient.on("connect", () => {
        this.relayAnabled = true;
        resolve({
          response: "live telemetry relay established",
          cloudHost,
          cloudPort
        });
      });
    });
  }
};
