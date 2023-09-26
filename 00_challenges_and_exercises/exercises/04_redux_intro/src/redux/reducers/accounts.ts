import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      // TODO: add thunk
      state.balance += action.payload;
    },

    withdraw(state, action: PayloadAction<number>) {
      if (action.payload <= 0 || action.payload > state.balance) {
        return;
      }
      state.balance -= action.payload;
    },

    requestLoan: {
      prepare(
        amount: number,
        purpose: string,
      ): { payload: { amount: number; purpose: string } } {
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
  },
});

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;
