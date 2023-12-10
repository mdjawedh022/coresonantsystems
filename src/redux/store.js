import { applyMiddleware, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import reudcer from "./reducer"

export const store = legacy_createStore(reudcer, applyMiddleware(thunk));
