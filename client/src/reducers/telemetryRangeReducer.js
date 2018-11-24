import {
  CACHE_SENSOR_TELEMETRY,
  CACHE_IN_PROGRESS,
  SET_NODE_NAME,
  SET_SENSOR_TYPE,
  SET_SENSOR_SAMPLE_RANGE
} from "../actions/types";

const initialState = {
  caching: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CACHE_SENSOR_TELEMETRY:
      return {
        ...state,
        ...action.payload
      };

    case SET_NODE_NAME:
      let { nodeName, data } = action.payload;
      state[nodeName] = Object.assign(state[nodeName], data);
      return {
        ...state
      };

    case SET_SENSOR_TYPE:
      let {
        nodeName: nodeName1,
        sensorType,
        from,
        to,
        sampleData
      } = action.payload;
      state[nodeName1][sensorType].from = from;
      state[nodeName1][sensorType].to = to;
      state[nodeName1][sensorType].sampleData.unshift(...sampleData);
      return {
        ...state
      };

    case SET_SENSOR_SAMPLE_RANGE:
      return state;

    case CACHE_IN_PROGRESS:
      return {
        ...state,
        caching: action.payload
      };

    default:
      return state;
  }
}
