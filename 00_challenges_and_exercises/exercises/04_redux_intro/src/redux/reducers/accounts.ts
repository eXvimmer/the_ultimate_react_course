import { Reducer } from "redux";
import { Action, ActionType } from "../actions/accounts";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export type State = typeof initialState;

const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.DEPOSIT: {
      if (action.payload <= 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    }
    case ActionType.CONVERTING_CURRENCY: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ActionType.WITHDRAW: {
      if (action.payload <= 0 || action.payload > state.balance) {
        return state;
        // TODO: show some kind of error when the withdraw amount is more than
        // balance.
      }
      return { ...state, balance: state.balance - action.payload };
    }
    case ActionType.REQUEST_LOAN: {
      if (action.payload.amount <= 0) return state;
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.amount,
      };
    }
    case ActionType.PAY_LOAN: {
      return {
        ...state,
        loan: 0,
        balance: state.balance - state.loan,
        loanPurpose: "",
      };
    }
    default:
      return state;
  }
};

export default reducer;
