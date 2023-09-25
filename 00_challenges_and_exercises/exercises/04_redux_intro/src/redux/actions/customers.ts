export interface State {
  fullName: string;
  nationalID: string;
  createdAt: string;
}

export const initialState: State = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

export enum ActionType {
  CREATE_CUSTOMER = "CREATE_CUSTOMER",
  UPDATE_NAME = "UPDATE_NAME",
}

export type Action =
  | {
      type: ActionType.CREATE_CUSTOMER;
      payload: Pick<State, "fullName" | "nationalID">;
    }
  | {
      type: ActionType.UPDATE_NAME;
      payload: string;
    };

export function createCustomer(fullName: string, nationalID: string) {
  return {
    type: ActionType.CREATE_CUSTOMER as const,
    payload: {
      fullName,
      nationalID,
    },
  };
}

export function updateName(fullName: string) {
  return {
    type: ActionType.UPDATE_NAME as const,
    payload: fullName,
  };
}
