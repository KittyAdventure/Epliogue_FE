import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../utility/AuthUtils';
import { useAuth } from '../../utility/useAuth';

interface DeleteProps {
  onClose: () => void;
}
// user 삭제 /회원탈퇴 -> 처리하기 복잡해서
//alert 와 로그아웃으로 대체

const DeleteUser: React.FC<DeleteProps> = ({ onClose}) => {
  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();
  const handleUserDelete = async (onClose: () => void) => {
    const accessToken = localStorage.getItem('accesstoken');
    if (!accessToken) {
      console.error('Access Token N/A');
      return;
    }
    try {
      const response = await axios.delete(`${apiUrl}/api/members`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        console.log(response);
        alert(response.data.message);
      }
    } catch (error) {
      console.error('DeleteUser Error1', error);
    }
    onClose();
    handleLogout();
  };

  // 탈퇴(데이터 삭제) 대신 로그아웃. 다시 로그인 할 수 있다
  // const handleLogout = async (): Promise<void> => {
  //   try {
  //     const apiUrl = import.meta.env.VITE_API_URL_PROD;
  //     const response = await axios.post(
  //       `${apiUrl}/api/members/logout`,
  //       {},
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
  //         },
  //       },
  //     );
  //     console.log('DeleteUser->Logout', response);
  //     if (response.status === 200) {
  //       setLoggedIn(false);
  //       localStorage.removeItem('memberId');
  //       localStorage.removeItem('accesstoken');
  //       alert('정상적으로 처리되었습니다.');
  //       // setTimeout 없이하면 메이페이지가 아닌 로그인페이지로 이동한다
  //       setTimeout(() => {
  //         navigate('/');
  //       }, 100);
  //     } else {
  //       console.error('Delete Failed: ', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Delete User Error', error);
  //   }
  // };

  // handleLogout without requesting
  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('memberId');
    localStorage.removeItem('accesstoken');
    alert('회원탈퇴를 성공적으로 했습니다');
    setTimeout(() => {
      navigate('/');
    }, 100);
    if (window.Kakao && window.Kakao.Auth) {
      window.Kakao.Auth.logout(function () {
        console.log('Kakao logout successful');
        // 카카오 서비스도 로그아웃 해주기, redirecturi context사용 추천
        window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=8a1d4afe50a1c66832ca09bd0eec1c4d&logout_redirect_uri=http://localhost:5173/login`;
      });
    }
  };

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
            onClick={() => handleUserDelete(onClose)}
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
