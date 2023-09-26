import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from ".";

export type Currency = "USD" | "EUR" | "GBP";

export type DepositActions =
  | { type: "account/deposit"; payload: number }
  | { type: "account/convertingCurrency" };

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export type State = typeof initialState;

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action: PayloadAction<number>) {
      state.balance += action.payload;
      state.isLoading = false;
    },

    withdraw(state, action: PayloadAction<number>) {
      if (action.payload <= 0 || action.payload > state.balance) {
        return;
      }
      state.balance -= action.payload;
    },

    requestLoan: {
      prepare(amount: number, purpose: string) {
        return {
          payload: {
            amount,
            purpose,
          },
        };
      },

      reducer(
        state,
        action: PayloadAction<{ amount: number; purpose: string }>,
      ) {
        if (action.payload.amount <= 0 || state.loan > 0) {
          return;
        }
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },

    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

// NOTE: the RTK way of doing this is to use to use the automatic action
// creator, but this is fine too.
export function deposit(amount: number, currency: Currency) {
  if (currency === "USD") {
    return {
      type: "account/deposit" as const,
      payload: amount,
    };
  }

  const actionCreator: ThunkAction<
    void,
    RootState,
    null,
    DepositActions
  > = async (
    dispatch,
    /* getState */
  ) => {
    try {
      dispatch({ type: "account/convertingCurrency" as const });
      const host = "api.frankfurter.app";
      const res = await fetch(
        `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`,
      );
      const data = await res.json();
      dispatch({
        type: "account/deposit" as const,
        payload: data.rates.USD as number,
      });
    } catch (error) {
      // Handle error if needed
    }
  };

  return actionCreator;
}

export default accountSlice.reducer;
