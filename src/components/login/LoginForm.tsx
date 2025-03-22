// 마이페이지 클릭 -> 로그인 안되어있음 -> 이 페이지로 온다
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/checkbox.css';
import ButtonBig from './ButtonBig';
import InputBox from './InputBox';
import {useAuth} from "../../utility/useAuth"

interface LoginActions {
  name: string;
  path: string;
}
const loginOptions: LoginActions[] = [
  { name: '아이디 찾기', path: '#' },
  { name: '비밀번호 찾기', path: '#' },
  { name: '회원가입', path: '/members/register' },
];

const LoginForm = (): React.JSX.Element => {
  const navigate = useNavigate(); //다른 페이지로 이동시켜줌
  const { setLoggedIn, setMemberId } = useAuth(); //apicontext
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  // 암호 길이 확인 (refactor 필요)
  const validatePassword = (valPW: string): string | null => {
    if (valPW.length <= 5) {
      return '암호는 6자 이상이어야 합니다';
    }
    return null;
  };

  // 로그인 버튼을 클릭하면 실행
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    // prevents form's default behavior(refresh) upon submitting
    e.preventDefault();
    try {
      const apiUrl =
        import.meta.env.NODE === 'production'
          ? import.meta.env.VITE_API_URL_PROD
          : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.post(`${apiUrl}/member/login`, {
        loginId: loginId,
        password: password,
      });

      if (response.data.token) {
        localStorage.setItem('jwt', response.data.token); // Save the JWT in localStorage
        setMemberId(response.data.memberId); //memberId contextAPI 저장
        setLoggedIn(true); // Update login status
        navigate('/mypage'); // Redirect user to the desired page
      } else {
        console.error('Wrong Info');
      }
    } catch (error) {
      console.error('LoginError', error);
    }
  };

  return (
    <div id="loginForm" className="p-[120px]">
      <form
        action=""
        id="login-wrap"
        className="max-w-[400px] mx-[auto] text-center"
        onSubmit={handleLogin}
      >
        <h2 className="text-4xl font-medium">로그인</h2>
        <InputBox
          className=""
          type="text"
          id="loginId"
          name="loginId"
          placeholder="User ID"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          //   setLoginName(e.target.value)
          // }
        />
        <InputBox
          type="password"
          id="password"
          name="password"
          placeholder="암호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          //   setPassword(e.target.value)
          // }
          validate={validatePassword}
        />
        {/* 자동로그인 체크박스. Toggle상태를 기억하기 */}
        <div className="checkboxContainer flex text-left pl-2 mt-2 text-[gray]">
          <input
            className="mr-3"
            type="checkbox"
            id="autologin"
            name="autologin"
            placeholder="자동 로그인*"
          />
          <label htmlFor="autologin" className="text-sm">
            자동 로그인
          </label>
        </div>
        <div id="loginAction" className="mt-10 flex justify-around text-[gray]">
          {loginOptions.map((loginOption, idx) => (
            <Link
              key={idx}
              to={loginOption.path}
              className="block w-[33%] hover:text-[black]"
            >
              {loginOption.name}
            </Link>
          ))}
        </div>
        <ButtonBig name="로그인" arialabel="로그인" type="submit" />
        <p className="mt-[80px]">다른 방법으로 로그인하기</p>
        <ButtonBig
          provider="kakao"
          name="카카오 로그인"
          arialabel="카카오 로그인"
        />
        <ButtonBig
          provider="google"
          name="구글 로그인"
          arialabel="구글 로그인"
        />
      </form>
    </div>
  );
};
export default LoginForm;
