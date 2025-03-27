import axios from 'axios';
import { useState } from 'react';
import ButtonBig from '../login/ButtonBig';
import InputBox from '../login/InputBox';

interface ModalProps {
  nickName: string;
  email: string;
  phone: string;
  openModal: boolean;
  onClose: () => void;
}

const UserInfoEdit: React.FC<ModalProps> = ({
  openModal,
  onClose,
  nickName = '',
  email = '',
  phone = '',
}) => {
  const [formData, setFormData] = useState({
    nickName: nickName || '',
    email: email || '',
    phone: phone || '',
  });

  const [image, setImage] = useState<File | null>(null); // Change type to File | null

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]); // Store the selected file
    }
  }

  if (!openModal) return null;

  // Handles input changes for text fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handles phone number input and formats it
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters

    if (input.length > 10) {
      input = input.slice(0, 11); // Restrict to max 11 digits (for 000-0000-0000 format)
    }

    if (input.length > 3 && input.length <= 7) {
      input = input.replace(/(\d{3})(\d+)/, '$1-$2');
    } else if (input.length > 7) {
      input = input.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
    }

    setFormData((prev) => ({ ...prev, phone: input }));
  };

  // Prepares and sends form data
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accesstoken');
      const apiUrl =
        import.meta.env.NODE_ENV === 'production'
          ? import.meta.env.VITE_API_URL_PROD
          : import.meta.env.VITE_API_URL_DEV;

      const formDataToSend = new FormData();

      // Append each field separately (not as a JSON blob)
      formDataToSend.append('nickname', formData.nickName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);

      // Append profile image if available
      if (image) {
        formDataToSend.append('profileImage', image);
      }

      // Debugging: Log FormData entries
      console.log('FormData content:', [...formDataToSend.entries()]);

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

      console.log('UserEdit Response:', response);
      onClose();
    } catch (error) {
      console.error('UserEdit Error', error);
    }
  };


  return (
    <div className="flex justify-center items-center fixed top-0 left-0 bg-black/[0.7] w-full h-full z-[9999]">
      <form onSubmit={handleEdit} className="relative bg-white w-1/2 mx-[auto] text-center p-[120px]">
        <button
          type="button"
          className="absolute top-5 right-10 text-[#000] text-3xl"
          onClick={onClose}
        >
          <i className="fas fa-times"></i>
        </button>
        <h2 className="text-4xl font-medium">회원정보 수정</h2>
        {/* File Upload */}
        <InputBox
          type="file"
          accept="image/*"
          name="profileImage"
          onChange={handleImage}
        />
        {/* Nickname Input */}
        <InputBox
          type="text"
          id="nickname"
          name="nickName"
          placeholder={`현재 닉네임: ${nickName}`}
          onChange={handleInputChange}
        />

        {/* Email Input */}
        <InputBox
          type="email"
          id="email"
          name="email"
          placeholder={`현재 이메일: ${email}`}
          onChange={handleInputChange}
        />

        {/* Phone Input */}
        <InputBox
          type="tel"
          id="phone"
          name="phone"
          placeholder={`현재 번호: ${phone || '등록없음'}`}
          onChange={handlePhoneChange}
        />

        <ButtonBig
          name="수정하기"
          arialabel="edit info"
          type="submit"
        />
        <ButtonBig
          name="취소하기"
          arialabel="cancel edit info"
          onClick={onClose}
        />
      </form>
    </div>
  );
};

export default UserInfoEdit;
