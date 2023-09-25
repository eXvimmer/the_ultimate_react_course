import { combineReducers } from "redux";
import accountReducer from "./accounts";
import customerReducer from "./customers";

const reducers = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

export default reducers;

// NOTE: the required type to use in useSelector hooks (in react-redux)
export type RootState = ReturnType<typeof reducers>;
