import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { getUserPreferences, setUserPreferences } from "./userActions";
import jwt_decode from "jwt-decode";
import { persistor } from "../store";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData) // Maybe user userData instead decoding token
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to localStorage
      localStorage.setItem("jwtToken", token);
      // Set token to auth header
      setAuthToken(token);
      // Decode token (extract user data)
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      dispatch(getUserPreferences(decoded.id));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Logout user
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  persistor.purge();
  // Remove auth header for future requests
  setAuthToken(false);
  // Set the current user to {} which will set isAuthenticated to false (states)
  dispatch(setCurrentUser({}));
  dispatch(setUserPreferences({}));
};
