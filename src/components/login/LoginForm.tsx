import { Link } from 'react-router-dom';
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

// 마이페이지 클릭 -> 로그인 안되어있음 -> 이 페이지로 온다
const LoginForm = (): React.JSX.Element => {
  return (
    <div id="loginForm" className="p-[120px]">
      <form
        action=""
        id="login-wrap"
        className="max-w-[400px] mx-[auto] text-center"
      >
        <h2 className="text-4xl">로그인</h2>
        <InputBox
          className=""
          type="text"
          id="nickname"
          name="nickname"
          placeholder="아이디"
        />
        <InputBox
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호"
        />
        <div className='checkbox text-left pl-2 mt-2'>
          <input
            type="checkbox"
            id="autologin"
            name="autologin"
            placeholder="자동 로그인*"
          />
        </div>
        <label htmlFor="autologin">자동 로그인</label>
        <div id="loginAction" className='mt-10 flex justify-around text-[gray]'>
          {loginOptions.map((loginOption, idx) => (
            <Link key={idx} to={loginOption.path}>
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
