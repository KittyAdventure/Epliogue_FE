import { useState } from 'react';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children:  React.ReactNode
}
// Create a provider component
//used at higher level (main.tsx) to wrap entire app
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false); // Initial login status
  const [memberId, setMemberId] = useState<string>(''); // Initial member ID

  return (
    <AuthContext.Provider
      value={{ loggedIn, setLoggedIn, memberId, setMemberId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
