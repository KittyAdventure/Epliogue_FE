import {useState} from "react"
import UserInfoEdit from "./UserInfoEdit"

interface AboutUsers {
  nickname:string;
  username: string;
  email: string;
  followers:number;
  following:number;
}

const UserInfo: React.FC<AboutUsers> = ({nickname,username,email,followers,following}): React.JSX.Element => {
  const [showModal, setShowModal] = useState (true);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <div>
      <div className="my-0 mx-[auto] w-40 h-40 border border-gray-500 rounded-full flex items-center justify-center">
        Avatar
      </div>
      <div className="user-info mt-5">
        <h4 className="text-xl font-medium">{nickname}</h4>
        <p className="text-[#333]">{username}</p>
        <p className="text-[#333]">{email}</p>
        <div>
          <button
            className="text-[#333] hover:underline"
            onClick={handleOpenModal}
          >
            내 정보 수정 <i className="far fa-edit text-[#777]"></i>
          </button>
          <UserInfoEdit
            showModal={showModal}
            onClose={handleCloseModal}
          ></UserInfoEdit>
        </div>
        <div className="follow-info flex justify-center items-center mt-3">
          <button className="mr-3 hover:underline">
            Followers: {followers}
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
