// import {
//   SIGNUP_FAILURE,
//   SIGNUP_REQUEST,
//   SIGNUP_SUCCESS,
//   SIGNIN_FAILURE,
//   SIGNIN_REQUEST,
//   SIGNIN_SUCCESS,
//   SIGNOUT,
//   GET_USER,
// } from "./actionTypes";

// const SignUpState = {
//   createAccountLoading: false,
//   successCreate: false,
//   createError: false,
//   userData: [],
//   isAuth: false,
//   isLoading: false,
//   isError: false,
//   afterLoginUser: {},
// };

// export const reducer = (state = SignUpState, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case SIGNUP_REQUEST:
//       console.log(action.payload);
//       return {
//         ...state,
//         createAccountLoading: true
//       };

//     case SIGNUP_SUCCESS:
//       return {
//         ...state,
//         createAccountLoading: false,
//         successCreate: true,
//         createError: false,
//       };

//     case SIGNUP_FAILURE:
//       return {
//         ...state,
//         createAccountLoading: false,
//         successCreate: false,
//         creatError: true,
//       };

//     case SIGNIN_REQUEST:
//       return {
//         ...state,
//         isLoading: true,
//         userData: action.payload,
//       };

//     case SIGNIN_SUCCESS:
//       return {
//         ...state,
//         isLoading: false,
//         isAuth: true,
//         afterLoginUser: payload,
//         isError: false,
//       };

//     case SIGNIN_FAILURE:
//       return {
//         ...state,
//         isLoading: false,
//         isError: true,
//       };
//     case SIGNOUT:
//       return {
//         ...state,

//         isAuth: false,
//         isLoading: false,
//         isError: false,
//         successCreate: false,
//         createAccountLoading: false,
//         createError: false,
//       };
//     case GET_USER:
//       return {
//         ...state,
//       };
//     default:
//       return state;
//   }
// };

///sửa
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SignUpState = {
  createAccountLoading: false,
  successCreate: false,
  createError: false,
  userData: [],
  isAuth: false,
  isLoading: false,
  isError: false,
  afterLoginUser: {},
};

export const SignUpSlice = createSlice({
  name: "SignUp",
  initialState: SignUpState,
  reducers: {
    signUpRequest(state) {
      state.createAccountLoading = true;
    },
    signUpSuccess(state) {
      state.createAccountLoading = false;
      state.successCreate = true;
      state.createError = false;
    },
    signUpFailure(state) {
      state.createAccountLoading = false;
      state.successCreate = false;
      state.creatError = true;
    },
    signInRequest(state, action) {
      state.isLoading = true;
      state.userData = action.payload;
      console.log("signInRequest")
    },
    signInSuccess(state, action) {
      state.isLoading = false;
      state.isAuth = true;
      state.afterLoginUser = action.payload;
      state.isError = false;
    },
    signInFailure(state) {
      state.isLoading = false;
      state.isError = true;
    },
    signOut(state) {
      state.isAuth = false;
      state.isLoading = false;
      state.isError = false;
      state.successCreate = false;
      state.createAccountLoading = false;
      state.createError = false;
    },
  },
});

export const { signUpRequest, signUpSuccess, signUpFailure, signInRequest, signInSuccess, signInFailure, signOut } =
  SignUpSlice.actions;

export const SignUpFunc =
  (payload) =>
  async (dispatch) => {
    dispatch(signUpRequest());
    try {
      const response = await axios.post(
        process.env.REACT_APP_HOST + "registeredUser",
        payload
      );
      dispatch(signUpSuccess());
    } catch (e) {
      dispatch(signUpFailure());
    }
  };

export const getdata =
async (dispatch) =>{
  // async () => {
    try {
      console.log("try");
      const res = await axios.get("http://localhost:3000/" + "registeredUser");
      dispatch(signInRequest(res.data));
    } catch (e) {
      console.log("catch");
      dispatch(signInFailure());
    }
  };

export const loginFunction =
  (payload) =>
  async (dispatch) => {
    dispatch(signInSuccess(payload));
    console.log(payload);
  };

export const logout =
  () =>
  async (dispatch) => {
    dispatch(signOut());
  };

export default SignUpSlice.reducer
