import { combineReducers, createStore } from "redux";
import accountReducer from "../reducers/accounts";
import customerReducer from "../reducers/customers";

const store = createStore(
  combineReducers({ account: accountReducer, customer: customerReducer }),
);

export default store;
