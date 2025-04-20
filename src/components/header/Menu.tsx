import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utility/useAuth';
import SearchModal from '../modal/SearchModal';

interface MenuItem {
  name: string;
  path: string;
  icon: string;
}

const menuDatas: MenuItem[] = [
  { name: 'mypage', path: '/mypage', icon: 'fas fa-user' },
  { name: 'search', path: '/', icon: 'fas fa-search' },
];
// ContextAPI 를 활용함으로써 아래에 하드코딩한 props 더이상 필요없다
// interface MenuProps {
//   loggedIn: boolean;
//   setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
// }

const Menu = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useAuth();
  // const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false) //Logout Feedback spinner,msg, 시간 되면 추가
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // 🔹 모달 상태 추가

  const handleMenuClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    menuData: MenuItem,
  ): void => {
    event.preventDefault();
    if (menuData.name === 'mypage') {
      //contextapi 값 적용
      if (loggedIn) {
        //private route으로 전달
        navigate('/mypage');
      } else {
        navigate('/login');
      }
    } else if (menuData.name === 'search') {
      setIsSearchModalOpen(true); // 🔹 모달 열기
    } else {
      navigate(menuData.path);
    }
  };

  // HandleLogout cannot process sometimes due to unknown error

  // const handleLogout = async (): Promise<void> => {
  //   try {
  //     const accessToken = localStorage.getItem('accesstoken');
  //     const response = await axios.post(
  //       `${apiUrl}/api/members/logout`,
  //       {},
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       },
  //     );
  //     console.log('Logout Response', response);
  //     if (response.status === 200) {
  //       console.log(response.data.message); //logout success
  //       setLoggedIn(false);
  //       localStorage.removeItem('memberId');
  //       localStorage.removeItem('accesstoken');
  //       alert('정상적으로 로그아웃 했습니다');
  //       navigate('/');
  //       if (window.Kakao && window.Kakao.Auth) {
  //         window.Kakao.Auth.logout(function () {
  //           console.log('Kakao logout successful');
  //           // 카카오 서비스도 로그아웃 해주기, redirecturi context사용 추천
  //           window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=8a1d4afe50a1c66832ca09bd0eec1c4d&logout_redirect_uri=http://localhost:5173/login`;
  //         });
  //       }
  //     } else {
  //       console.error('Logout failed: ', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Logout Error', error);
  //   }
  // };

  // handleLogout without requesting
  // 로그아웃 후 사이트가 로딩 안될 시 -> 아래 window.location.href redirect-uri 변경
  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('memberId');
    localStorage.removeItem('accesstoken');
    alert('정상적으로 로그아웃 했습니다');
    setTimeout(() => {
      navigate('/');
    }, 100);
    if (window.Kakao && window.Kakao.Auth) {
      window.Kakao.Auth.logout(function () {
        console.log('Kakao logout successful');
        // 카카오 서비스도 로그아웃 해주기, redirecturi context사용 추천
        window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=8a1d4afe50a1c66832ca09bd0eec1c4d&logout_redirect_uri=https://test-epilogue.vercel.app/`;
      });
    }
  };

  return (
    <>
      <ul className="flex flex-row-reverse w-40">
        {menuDatas.map((menuData, idx) => (
          <li key={idx} className="leading-[80px] ml-[20px]">
            <a
              href={menuData.path}
              title={menuData.name}
              onClick={(event) => handleMenuClick(event, menuData)}
            >
              <i className={menuData.icon} style={{ fontSize: '20px' }}></i>
            </a>
          </li>
        ))}
        {loggedIn && (
          <li className="text-sm leading-[80px] ml-[20px]">
            <button
              title="Logout"
              className="hover:underline"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </li>
        )}
      </ul>

      {/* 🔹 SearchModal을 isOpen 상태에 따라 렌더링 */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
};

export default Menu;
