import { EDIT_NODE_HANDLE, SET_USER_PREFERENCES } from "../actions/types";

const initialState = {
  preferences: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EDIT_NODE_HANDLE:
      return {
        ...state
      };
    case SET_USER_PREFERENCES:
      return {
        ...state,
        preferences: action.payload
      };
    default:
      return state;
  }
}
