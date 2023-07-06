
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
      const res = await axios.get("http://localhost:3000/" + "registeredUser");
      dispatch(signInRequest(res.data));
    } catch (e) {
      dispatch(signInFailure());
    }
  };

export const loginFunction =
  (payload) =>
  async (dispatch) => {
    dispatch(signInSuccess(payload));
  };

export const logout =
  () =>
  async (dispatch) => {
    dispatch(signOut());
  };

export default SignUpSlice.reducer
