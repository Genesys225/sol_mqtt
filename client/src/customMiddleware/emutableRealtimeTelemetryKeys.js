import {
  ADD_NODE_2NODES,
  ADD_TYPE_2NODE,
  SET_VALUE_2NODE_TYPE
} from "../actions/types";

export default (store, action) => {
  let { type, payload } = action;
  const { nodes } = store.getState().telemetry;
  if (type === "SET_NEW_TELEMETRY") {
    const { name, type, value, units } = payload;
    payload = nodes;
    let newMessageObject = { [type]: { value: value + units } };
    if (nodes[name]) {
      if (nodes[name][type]) {
        payload[name][type] = Object.assign(
          nodes[name][type],
          newMessageObject[type]
        );
        return {
          type: SET_VALUE_2NODE_TYPE,
          payload: { name, type, value: value + units }
        };
      } else {
        payload[name] = Object.assign(nodes[name], newMessageObject);
        return {
          type: ADD_TYPE_2NODE,
          payload: (name, payload[name])
        };
      }
    } else {
      payload = Object.assign(payload, {
        [name]: { [type]: { value: value + units } }
      });
      return {
        type: ADD_NODE_2NODES,
        payload
      };
    }
  } else return false;
  //console.log(payload, nodes);
};
