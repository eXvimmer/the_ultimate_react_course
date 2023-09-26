export enum ActionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
  REQUEST_LOAN = "REQUEST_LOAN",
  PAY_LOAN = "PAY_LOAN",
}

export type Action =
  | { type: ActionType.DEPOSIT; payload: number }
  | { type: ActionType.WITHDRAW; payload: number }
  | {
      type: ActionType.REQUEST_LOAN;
      payload: { loanPurpose: string; amount: number };
    }
  | { type: ActionType.PAY_LOAN };

/* action creators */
export function deposit(amount: number) {
  return {
    type: ActionType.DEPOSIT as const,
    payload: amount,
  };
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
