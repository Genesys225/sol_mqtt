const bonjour = require("bonjour")();
const express = require("express");
const Mongoose = require("./db/Mongoose");
const bodyParser = require("body-parser");
const mosca = require("mosca");
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
new Mongoose().connect().then(() => {
  nodesActions.updateRegistered();
});

//use routes
server.use("/api/nodes", nodes);
server.use("/api/users", users);
server.use("/api/telemetry", telemetry);

// enable "client" access to it's local depedncies (bootstrap, fonts, etc)
server.use(express.static(__dirname + "/client"));

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
