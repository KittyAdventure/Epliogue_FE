import { createContext } from 'react';

// Define the shape of the context data
interface AuthContextProps {
  loggedIn: boolean;
  setLoggedIn: (status: boolean) => void;
  memberId: string;
  setMemberId: (id: string) => void;
}

// Create the AuthContext with default values
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);