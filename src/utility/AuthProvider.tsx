import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children:  React.ReactNode
}
// `AuthProvider` 컴포넌트에서 로그인 상태를 관리
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    // retrieve initial state from localstorage
    // return true //임시용
    const storedToken = localStorage.getItem('accesstoken');
    return !!storedToken; // 토큰이 있으면 로그인된 상태로 설정
  }); // Initial login status

  useEffect(() => {
    if (!loggedIn) {
      localStorage.removeItem('accesstoken'); // 로그아웃되면 토큰 삭제
    }
  }, [loggedIn]);
  return (
    <AuthContext.Provider
      value={{ loggedIn, setLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
