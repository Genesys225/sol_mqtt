const bonjour = require("bonjour")();
const express = require("express");
const Mongoose = require("./db/Mongoose");
const bodyParser = require("body-parser");
const mqtt = require("./mqtt/mqtt");
var path = require("path");
const nodesActions = require("./sensor_nodes/nodesActions");
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
  server.use(express.static(path.join(__dirname + "/client/build")));
  server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/client/build/index.html"));
  });
} else {
  server.use(express.static(path.join(__dirname + "/client/public")));
  server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/client/public/index.html"));
  });
}

const port = process.env.PORT || 5000;

const io = new SocketIO(port + 1);
const mqttBroker = new mqtt();

// "Express" server establish
server.listen(port, () => console.log(`Server running on port ${port}`));

// "Bonjur" advertise an HTTP server on port
bonjour.publish({
  name: "sol-server",
  type: "http",
  port: port
});
