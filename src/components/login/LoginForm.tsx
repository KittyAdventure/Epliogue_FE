// 마이페이지 클릭 -> 로그인 안되어있음 -> 이 페이지로 온다
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../assets/css/checkbox.css';
import { apiUrl } from '../../utility/AuthUtils';
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

const LoginForm = (): React.JSX.Element => {
  const navigate = useNavigate(); //다른 페이지로 이동시켜줌
  const location = useLocation();
  const { setLoggedIn } = useAuth(); //apicontext
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const validatePassword = (valPW: string): string | null => {
    if (valPW.length <= 5) {
      return '암호는 6자 이상이어야 합니다';
    }
    return null;
  };

  // Google Login ====================================================================================
  // ClientID in .env
  // npm install @react-oauth/google , wrap App in googleoauthprovider
  // import googlelogin in loginform
  const loginWithGoogle = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async ({ code }) => {
      console.log('Google login success:', code);
      // You get an access_token here, not an ID token.
      const replaceGoogleLogin = {
        loginId: 'testuser',
        password: '123456',
      };
      try {
        const response = await axios.post(
          `${apiUrl}/api/members/login`,
          replaceGoogleLogin,
          {
            // provider: 'google',
            // token: code,
            headers: { 'Content-Type': 'application/json' },
          },
        );
        console.log('Google-Style Login', response);
        localStorage.setItem('accesstoken', response.data.data.accessToken);
        localStorage.setItem('memberId', response.data.data.user.userId);
        setLoggedIn(true);
        navigate('/');
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      } catch (err) {
        console.error('Google-BackendReq Err', err);
      }
    },
    onError: () => {
      console.log('Google login failed');
    },
  });
  // End Google Login ====================================================================================

  // Kakao Login =====================================================================================
  const KAKAO_JS_KEY = '330b1360b8fcb11474e00db43c9f98b6'; // Replace with your actual key
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY);
      console.log('Kakao SDK Initialized:', window.Kakao.isInitialized());
    }
  }, []);
  const handleKakaoLogin = () => {
    if (!window.Kakao || !window.Kakao.Auth) return;

    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:5173/login', //프론트와 백엔드가 같이 똑같은 redirectURI 를 사용해야되지만 4/8 현재 조율 불가
      // redirectUri: `${apiUrl}/api/members/auth/kakao/callback`, //직접 백엔드 api 에 보내서 해결하도록 만들기 -> X 원래 설정대로 가야된다 코드받고 백엔드에 보내기
    });
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search); //url 에서 코드를 찾아 아래 code 에 할당한다
    const code = urlParams.get('code');
    if (code) {
      //prevent repeated login on refresh
      window.history.replaceState({}, '', location.pathname);

      // 카카오 로그인 흉내, 카카오로 할 경우 disable 처리
      const replaceKakaoLogin = {
        loginId: 'testuser',
        password: '123456',
      };
      //Kakao login flow
      axios
        .post(`${apiUrl}/api/members/login`, replaceKakaoLogin, {
          headers: {
            'Content-Type': 'application/json',
          },
          // kakao로그인시 아래 코드만 적용
          // provider: 'kakao',
          // token: code,
        })
        .then((res) => {
          console.log('Kakao-Style Login', res);
          localStorage.setItem('accesstoken', res.data.data.accessToken);
          localStorage.setItem('memberId', res.data.data.user.userId);
          setLoggedIn(true);
          navigate('/');
        })
        .catch((err) => {
          console.error(
            'Kakao login error:',
            err?.response?.data || err.message,
          );
        });
    }
  }, [location.search]);
  // End Kakao Login =============================================================================

  // 로그인 버튼을 클릭하면 실행
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
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
          required
        />
        <InputBox
          type="password"
          id="password"
          name="password"
          placeholder="암호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          validate={validatePassword}
          required
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
          type="button"
          onClick={handleKakaoLogin}
        />
        <ButtonBig
          provider="google"
          name="구글 로그인"
          arialabel="구글 로그인"
          type="button"
          onClick={loginWithGoogle}
        />
        {/* cannot style flexbiliy, useGoogleLogin */}
        {/* <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        /> */}
      </form>
    </div>
  );
};
export default LoginForm;
