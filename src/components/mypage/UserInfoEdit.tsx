// 정보수정 모달
import axios from 'axios';
import { useState } from 'react';
import ButtonBig from '../login/ButtonBig';
import InputBox from '../login/InputBox';

interface ModalProps {
  nickName: string;
  email: string;
  phone?: string;
  profileUrl?: Blob | File;
  openModal: boolean;
  onClose: () => void;
}
const UserInfoEdit: React.FC<ModalProps> = ({
  openModal,
  onClose,
  nickName,
  email,
  profileUrl,
  phone,
}) => {
  const [formData, setFormData] = useState<ModalProps>({
    nickName: nickName || '',
    email: email || '',
    phone: phone || '',
    profileUrl: profileUrl || undefined,
    openModal,
    onClose,
  });
  if (!openModal) return null;
  const createBlobWithJsonAndImage = async (
    nickName: string,
    email: string,
    phone?: string,
    profileUrl?: Blob | File, //accept file or blob
  ) => {
    const jsonData = {
      nickName,
      email,
      phone,
    };
    const jsonBlob = new Blob([JSON.stringify(jsonData)], {
      type: 'application/json',
    });
    const formData = new FormData(); //axios req body
    formData.append('data', jsonBlob);
    if (profileUrl) {
      // appended to formData as ' "profileUrl" '
      formData.append('profileImage', profileUrl); //profileUrl holds image, "profile_image" is field name
    }else {
      console.error("profileUrl is not a valid Blob/File")
    }
    for( const pair of formData.entries()){
      console.log(`Key: ${pair[0]}, Value: `, pair[1])
    }
    return formData;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력한 번호를 가지고 온다. 그 뒤로 무슨 일이 이러나느지 모름
    let input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (input.length > 3 && input.length <= 7) {
      input = input.replace(/(\d{3})(\d+)/, '$1-$2'); // Add hyphen after first 3 digits
    } else if (input.length > 7) {
      input = input.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3'); // Add hyphens at correct positions
    }
    setFormData((prev) => ({ ...prev, phone: input.slice(0, 13) }));
  };
  // ensures profileUrl holds image file, not a url or string
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]; //file object
      // const blob = new Blob([file], { type: file.type }); // Convert to Blob if necessary
      setFormData((prev) => ({ ...prev, profileUrl: file })); // Store Blob in formData
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Submitted');
    try {
      const formDataToSend = await createBlobWithJsonAndImage(
        formData.nickName,
        formData.email,
        formData.phone,
        formData.profileUrl,
      );
      for (const pair of formDataToSend.entries()){
        console.log(pair[0], pair[1])
      }
      const accessToken = localStorage.getItem('accesstoken');
      const apiUrl =
        import.meta.env.NODE === 'production'
          ? import.meta.env.VITE_API_URL_PROD
          : import.meta.env.VITE_API_URL_DEV;
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
      console.log('UserEdit Response');
      console.log(response);
      onClose();
    } catch (error) {
      console.error('Simple UserEdit Error', error);
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
          onClick={onClose}
        >
          <i className="fas fa-times"></i>
        </button>
        <h2 className="text-4xl font-medium">회원정보 수정</h2>
        <InputBox type="file" accept="image/*" onChange={handleFileChange} />
        <InputBox
          type="text"
          id="nickname"
          name="nickName"
          value={formData?.nickName || ''}
          placeholder={`현재 닉네임: ${nickName}`}
          onChange={handleInputChange}
        />
        <InputBox
          type="email"
          id="email"
          name="email"
          value={formData?.email || ''}
          placeholder={`현재 이메일: ${email}`}
          onChange={handleInputChange}
        />
        <InputBox
          type="tel"
          id="phone"
          name="phone"
          value={formData?.phone || ''}
          placeholder={`현재 번호: ${phone}`}
          onChange={handlePhoneChange}
        />

        <ButtonBig name="수정하기" arialabel="edit info" />
        <ButtonBig name="취소하기" arialabel="cancel edit info" />
      </form>
    </div>
  );
};
export default UserInfoEdit;
