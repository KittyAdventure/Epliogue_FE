import ButtonBig from './ButtonBig';
import InputBox from './InputBox';

// 회원가입 클릭 -> 이 페이지로 온다
const SignupForm = (): React.JSX.Element => {
  return (
    <div id="signup">
      <form action="" id="signupWrap">
        <h2>회원가입</h2>
        <div>Avatar</div>
        <InputBox
          type="text"
          id="username"
          name="username"
          placeholder="아이디*"
        />
        <InputBox
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호*"
        />
        <InputBox type="text" id="name" name="name" placeholder="이름*" />
        <InputBox
          type="date"
          id="birthdate"
          name="birthdate"
          placeholder="생년월일*"
        />
        <InputBox type="tel" id="phone" name="phone" placeholder="전화번호*" />
        <p>필수 *</p>
        <ButtonBig name="회원가입" arialabel="sign up" />
        <p>다른 방법으로 회원가입하기</p>
        <ButtonBig name="카카오로 회원가입" arialabel="카카오로 회원가입" />
        <ButtonBig name="구글로 회원가입" arialabel="카카오로 회원가입" />
      </form>
    </div>
  );
};
export default SignupForm;
