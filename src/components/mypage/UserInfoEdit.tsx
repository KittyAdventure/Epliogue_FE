// 정보수정 모달
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// import {useState} from "react"
import ButtonBig from '../login/ButtonBig';
import InputBox from '../login/InputBox';

interface ModalProps {
  nickName:string;
  email:string;
  phone?:string;
  profileUrl?:string;
  showModal: boolean;
  onClose: () => void;
}


const UserInfoEdit: React.FC<ModalProps> = ({ showModal, onClose,nickName, email, profileUrl, phone }) => {
  if (!showModal) return null;
  // const navigate = useNavigate()
  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  console.log(profileUrl)
  console.log(phone)
    
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
          type="email"
          id="email"
          name="email"
          placeholder={`현재 이메일: ${email}`}
        />
        <InputBox
          type="text"
          id="nickname"
          name="nickname"
          placeholder={`현재 닉네임: ${nickName}`}
        />
        {/* <InputBox 
        type='file'
        accept="image/*"
        className='hidden'
        onChange={handleImageUpload}
        /> */}
        
        <ButtonBig name="수정하기" arialabel="edit info" />
      </form>
    </div>
  );
};
export default UserInfoEdit;
