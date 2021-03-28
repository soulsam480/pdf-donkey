import { createContext } from 'react';

export interface User {
  name?: string;
  email?: string;
  username?: string;
  templates?: string[];
}

export interface UserState {
  isLoggedIn: boolean;
  user: User;
}

export const userContext = createContext<{
  userState: UserState;
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
} | null>(null);
