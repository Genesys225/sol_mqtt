var srv = require("http").createServer();
var io = require("socket.io")(srv);
const openSocket = require("socket.io-client");

module.exports = class SocketIO {
  constructor(port) {
    srv.listen(port);
    this.socet = null;
  }

  static emit(publishObject, eventType = "event") {
    io.emit(eventType, publishObject);
    if (process.env.NODE_ENV === "production") {
      !this.socket && (this.socket = openSocket("http://10.8.0.13:5001"));
      this.socket.emit(eventType, publishObject);
    }
  }

  onConnect() {
    io.on("connection", function(client) {
      console.log("socet connected: " + client);
    });
  }
  onEvent() {
    client.on("event", function(data) {});
  }
  onDisconnect() {
    client.on("disconnect", function() {});
  }
};
