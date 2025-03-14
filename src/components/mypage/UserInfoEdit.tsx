// 정보수정 모달
import ButtonBig from '../login/ButtonBig';
import InputBox from '../login/InputBox';

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
}

// 임시 user의 정보
const loginId = "webdev247"
const nickname = 'bookworm';
const name = '홍길동';
const email = 'webdev247@zerobase.com';

const UserInfoEdit: React.FC<ModalProps> = ({ showModal, onClose }) => {
  if (!showModal) return null;
  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 bg-black/[0.7] w-full h-full z-[9999]">
      <form
        onSubmit={handleEdit}
        className="relative bg-white w-1/2 mx-[auto] text-center p-[120px]"
      >
        <button
          className="absolute top-5 right-10 text-[#000] text-3xl"
          onClick={onClose}
        >
          <i className="fas fa-times"></i>
        </button>
        <h2 className="text-4xl font-medium">회원정보 수정</h2>
        <InputBox
          type="text"
          id="loginId"
          name="name"
          placeholder={loginId}
          disabled={true}
        />
        <InputBox
          type="email"
          id="email"
          name="email"
          placeholder={email}
          disabled={true}
        />
        <InputBox type="text" id="name" name="name" placeholder={name} />
        <InputBox
          type="text"
          id="nickname"
          name="nickname"
          placeholder={nickname}
        />
        <InputBox
          type="password"
          id="password"
          name="password"
          placeholder="새 비밀번호"
        />
        <InputBox
          type="password"
          id="password"
          name="password"
          placeholder="새 비밀번호 확인"
        />
        <ButtonBig name="수정하기" arialabel="edit info" />
      </form>
    </div>
  );
};
export default UserInfoEdit;
