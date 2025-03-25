import { useState } from 'react';
import UserInfoEdit from './UserInfoEdit';
// import AvatarUploader from "./AvatarUploader.tsx"

interface AboutUsers {
  nickName: string;
  loginId: string;
  email: string;
  follower: string;
  following: string;
  phone: string;
  profileUrl: string;
}

const UserInfo: React.FC<AboutUsers> = ({
  nickName,
  loginId,
  email,
  follower,
  following,
  phone,
  profileUrl,
}): React.JSX.Element => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleUserEdit = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div>
      <div className="my-0 mx-[auto] w-40 h-40 border border-gray-500 rounded-full flex items-center justify-center">
        {/* <AvatarUploader /> */}
        <img src={profileUrl} alt="user avatar" className="" />
      </div>
      <div className="user-info mt-5">
        <h4 className="text-xl font-medium">{nickName}</h4>
        <p className="text-[#333]">{loginId}</p>
        <p className="text-[#333]">{email}</p>
        <div>
          <button
            className="block text-[#333] m-auto hover:underline"
            onClick={handleUserEdit}
          >
            내 정보 수정 <i className="far fa-edit text-[#777]"></i>
          </button>
          {modalOpen && (
            <UserInfoEdit
              openModal
              onClose={handleCloseModal}
              nickName={nickName}
              email={email}
              phone={phone}
              profileUrl={profileUrl}
            ></UserInfoEdit>
          )}
          <button
            className="text-center hover:underline"
            // onClick={openDeleteUserModal}
          >
            탈퇴하기
          </button>
          <div>
            <p>정말 탈퇴하시겠습니까?</p>
            <button>확인</button>
            <button>취소</button>
          </div>
        </div>
        <div className="follow-info flex justify-center items-center mt-3">
          <button className="mr-3 hover:underline">
            Followers: {follower}
          </button>
          <span> | </span>
          <button className="ml-3 hover:underline">
            Following: {following}
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
