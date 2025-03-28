// 마이페이지 클릭 -> 로그인 안되어있음 -> 이 페이지로 온다
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/checkbox.css';
import { useAuth } from '../../utility/useAuth';
import ButtonBig from './ButtonBig';
import InputBox from './InputBox';

interface LoginActions {
  name: string;
  path: string;
}
const loginOptions: LoginActions[] = [
  { name: '아이디 찾기', path: '#' },
  { name: '비밀번호 찾기', path: '#' },
  { name: '회원가입', path: '/register' },
];

// RestAPI 611608caa57d197960e0a8fed39bdea4
// Kakao.init('611608caa57d197960e0a8fed39bdea4');
// console.log(Kakao.initialized())
const LoginForm = (): React.JSX.Element => {
  const navigate = useNavigate(); //다른 페이지로 이동시켜줌
  const { setLoggedIn } = useAuth(); //apicontext
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  // const [useSocialLogin, setUseSocialLogin] = useState<boolean>(false); // State to toggle login method
  // const [selectedProvider, setSelectedProvider] = useState<string>('kakao'); // Example provider
  // const [socialLoginToken, setSocialLoginToken] = useState<string>('');

  // const [errorMsg, setErrorMsg] = useState<string | null>(null); // Error message state
  // const [successMsg, setSuccessMsg] = useState<string | null>(null); // Success message state

  // 암호 길이 확인 (refactor 필요)
  const validatePassword = (valPW: string): string | null => {
    if (valPW.length <= 5) {
      return '암호는 6자 이상이어야 합니다';
    }
    return null;
  };

  const KAKAO_JS_KEY = 'b9f8e210339fc67468499c6d5964ff35'; // Replace with your actual key
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY);
      console.log('Kakao SDK Initialized:', window.Kakao.isInitialized());
    }
  }, []);
  const handleKakaoLogin = () => {
    if (!window.Kakao) return;
    if (!window.Kakao.Auth) return;
    window.Kakao.Auth.login({
      success: function (authObj: { access_token: string }) {
        console.log('Kakao Login Success:', authObj);
        localStorage.setItem('accesstoken', authObj.access_token);

        window.Kakao.Auth.authorize({
          redirectUri: import.meta.env.VITE_API_URL_PROD, // Or your deployed URL
        });
      },
      fail: function (err: Error) {
        console.error('Kakao Login Failed:', err);
      },
    });
  };

  // 로그인 버튼을 클릭하면 실행
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const apiUrl =
        import.meta.env.NODE === 'production'
          ? import.meta.env.VITE_API_URL_PROD
          : import.meta.env.VITE_API_URL_DEV;

      const response = await axios.post(
        `${apiUrl}/api/members/login`,
        { loginId: userId, password: password },
        { headers: { 'Content-Type': 'application/json' } },
      );

      if (response.status === 200) {
        console.log(response.data.message); // 로그인 성공 메시지
        localStorage.setItem('accesstoken', response.data.data.accessToken);
        localStorage.setItem('memberId', response.data.data.user.userId);
        setLoggedIn(true);
        navigate(-1); // 이전 페이지로 이동
        window.scroll(0, 0);
      } else {
        console.error('로그인 실패: ', response.statusText);
      }
    } catch (error) {
      console.error('로그인 요청 오류:', error);
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
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
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
          onClick={handleKakaoLogin}
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
