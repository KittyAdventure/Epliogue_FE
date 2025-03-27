import axios from 'axios';
interface DeleteProps {
  openModal: boolean;
  onClose: () => void;
}
// user 삭제 /회원탈퇴
// 백엔드에서 정보와 코드가 썪여서 처리하는게 까다롭다고 한다
// 해서 실제로는 연결하지 않음
const handleUserDelete = async () => {
  const accessToken = localStorage.getItem('accesstoken');
  if (!accessToken){
    console.error("Access Token N/A")
    return
  }
  try {
    const apiUrl =
      import.meta.env.NODE === 'production'
        ? import.meta.env.VITE_API_URL_PROD
        : import.meta.env.VITE_API_URL_DEV;
    const response = await axios.delete(`${apiUrl}/api/members`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 200) {
      console.log(response);
      alert(response.data.message)
    } 
  } catch (error) {
    console.error('UserDelete Error', error);
  }
};
const DeleteUser: React.FC<DeleteProps> = ({ onClose, openModal = true }) => {
  console.log(openModal);
  return (
    <div className="deleteUserModalflex justify-center items-center fixed top-0 left-0 bg-black/[0.7] w-full h-full z-[9999]">
      <div className="deleteUserModalWrap relative text-center w-1/3 mx-[auto] text-center py-[120px] bg-white rounded-xl top-[50%] translate-y-[-50%]">
        <button
          className="absolute top-5 right-10 text-[#000] text-3xl"
          onClick={onClose}
        >
          <i className="fas fa-times"></i>
        </button>
        <h3 className="text-xl font-bold">정말 탈퇴하시겠습니까?</h3>
        <p>모든 기록이 영구적으로 삭제됩니다</p>
        <div className="btnWrap m-auto pt-5 flex w-[50%]">
          <button
            onClick={handleUserDelete}
            className="block w-[200px] h-[40px] leading-5 mx-auto border rounded-xl text-[#f00]"
          >
            탈퇴
          </button>
          <button
            onClick={onClose}
            className="block w-[200px] h-[40px] leading-5 mx-auto border rounded-xl"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteUser;
