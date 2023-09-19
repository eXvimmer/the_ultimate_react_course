import { ReactNode, Reducer, useReducer } from "react";
import { iUser } from "../types";
import { AuthContext } from "./FakeAuthContext";

enum ActionType {
  LOGIN,
  LOGOUT,
}

type Action =
  | { type: ActionType.LOGIN; payload: iUser }
  | { type: ActionType.LOGOUT };

interface State {
  user: null | iUser;
  isAuthenticated: boolean;
}

const initialState: State = {
  user: null,
  isAuthenticated: false,
};

const reducer: Reducer<State, Action> = (_, action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return { user: action.payload, isAuthenticated: true };
    case ActionType.LOGOUT:
      return { user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: ActionType.LOGIN, payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: ActionType.LOGOUT });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
