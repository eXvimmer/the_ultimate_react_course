import { Reducer, useReducer } from "react";
import "./styles.css";

enum ActionType {
  OPEN_ACCOUNT,
  DEPOSIT,
  WITHDRAW,
  REQUEST_LOAN,
  PAY_LOAN,
  CLOSE_ACCOUNT,
}

type Action =
  | { type: ActionType.OPEN_ACCOUNT }
  | { type: ActionType.DEPOSIT }
  | { type: ActionType.WITHDRAW }
  | { type: ActionType.REQUEST_LOAN }
  | { type: ActionType.PAY_LOAN }
  | { type: ActionType.CLOSE_ACCOUNT };

interface AppState {
  balance: number;
  loan: number;
  isActive: boolean;
}

const initialState: AppState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

const reducer: Reducer<AppState, Action> = (s, a) => {
  if (!s.isActive && a.type !== ActionType.OPEN_ACCOUNT) {
    return s;
  }

  switch (a.type) {
    case ActionType.OPEN_ACCOUNT:
      return { ...s, isActive: true, balance: 500 };
    case ActionType.DEPOSIT:
      return { ...s, balance: s.balance + 150 };
    case ActionType.WITHDRAW:
      return { ...s, balance: s.balance >= 50 ? s.balance - 50 : s.balance };
    case ActionType.REQUEST_LOAN:
      if (s.loan == 0) {
        return { ...s, loan: 5000, balance: s.balance + 5000 };
      }
      return s;
    case ActionType.PAY_LOAN:
      if (s.loan === 0) {
        return s;
      }
      return { ...s, loan: 0, balance: s.balance - s.loan };
    case ActionType.CLOSE_ACCOUNT:
      if (s.loan > 0 || s.balance !== 0) {
        return s;
      }
      return initialState;

    default:
      throw new Error("unknown action type for App");
  }
};

export default function App() {
  const [{ isActive, balance, loan }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          disabled={isActive}
          onClick={() => dispatch({ type: ActionType.OPEN_ACCOUNT })}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: ActionType.DEPOSIT })}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: ActionType.WITHDRAW })}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: ActionType.REQUEST_LOAN })}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: ActionType.PAY_LOAN })}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: ActionType.CLOSE_ACCOUNT })}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
