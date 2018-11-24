var srv = require("http").createServer();
var io = require("socket.io")(srv);

module.exports = class SocketIO {
  constructor(port) {
    srv.listen(port);
  }

  static emit(publishObject, eventType = "event") {
    io.emit(eventType, publishObject);
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
