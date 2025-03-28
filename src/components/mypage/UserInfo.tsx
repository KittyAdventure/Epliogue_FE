import { useState } from 'react';
import UserInfoEdit from './UserInfoEdit';
import DeleteUser from "./DeleteUser"

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
  const [deleteModal, setDeleteModal] = useState(false);
  const handleEditModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleDeleteModal = () => setDeleteModal(true);
  const handleDeleteClose = () => setDeleteModal(false);
  const defaultAvatar = "../../../img/members/user.png"
  return (
    <div>
      <div
        className={`my-0 mx-[auto] w-40 h-40 rounded-full flex items-center justify-center ${
          profileUrl ? '' : 'border border-gray-300'
        }`}
      >
        {profileUrl ? (
          <img
            src={profileUrl}
            alt="user avatar"
            className="w-full h-full rounded-full bg-center"
          />
        ) : (
          <img
            src={defaultAvatar}
            alt="user avatar"
            className="w-full h-full rounded-full bg-center"
          />
        )}
      </div>
      <div className="user-info mt-5">
        <h4 className="text-xl font-medium">{nickName}</h4>
        <p className="text-[#333]">{loginId}</p>
        <p className="text-[#333]">{email}</p>
        <div>
          <button
            className="block text-[#333] m-auto hover:underline"
            onClick={handleEditModal}
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
            ></UserInfoEdit>
          )}
          <button
            className="text-center hover:underline"
            onClick={handleDeleteModal}
          >
            탈퇴하기
          </button>
          {deleteModal && <DeleteUser openModal onClose={handleDeleteClose} />}
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
