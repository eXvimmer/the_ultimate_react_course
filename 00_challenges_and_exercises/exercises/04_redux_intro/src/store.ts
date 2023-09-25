import { createStore, combineReducers, Reducer } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

enum AccountActionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
  REQUEST_LOAN = "REQUEST_LOAN",
  PAY_LOAN = "PAY_LOAN",
}

type AccountAction =
  | { type: AccountActionType.DEPOSIT; payload: number }
  | { type: AccountActionType.WITHDRAW; payload: number }
  | {
      type: AccountActionType.REQUEST_LOAN;
      payload: { loanPurpose: string; amount: number };
    }
  | { type: AccountActionType.PAY_LOAN; payload: number };

const accountReducer: Reducer<typeof initialStateAccount, AccountAction> = (
  state = initialStateAccount,
  action,
) => {
  switch (action.type) {
    case AccountActionType.DEPOSIT: {
      if (action.payload <= 0) return state;
      return { ...state, balance: state.balance + action.payload };
    }
    case AccountActionType.WITHDRAW: {
      if (action.payload <= 0) return state;
      return { ...state, balance: state.balance - action.payload };
    }
    case AccountActionType.REQUEST_LOAN: {
      if (action.payload.amount <= 0) return state;
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.amount,
      };
    }
    case AccountActionType.PAY_LOAN: {
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
    type: AccountActionType.DEPOSIT as const,
    payload: amount,
  };
}

function withdraw(amount: number) {
  return {
    type: AccountActionType.WITHDRAW as const,
    payload: amount,
  };
}

function requestLoan(amount: number, loanPurpose: string) {
  return {
    type: AccountActionType.REQUEST_LOAN as const,
    payload: {
      amount,
      loanPurpose,
    },
  };
}

function payLoan(amount: number) {
  return {
    type: AccountActionType.PAY_LOAN as const,
    payload: amount,
  };
}

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

enum CustomerActionType {
  CREATE_CUSTOMER = "CREATE_CUSTOMER",
  UPDATE_NAME = "UPDATE_NAME",
}

type CustomerAction =
  | {
      type: CustomerActionType.CREATE_CUSTOMER;
      payload: typeof initialStateCustomer;
    }
  | {
      type: CustomerActionType.UPDATE_NAME;
      payload: string;
    };

function createCustomer(fullName: string, nationalID: string) {
  return {
    type: CustomerActionType.CREATE_CUSTOMER as const,
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(fullName: string) {
  return {
    type: CustomerActionType.UPDATE_NAME as const,
    payload: fullName,
  };
}

const customerReducer: Reducer<typeof initialStateCustomer, CustomerAction> = (
  state = initialStateCustomer,
  action,
) => {
  switch (action.type) {
    case CustomerActionType.CREATE_CUSTOMER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case CustomerActionType.UPDATE_NAME:
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
};

/* store */
const store = createStore(
  combineReducers({ account: accountReducer, customer: customerReducer }),
);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(createCustomer("Mustafa", "1"));
store.dispatch(deposit(5000));
store.dispatch(withdraw(2000));
store.dispatch(requestLoan(4900, "I wanna have fun"));
store.dispatch(payLoan(5000));
store.dispatch(updateName("Malena"));
