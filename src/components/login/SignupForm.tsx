import ButtonBig from './ButtonBig';
import InputBox from './InputBox';

// 회원가입 클릭 -> 이 페이지로 온다
const SignupForm = (): React.JSX.Element => {
  return (
    <div id="signupForm" className="p-[120px]">
      <form
        action=""
        id="signupWrap"
        className="max-w-[400px] mx-[auto] text-center"
      >
        <h2 className="text-4xl">회원가입</h2>
        <div>Avatar</div>
        <InputBox
          type="text"
          id="nickname"
          name="nickname"
          placeholder="아이디*"
        />
        <InputBox
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호*"
        />
        <InputBox type="email" id="email" name="email" placeholder="이메일*" />
        <InputBox type="text" id="name" name="name" placeholder="이름*" />
        <InputBox
          type="date"
          id="birthDate"
          name="birthDate"
          placeholder="생년월일*"
        />
        <InputBox type="tel" id="phone" name="phone" placeholder="전화번호*" />
        <p className="mt-[10px] mb-[40px] text-right">필수 *</p>
        <ButtonBig name="회원가입" arialabel="sign up" />
        <p className="mt-[80px] font-medium">다른 방법으로 회원가입하기</p>
        <ButtonBig
          provider="kakao"
          name="카카오로 가입하기"
          arialabel="카카오로 가입하기"
        />
        <ButtonBig
          provider="google"
          name="구글로 가입하기"
          arialabel="카카오로 가입하기"
        />
      </form>
    </div>
  );
};
export default SignupForm;
