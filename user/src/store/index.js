import { createStore, applyMiddleware, combineReducers } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";
const store = createStore(
  combineReducers({ reducer: reducer }),
  applyMiddleware(thunk)
);

export default store;
