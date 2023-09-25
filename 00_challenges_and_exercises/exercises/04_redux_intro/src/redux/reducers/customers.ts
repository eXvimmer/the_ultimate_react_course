import { Reducer } from "redux";
import { initialState, Action, ActionType } from "../actions/customers";

const reducer: Reducer<typeof initialState, Action> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ActionType.CREATE_CUSTOMER: {
      return {
        ...state,
        ...action.payload,
        createdAt: new Date().toISOString(),
      };
    }
    case ActionType.UPDATE_NAME:
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
