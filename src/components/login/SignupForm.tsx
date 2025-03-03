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
        <h2 className="text-4xl font-medium">회원가입</h2>
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
          placeholder="생년월일 YYYY/MM/DD*"
        />
        <InputBox type="tel" id="phone" name="phone" placeholder="전화번호*" />
        <p className="mt-[10px] mb-[40px] text-right text-[#999] text-sm">필수 *</p>
        <ButtonBig name="회원가입" arialabel="sign up" />
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
