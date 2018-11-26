import { GET_ERRORS, SET_USER_PREFERENCES } from "./types";

import axios from "axios";

export const createOrUpdateHandel = (handleData, saveCallback) => dispatch => {
  // Create Or Update Handel
  axios
    .post(`/api/users/assign-handle/${handleData.title}`, handleData)
    .then(res => {
      saveCallback(res.statusText);
      dispatch(getUserPreferences(handleData.user_id));
    })
    .catch(err => {
      saveCallback(err.response.data.errors);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getUserPreferences = userId => dispatch => {
  // get User Preferences
  axios
    .get(`/api/users/get-preferences/${userId}`)
    .then(res => {
      dispatch(setUserPreferences(res.data));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

// Set user preferences
export const setUserPreferences = preferences => dispatch => {
  dispatch({
    type: SET_USER_PREFERENCES,
    payload: preferences
  });
};
