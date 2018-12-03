const bonjour = require("bonjour")();
const express = require("express");
const Mongoose = require("./db/Mongoose");
const bodyParser = require("body-parser");
const mosca = require("mosca");
var path = require("path");
const nodesActions = require("./sensor_nodes/nodesActions");
const telemetryActions = require("./sensor_nodes/telemetryActions");
const passport = require("passport");

const nodes = require("./routes/api/nodes");
const users = require("./routes/api/users");
const telemetry = require("./routes/api/telemetry");

const server = express();

const SocketIO = require("./socket-io/SocketIO");

// "Passport" Config
require("./config/passport")(passport);

// "Body parser" middleware
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// DB connect ("Mongoose")
new Mongoose()
  .connect()
  .then(() => {
    nodesActions.updateRegistered();
  })
  .catch(err => {
    // we will not be here...
    console.error("App starting error:", err.stack);
    process.exit(1);
  });
//use routes
server.use("/api/nodes", nodes);
server.use("/api/users", users);
server.use("/api/telemetry", telemetry);

// enable "client" access to it's local depedncies (bootstrap, fonts, etc)
if (process.env.NODE_ENV === "production") {
  server.use(express.static("client/build"));
  server.use(
    express.static(__dirname + "/node_modules/jquery/dist/jquery.slim.min.js")
  );
  server.use(
    express.static(
      __dirname + "/node_modules/bootstrap/dist/js/bootstrap.min.js"
    )
  );
  server.use(
    express.static(
      __dirname + "node_modules/@fortawesome/fontawesome-free/js/all.js"
    )
  );
  server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/client/build/index.html"));
  });
} else {
  server.use(express.static(__dirname + "/client"));
  server.use(express.static(__dirname + "/client/public"));
}

// "mosca" mqtt
var settings = {
  port: 1883
};
var broker = new mosca.Server(settings);

const port = process.env.PORT || 5000;

const io = new SocketIO(port + 1);

// "Express" server establish
server.listen(port, () => console.log(`Server running on port ${port}`));

// "Bonjur" advertise an HTTP server on port
bonjour.publish({
  name: "sol-server",
  type: "http",
  port: port
});

// "mosca" mqtt
broker.on("clientConnected", client => {
  console.log("client connected", client.id);
});

// fired when a message is received
broker.on("published", function(packet, client) {
  telemetryActions.logTelemetry(packet);
});

broker.on("ready", () => console.log("Mosca server is up and running"));
