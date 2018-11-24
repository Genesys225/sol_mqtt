import openSocket from "socket.io-client";

import { SET_NEW_TELEMETRY } from "./types";

const socket = openSocket("http://localhost:5001");
const subscribe2RegisteredNodes = () => dispatch => {
  socket.on("event", sensorPacket => {
    dispatch({
      type: SET_NEW_TELEMETRY,
      payload: sensorPacket
    });
  });
};

export { subscribe2RegisteredNodes };
