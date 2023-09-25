import { createStore, Reducer } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

enum ActionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
  REQUEST_LOAN = "REQUEST_LOAN",
  PAY_LOAN = "PAY_LOAN",
}

type Action =
  | { type: ActionType.DEPOSIT; payload: number }
  | { type: ActionType.WITHDRAW; payload: number }
  | {
      type: ActionType.REQUEST_LOAN;
      payload: { loanPurpose: string; amount: number };
    }
  | { type: ActionType.PAY_LOAN; payload: number };

const reducer: Reducer<typeof initialState, Action> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ActionType.DEPOSIT: {
      if (action.payload <= 0) return state;
      return { ...state, balance: state.balance + action.payload };
    }
    case ActionType.WITHDRAW: {
      if (action.payload <= 0) return state;
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
      if (action.payload <= 0) return state;
      if (state.loan <= 0) {
        return {
          ...state,
          balance: state.balance + action.payload,
          loanPurpose: "",
        };
      }
      if (state.loan - action.payload < 0) {
        return {
          ...state,
          loan: 0,
          balance: state.balance + Math.abs(state.loan - action.payload),
          loanPurpose: "",
        };
      }
      return {
        ...state,
        loan: state.loan - action.payload,
      };
    }
    default:
      return state;
  }
};

/* action creators */
function deposit(amount: number) {
  return {
    type: ActionType.DEPOSIT as const,
    payload: amount,
  };
}

function withdraw(amount: number) {
  return {
    type: ActionType.WITHDRAW as const,
    payload: amount,
  };
}

function requestLoan(amount: number, loanPurpose: string) {
  return {
    type: ActionType.REQUEST_LOAN as const,
    payload: {
      amount,
      loanPurpose,
    },
  };
}

function payLoan(amount: number) {
  return {
    type: ActionType.PAY_LOAN as const,
    payload: amount,
  };
}

/* store */
const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(deposit(5000));
store.dispatch(withdraw(2000));
store.dispatch(requestLoan(4900, "I wanna have fun"));
store.dispatch(payLoan(5000));
