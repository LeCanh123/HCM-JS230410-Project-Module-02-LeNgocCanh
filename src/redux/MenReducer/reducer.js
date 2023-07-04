// import {
//   MEN_REQUEST_FAILURE,
//   MEN_REQUEST_PENDING,
//   MEN_REQUEST_SUCCESS,
//   WOMEN_REQUEST_SUCCESS,
// } from "./actionType";

// const initialState = {
//   isLoading: false,
//   isError: false,
//   total: "",
//   men: [],
//   women: [],
// };

// export const reducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case MEN_REQUEST_FAILURE:
//       return { ...state, isLoading: false, isError: true };
//     case MEN_REQUEST_SUCCESS:
//       return {
//         ...state,
//         isLoading: false,
//         total: payload.total,
//         men: payload.data,
//       };
//     case MEN_REQUEST_PENDING:
//       return { ...state, isLoading: true };
//     case WOMEN_REQUEST_SUCCESS:
//       return {
//         ...state,
//         isLoading: false,
//         total: payload.total,
//         women: payload.data,
//       };
//     default:
//       return state;
//   }
// };




/////////////sửa
import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import {
  MEN_REQUEST_FAILURE,
  MEN_REQUEST_PENDING,
  MEN_REQUEST_SUCCESS,
  WOMEN_REQUEST_SUCCESS,
} from "./actionType";

const menSlice = createSlice({
  name: "men",
  initialState: {
    isLoading: false,
    isError: false,
    total: 0,
    women: [],
    men:[]
  },
  reducers: {
    getMenRequestPending: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    getMenRequestSuccess: (state, { payload }) => {
      console.log(payload);
      state.isLoading = false;
      state.isError = false;
      state.total = payload.total;
      state.men = payload.data;
    },
    getMenRequestFailure: (state) => {
      console.log("fail");
      state.isLoading = false;
      state.isError = true;
    },
    getWomenRequestSuccess: (state, { payload }) => {
      console.log(payload);
      state.isLoading = false;
      state.isError = false;
      state.total = payload.total;
      state.women = payload.data;
    },
  },
});

export const {
  getMenRequestPending,
  getMenRequestSuccess,
  getMenRequestFailure,
  getWomenRequestSuccess,
} = menSlice.actions;

export const fetchMensData = (paramObj) => async (dispatch) => {
  dispatch(getMenRequestPending());
  
  try {
    const res = await axios.get(
      process.env.REACT_APP_HOST + `men?_limit=12`,
      paramObj
    );
    
    const obj = {
      data: res.data,
      total: res.headers.get("X-Total-Count"),
    };
    
    dispatch(getMenRequestSuccess(obj));
    
  } catch (error) {
    dispatch(getMenRequestFailure());
  }
};

export const fetchWomensData = (paramObj) => async (dispatch) => {
  console.log("fetwwomen");
  dispatch(getMenRequestPending());
  
  try {
    const res = await axios.get(
      process.env.REACT_APP_HOST + `women?_limit=12`,
      paramObj
    );
    
    const obj = {
      data: res.data,
      total: res.headers.get("X-Total-Count"),
    };
    
    dispatch(getWomenRequestSuccess(obj));
    
  } catch (error) {
    dispatch(getMenRequestFailure());
  }
};

export default menSlice.reducer;

