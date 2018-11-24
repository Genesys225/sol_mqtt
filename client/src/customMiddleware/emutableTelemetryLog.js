import {
  CACHE_SENSOR_TELEMETRY,
  SET_NODE_NAME,
  SET_SENSOR_TYPE,
  GET_ERRORS,
  CACHE_IN_PROGRESS
} from "../actions/types";

export default (store, action) => {
  const { sensors } = store.getState();
  const { dispatch } = store;
  let { sonsorCreds, axiosCallDB, cachingProgress } = action.payload;
  const { nodeName, sensorType, from, to } = sonsorCreds;
  cacheInProgress(true);
  if (Object.getOwnPropertyNames(sensors).indexOf(nodeName) > -1) {
    if (
      Object.getOwnPropertyNames(sensors[nodeName]).indexOf(sensorType) > -1
    ) {
      if (sensors[nodeName][sensorType].from <= from) {
        cachingProgress(nodeName, sensorType);
        return cacheInProgress(false);
      } else if (sensors[nodeName][sensorType].from > from) {
        sonsorCreds.newTo = sensors[nodeName][sensorType].from;
        axiosCallDB(sonsorCreds)
          .then(res => {
            dispatch({
              type: SET_SENSOR_TYPE,
              payload: {
                nodeName,
                sensorType,
                from,
                to,
                sampleData: res
              }
            });
            cachingProgress(nodeName, sensorType);
            return cacheInProgress(false);
          })
          .catch(err => {
            return getErrors(err);
          });
      }
    } else
      axiosCallDB(sonsorCreds)
        .then(res => {
          dispatch({
            type: SET_NODE_NAME,
            payload: {
              nodeName,
              data: { [sensorType]: { from, to, sampleData: res } }
            }
          });
          cachingProgress(nodeName, sensorType);
          return cacheInProgress(false);
        })
        .catch(err => {
          return getErrors(err);
        });
  } else
    axiosCallDB(sonsorCreds)
      .then(res => {
        dispatch({
          type: CACHE_SENSOR_TELEMETRY,
          payload: {
            [nodeName]: { [sensorType]: { from, to, sampleData: res } }
          }
        });
        cachingProgress(nodeName, sensorType);
        return cacheInProgress(false);
      })
      .catch(err => {
        return getErrors(err);
      });
};

const cacheInProgress = bool => {
  return {
    type: CACHE_IN_PROGRESS,
    payload: bool
  };
};

const getErrors = err => {
  return {
    type: GET_ERRORS,
    payload: err.response.data
  };
};
