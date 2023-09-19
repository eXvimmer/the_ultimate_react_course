import { createContext, useContext } from "react";
import { iUser } from "../types";

export const AuthContext = createContext<{
  user: iUser | null;
  isAuthenticated: boolean;
  login?(email: string, password: string): void;
  logout?(): void;
}>({ user: null, isAuthenticated: false });

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext was used outside AuthProvider");
  }
  return context;
}
