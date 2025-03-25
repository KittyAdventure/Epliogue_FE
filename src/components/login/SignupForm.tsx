import axios from 'axios';
import { useState } from 'react';
import ButtonBig from './ButtonBig';
import InputBox from './InputBox';

// 회원가입 클릭 -> 이 페이지로 온다
const SignupForm = (): React.JSX.Element => {
  // New User
  const [loginId, setLoginId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  // 요청관련 메세지

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const validatePassword = (valPW: string): string | null => {
    if (valPW.length <= 5) {
      return '암호는 6자 이상이어야 합니다';
    }
    return null;
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력한 번호를 가지고 온다. 그 뒤로 무슨 일이 이러나느지 모름
    let input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (input.length > 3 && input.length <= 7) {
      input = input.replace(/(\d{3})(\d+)/, '$1-$2'); // Add hyphen after first 3 digits
    } else if (input.length > 7) {
      input = input.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3'); // Add hyphens at correct positions
    }
    setPhone(input.slice(0, 13)); // Limit to 13 characters
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const apiUrl = import.meta.env.VITE_API_URL_PROD;
      const payload = {
        loginId,
        email,
        password,
        birthDate,
        nickname,
        name,
        phone,
      };
      console.log(`${apiUrl}/api/member/register`);
      console.log(payload)
      const response = await axios.post(`${apiUrl}/api/member/register`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Register Response');
      console.log(response);
    } catch (error) {
      console.error("Error in signup form:", error)
    }
  };

  return (
    <div id="signupForm" className="p-[120px]">

      <form
        action=""
        id="signupWrap"
        className="max-w-[400px] mx-[auto] text-center"
        onSubmit={handleSubmit}
      >
        <h2 className="text-4xl font-medium">회원가입</h2>
        <div>Avatar</div>
        <InputBox
          type="text"
          id="loginId"
          name="loginId"
          value={loginId}
          placeholder="아이디*"
          required
          onChange={(e) => setLoginId(e.target.value)}
        />
        <InputBox
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호*"
          value={password}
          required
          onChange={handlePasswordChange}
          validate={validatePassword}
        />
        <InputBox
          type="email"
          id="email"
          name="email"
          value={email}
          placeholder="이메일*"
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputBox
          type="text"
          id="nickname"
          name="nickname"
          value={nickname}
          placeholder="닉네임*"
          onChange={(e) => setNickname(e.target.value)}
        />
        <InputBox
          type="text"
          id="name"
          name="name"
          value={name}
          placeholder="이름*"
          onChange={(e) => setName(e.target.value)}
        />
        <InputBox
          type="date"
          id="birthDate"
          name="birthDate"
          placeholder="생년월일 YYYY/MM/DD*"
          value={birthDate}
          required
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <InputBox
          type="tel"
          id="phone"
          name="phone"
          placeholder="전화번호*"
          value={phone}
          maxLength={13}
          required
          onChange={handlePhoneChange} //input에서 뭐가 바뀔때마다 함수 실행
        />
        <p className="mt-[10px] mb-[40px] text-right text-[#999] text-sm">
          필수 *
        </p>
        <ButtonBig name="회원가입" arialabel="sign up" type="submit" />
        <p className="mt-[80px] font-medium">다른 방법으로 회원가입하기</p>
        <ButtonBig
          provider="kakao"
          name="카카오로 계정으로 계속하기"
          arialabel="카카오로 계정으로 계속하기"
        />
        <ButtonBig
          provider="google"
          name="구글 계정으로 계속하기"
          arialabel="구글 계정으로 계속하기"
        />
      </form>
    </div>
  );
};
export default SignupForm;
