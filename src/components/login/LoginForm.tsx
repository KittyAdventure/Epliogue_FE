import React, {useState} from "react"
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom"
import axios from "axios"

import ButtonBig from './ButtonBig';
import InputBox from './InputBox';
import '../../assets/css/checkbox.css';

interface LoginActions {
  name: string;
  path: string;
}
const loginOptions: LoginActions[] = [
  { name: '아이디 찾기', path: '#' },
  { name: '비밀번호 찾기', path: '#' },
  { name: '회원가입', path: '/login/signup' },
];

// 마이페이지 클릭 -> 로그인 안되어있음 -> 이 페이지로 온다
const LoginForm = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [loginName, setLoginName] = useState("")
  const [password, setPassword] = useState("")
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:3001/members');
      const members = response.data;
      console.log(members); // Should print the array of members

      const user = members.find(
        (member: { loginId: string; password: string }) =>
          member.loginId === loginName && member.password === password,
      );
      console.log(user); // Check the result of the find method

      if (user) {
        // Redirect to MyPage
        navigate('/mypage');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred during login');
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
          id="nickname"
          name="nickname"
          placeholder="user1"
          value={loginName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLoginName(e.target.value)
          }
        />
        <InputBox
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
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
        <ButtonBig name="로그인" arialabel="로그인"/>
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
