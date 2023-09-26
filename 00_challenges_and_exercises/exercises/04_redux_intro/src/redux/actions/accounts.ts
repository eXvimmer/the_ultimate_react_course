import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";

export type Currency = "USD" | "EUR" | "GBP";

export enum ActionType {
  DEPOSIT = "DEPOSIT",
  CONVERTING_CURRENCY = "CONVERTING_CURRENCY",
  WITHDRAW = "WITHDRAW",
  REQUEST_LOAN = "REQUEST_LOAN",
  PAY_LOAN = "PAY_LOAN",
}

export type Action =
  | { type: ActionType.DEPOSIT; payload: number }
  | { type: ActionType.CONVERTING_CURRENCY }
  | { type: ActionType.WITHDRAW; payload: number }
  | {
      type: ActionType.REQUEST_LOAN;
      payload: { loanPurpose: string; amount: number };
    }
  | { type: ActionType.PAY_LOAN };

/* action creators */
export function deposit(amount: number, currency: Currency) {
  if (currency === "USD") {
    return {
      type: ActionType.DEPOSIT as const,
      payload: amount,
    };
  }

  // thunk action creator
  // NOTE: instead of Action it's better to use the exact type
  // NOTE: if you need to use the return type then change this to Promise<void>
  const actionCreator: ThunkAction<void, RootState, null, Action> = async (
    dispatch,
    /* getState */
  ) => {
    try {
      dispatch({ type: ActionType.CONVERTING_CURRENCY });
      const host = "api.frankfurter.app";
      const res = await fetch(
        `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`,
      );
      const data = await res.json();
      /* {
        "amount": 50,
        "base": "GBP",
        "date": "2023-09-25",
        "rates": {
          "USD": 61.134
        }
      } */
      dispatch({
        type: ActionType.DEPOSIT,
        payload: data.rates.USD as number,
      });
    } catch (error) {
      // Handle error if needed
    }
  };

  return actionCreator;
}

export function withdraw(amount: number) {
  return {
    type: ActionType.WITHDRAW as const,
    payload: amount,
  };
}

export function requestLoan(amount: number, loanPurpose: string) {
  return {
    type: ActionType.REQUEST_LOAN as const,
    payload: {
      amount,
      loanPurpose,
    },
  };
}

// TODO: get the amount as argument
export function payLoan() {
  return {
    type: ActionType.PAY_LOAN as const,
  };
}
