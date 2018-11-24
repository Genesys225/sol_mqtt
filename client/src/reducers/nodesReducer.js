import {
  ADD_NODE_2NODES,
  ADD_TYPE_2NODE,
  SET_VALUE_2NODE_TYPE
} from "../actions/types";

const initialState = {
  nodes: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_NODE_2NODES:
      return {
        ...state,
        nodes: action.payload
      };
    case ADD_TYPE_2NODE:
      const { name: name1, type: type1 } = action.payload;
      state.nodes[name1] = type1;
      return {
        ...state
      };
    case SET_VALUE_2NODE_TYPE:
      const { name, type, value } = action.payload;
      state.nodes[name][type] && (state.nodes[name][type].value = value);
      return {
        ...state
      };
    default:
      return state;
  }
}
