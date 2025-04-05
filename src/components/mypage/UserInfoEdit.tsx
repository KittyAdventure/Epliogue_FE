// 정보수정 모달
import axios from 'axios';
import { useState } from 'react';
import { apiUrl } from '../../utility/AuthUtils';
import ButtonBig from '../login/ButtonBig';
import InputBox from '../login/InputBox';

interface ModalProps {
  nickName: string;
  email: string;
  phone: string;
  onClose: () => void;
}
// 무슨 일이 벌어나고 있나...
const createFormData = async (
  nickName: string,
  email: string,
  phone: string,
  profileImage?: File,
) => {
  const jsonBlob = new Blob([JSON.stringify({ nickName, email, phone })], {
    type: 'application/json',
  });
  const formData = new FormData();
  formData.append('data', jsonBlob);
  console.log('FormData', formData);
  if (profileImage) {
    formData.append('profileImage', profileImage); //append if it exists
    console.log('NewFormData', formData);
  }

  return formData;
};

const UserInfoEdit: React.FC<ModalProps> = ({
  onClose,
  nickName,
  email,
  phone,
}) => {
  // Call hooks first before any conditional returns
  const [userData, setUserData] = useState({ nickName, email, phone });
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력한 번호를 가지고 온다. 그 뒤로 무슨 일이 이러나느지 모름
    let input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (input.length > 3 && input.length <= 7) {
      input = input.replace(/(\d{3})(\d+)/, '$1-$2'); // Add hyphen after first 3 digits
    } else if (input.length > 7) {
      input = input.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3'); // Add hyphens at correct positions
    }
    setUserData((prev) => ({ ...prev, phone: input.slice(0, 13) }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(event.target.files[0]);
    }
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Submitted');
    try {
      const formDataToSend = await createFormData(
        userData.nickName,
        userData.email,
        userData.phone,
        profileImage ?? undefined, //nullish coalescing operator
      );
      const accessToken = localStorage.getItem('accesstoken');

      const response = await axios.put(
        `${apiUrl}/api/members`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log('UserEdit Response', response);
      onClose();
    } catch (error) {
      console.error('UserEdit Error', error);
    }
  };

  return (
    <div className="flex justify-center items-center fixed top-0 left-0 bg-black/[0.7] w-full h-full z-[9999]">
      <form
        onSubmit={handleEdit}
        className="relative bg-white w-1/2 mx-[auto] text-center p-[120px]"
      >
        <button
          className="absolute top-5 right-10 text-[#000] text-3xl"
          type="button"
          onClick={onClose}
        >
          <i className="fas fa-times"></i>
        </button>
        <h2 className="text-4xl font-medium">회원정보 수정</h2>
        <InputBox
          type="file"
          accept="image/*"
          name="profileImage"
          onChange={handleFileChange}
        />
        <InputBox
          type="text"
          name="nickName"
          value={userData.nickName}
          placeholder={`현재 닉네임: ${nickName}`}
          onChange={handleInputChange}
        />
        <InputBox
          type="email"
          name="email"
          value={userData.email}
          placeholder={`현재 이메일: ${email}`}
          onChange={handleInputChange}
        />
        <InputBox
          type="tel"
          name="phone"
          value={userData.phone ?? ''} //value 가 있어야 onChange 작동
          placeholder={`현재 번호: ${phone}`}
          onChange={handlePhoneChange}
        />

        <ButtonBig name="수정하기" arialabel="edit info" />
        <ButtonBig
          name="취소하기"
          type="button"
          arialabel="cancel edit info"
          onClick={onClose}
        />
      </form>
    </div>
  );
};
export default UserInfoEdit;
