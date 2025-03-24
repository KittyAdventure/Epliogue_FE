import { NavigateFunction } from 'react-router-dom';
// any 타입 -> NavigateFunction
export const redirectToLogin = (navigate: NavigateFunction) => {
  navigate('/login');
  alert('로그인이 필요합니다.');
  window.scroll(0, 0);
};
