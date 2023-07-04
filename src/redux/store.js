// import {applyMiddleware, combineReducers, legacy_createStore,compose} from "redux"
// import thunk from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit'; 
import MenReducer from "./MenReducer/reducer"
import cartReducer from "./cartReducer/reducer"

import AuthReducer from "../redux/authReducer/reducer"


// const rootReducer = combineReducers({
//    MenReducer,
//    AuthReducer,
//    cartReducer,
//   });
  
// const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;




  // export const store = legacy_createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

///sửa
export const store = configureStore({
  reducer: {
    MenReducer,cartReducer,AuthReducer
  },
  })

