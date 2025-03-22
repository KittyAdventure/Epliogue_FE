import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children:  React.ReactNode
}
// Create a provider component
//used at higher level (main.tsx) to wrap entire app
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(()=>{
    // retrieve initial state from localstorage
    // return true //임시용
    const storedToken = localStorage.getItem("accesstoken")
    return !!storedToken
  }); // Initial login status
  const [memberId, setMemberId] = useState<string>(''); // Initial member ID

  useEffect( ()=> {
    if (!loggedIn){
      localStorage.removeItem("token")
    }
  }, [loggedIn])
  return (
    <AuthContext.Provider
      value={{ loggedIn, setLoggedIn, memberId, setMemberId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
