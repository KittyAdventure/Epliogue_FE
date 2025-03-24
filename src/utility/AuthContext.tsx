import { createContext } from 'react';

// 로그인 상태와 관련된 Context 생성
interface AuthContextProps {
  loggedIn: boolean; // 로그인 여부
  setLoggedIn: (status: boolean) => void; // 로그인 상태 변경 함수
  // memberId: string;
  // setMemberId: (id: string) => void;
}

const defaultContextValue: AuthContextProps = {
  loggedIn: false, // 기본값은 로그인되지 않은 상태
  setLoggedIn: () => {}, // 기본적으로 빈 함수로 설정
};

// loggedIn과 setLoggedIn이 항상 undefined가 아니라 false와 setLoggedIn 함수로 기본값
export const AuthContext = createContext<AuthContextProps>(defaultContextValue);