import { useContext } from 'react';
import { AuthContext } from './AuthContext';
// Custom hook to use the AuthContext
// 무슨일이 일어나는지 알아봐야됨
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
