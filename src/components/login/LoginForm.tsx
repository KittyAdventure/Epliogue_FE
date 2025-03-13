// 마이페이지 클릭 -> 로그인 안되어있음 -> 이 페이지로 온다
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import '../../assets/css/checkbox.css';
import ButtonBig from './ButtonBig';
import InputBox from './InputBox';

interface LoginActions {
  name: string;
  path: string;
}
const loginOptions: LoginActions[] = [
  { name: '아이디 찾기', path: '#' },
  { name: '비밀번호 찾기', path: '#' },
  { name: '회원가입', path: '/login/signup' },
];
interface LoginCheck {
  setLoggedIn: (loggedIn: boolean) => void;
}

const LoginForm: React.FC<LoginCheck> = ({ setLoggedIn }) => {
  const navigate = useNavigate(); //다른 페이지로 이동시켜줌
  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('');

  // 암호 길이 확인 (refactor 필요)
  const validatePassword = (valPW: string): string | null => {
    if (valPW.length <= 6) {
      return '암호는 6자 이상이어야 합니다';
    }
    return null;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    // prevents form's default behavior(refresh) upon submitting
    e.preventDefault();
    // json-server는 POST가 안되서 test할려면 middleware필요-지금은 안함
    try {
      const response = await axios.get("http://localhost:5000/members")
      const user = response.data
      if (user) {
        console.log('Login Success', user);
        setLoggedIn(true);
        navigate('/mypage');
        // Redirect to MyPage if setLoggedIn true
      } else {
        console.error('Wrong Info');
      }
    } catch (error) {
      console.error('Error during login', error);
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
          placeholder="user1~user5"
          value={loginName}
          onChange={(e) => setLoginName(e.target.value)}
          // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          //   setLoginName(e.target.value)
          // }
        />
        <InputBox
          type="password"
          id="password"
          name="password"
          placeholder="암호: password"
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
        <ButtonBig name="로그인" arialabel="로그인" />
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
