// "mosca" mqtt
const mosca = require("mosca");
const mqttClient = require("mqtt");
var ip = require("ip");

const telemetryActions = require("../sensor_nodes/telemetryActions");

class Mqtt {
  constructor() {
    let settings = {
      port: 1883
    };
    this.relayAnabled = false;
    this.broker = new mosca.Server(settings);
  }

  initializeBroker(port = false) {
    let { broker } = this;
    if (port) {
      let settings = {
        port
      };
      broker = new mosca.Server(settings);
    }
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
        this.relayClient.publish("relayClient/" + packet.topic, packet.payload);
    });
  }

  establishMessageRelay(cloudHost, cloudPort) {
    return new Promise((resolve, reject) => {
      // this.relayClient = mqttClient.createConnection(
      //   cloudPort,
      //   cloudHost,
      //   (err) =>
      //     {if (err) throw err})

      // relayClient.connect({
      //       clientId: 'relayClient'
      //     });
      this.relayClient = mqttClient.connect(
        "mqtt://" + cloudHost + ":" + cloudPort,
        { clientId: "relayClient" + ip.address() }
      );
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
}

module.exports = mqttBroker = new Mqtt();
