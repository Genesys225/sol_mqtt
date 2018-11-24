import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import nodesReducer from "./nodesReducer";
import telemetryRangeReducer from "./telemetryRangeReducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  telemetry: nodesReducer,
  sensors: telemetryRangeReducer,
  errors: errorReducer
});
