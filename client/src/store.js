import { createStore, applyMiddleware, compose } from "redux";
import emutableRealtimeTelemetryKeys from "./customMiddleware/emutableRealtimeTelemetryKeys";
import emutableTelemetryLog from "./customMiddleware/emutableTelemetryLog";
// async action dispatch
import thunk from "redux-thunk";
// dispatchy action arrays
import multi from "redux-multi";
import rootReducer from "./reducers";
// redux persistance (cache)
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native

const customMiddleware = store => next => action => {
  let { type } = action;
  let mutateAction = false;
  //
  type === "SET_NEW_TELEMETRY" &&
    (mutateAction = emutableRealtimeTelemetryKeys(store, action));

  type === "SET_NEW_LOG_DATA" &&
    (mutateAction = emutableTelemetryLog(store, action));

  mutateAction && (action = mutateAction);
  next(action);
};

const middleware = [thunk, multi, customMiddleware];

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
let persistor = persistStore(store);
export { store, persistor };
