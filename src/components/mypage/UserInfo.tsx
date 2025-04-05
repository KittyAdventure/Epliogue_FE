import { useState } from 'react';
import DeleteUser from './DeleteUser';
import UserInfoEdit from './UserInfoEdit';

interface AboutUsers {
  nickName: string;
  loginId: string;
  email: string;
  follower: string;
  following: string;
  phone: string; //추가안됐음
  profileUrl: string;
}
// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// Component -Turn it into component, that accepts profileUrl props
const Avatar: React.FC<{ profileUrl?: string }> = ({ profileUrl }) => {
  const defaultAvatar = '../../../img/members/user.png';
  return (
    <div
      className={`my-0 mx-[auto] w-40 h-40 rounded-full flex items-center justify-center ${
        profileUrl ? '' : 'border border-gray-300'
      }`}
    >
      <img
        src={profileUrl || defaultAvatar}
        alt="user avatar"
        className="w-full h-full rounded-full bg-center"
      />
    </div>
  );
};

// Component -Modal close by clicking outside/ pressing esc==================================
// const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         onClose();
//       }
//     };
//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [onClose]);
//   const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
//     if ((event.target as HTMLElement).id === 'modal-overlay') {
//       onClose();
//     }
//   };
//   if (!isOpen) return null
// };

// access properties with props.nickName...etc

const UserInfo: React.FC<AboutUsers> = (props): React.JSX.Element => {
  // Remove Repetitive handlers,states
  // const [modalOpen, setModalOpen] = useState(false);
  // const [deleteModal, setDeleteModal] = useState(false);
  // const handleEditModal = () => setModalOpen(true);
  // const handleCloseModal = () => setModalOpen(false);
  // const handleDeleteModal = () => setDeleteModal(true);
  // const handleDeleteClose = () => setDeleteModal(false);

  const [modals, setModals] = useState({ edit: false, delete: false }); //모달 2가지 만듬
  const toggleModal = (
    key: 'edit' | 'delete',
    open: boolean, //toggleModal에 키값이랑 true/false
  ) => setModals((prev) => ({ ...prev, [key]: open }));

  return (
    <div>
      <Avatar profileUrl={props.profileUrl} />
      <div className="user-info mt-5">
        <h4 className="text-xl font-medium">{props.nickName}</h4>
        <p className="text-[#333]">{props.loginId}</p>
        <p className="text-[#333]">{props.email}</p>
        <div>
          <button
            className="block text-[#333] m-auto hover:underline"
            onClick={() => toggleModal('edit', true)}
          >
            내 정보 수정 <i className="far fa-edit text-[#777]"></i>
          </button>
          {modals.edit && (
            <UserInfoEdit
              onClose={() => toggleModal('edit', false)}
              nickName={props.nickName}
              email={props.email}
              phone={props.phone || "010-1234-1234"} //임시번호
            ></UserInfoEdit>
          )}
          <button
            className="text-center hover:underline"
            onClick={() => toggleModal('delete', true)}
          >
            탈퇴하기
          </button>
          {modals.delete && (
            <DeleteUser onClose={() => toggleModal('delete', false)} />
          )}
        </div>
        <div className="follow-info flex justify-center items-center mt-3">
          <button className="mr-3 hover:underline">
            Followers: {props.follower}
          </button>
          <span> | </span>
          <button className="ml-3 hover:underline">
            Following: {props.following}
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
