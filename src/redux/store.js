import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import todoReducer from "./reducer"
let rootreducer = combineReducers({ todoReducer });
export const store=legacy_createStore(rootreducer,applyMiddleware(thunk))

// import { legacy_createStore } from "redux";
// import todoReducer from "./reducer";

// export const store = legacy_createStore(todoReducer);

