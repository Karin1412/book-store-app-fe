import { User } from "@/types/user";
import { createContext } from "react";

export type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
};
const defaultValue: AuthContextType = {
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
};
export const AuthContext = createContext<AuthContextType>(defaultValue);
