import { SET_NEW_LOG_DATA } from "./types";

import axios from "axios";

const axiosCallDB = sonsorCreds => {
  const { nodeName, sensorType, from, to, newTo } = sonsorCreds;
  return new Promise((resolve, reject) => {
    axios
      .get(
        `/api/telemetry/get-between/${nodeName}/${sensorType}/${from}/${
          newTo ? newTo : to
        }`
      )
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const fetchGraphData = (sonsorCreds, cachingProgress) => dispatch => {
  dispatch({
    type: SET_NEW_LOG_DATA,
    payload: {
      sonsorCreds,
      axiosCallDB,
      cachingProgress
    }
  });
};
