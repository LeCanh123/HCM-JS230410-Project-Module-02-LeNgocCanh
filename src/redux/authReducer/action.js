import {
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNOUT,
} from "./actionTypes";
import axios from "axios";

export const SignUpFunc = (payload) => (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  axios
    .post(process.env.REACT_APP_HOST+
      "registeredUser",
      payload
    )
    .then((response) => {
      dispatch({ type: SIGNUP_SUCCESS });
    })
    .catch((e) => {
      dispatch({ type: SIGNUP_FAILURE });
    });
};

export const getdata = (dispatch) => {
  axios
    .get("http://localhost:3000/"+"registeredUser")
    .then((res) => {
      dispatch({ type: SIGNIN_REQUEST, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: SIGNIN_FAILURE });
    });
};

export const loginFunction = (payload) => (dispatch) => {
  dispatch({ type: SIGNIN_SUCCESS, payload: payload });
};

export const logout = (dispatch) => {
  dispatch({ type: SIGNOUT });
};
