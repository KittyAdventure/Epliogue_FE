import axios from 'axios';
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
// ContextAPI 를 활용함으로써 하드코딩한 props 더이상 필요없다
// interface MenuProps {
//   loggedIn: boolean;
//   setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
// }

const Menu = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useAuth();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // 🔹 모달 상태 추가

  const handleMenuClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    menuData: MenuItem,
  ): void => {
    event.preventDefault();
    if (menuData.name === 'mypage') {
      //contextapi 값 적용
      if (loggedIn) { //private route으로 전달
        navigate("/mypage");
      }else {
        navigate("/members/login")
      }
    } else if (menuData.name === 'search') {
      setIsSearchModalOpen(true); // 🔹 모달 열기
    } else {
      navigate(menuData.path);
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL_PROD;
      const response = await axios.post(`${apiUrl}/logout`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log("Logout Response")
      console.log(response)
      if (response.status === 200) {
        console.log(response.data.message);
        console.log('Logout successful on click');
        setLoggedIn(false);
        localStorage.removeItem('token');
        navigate('/');
      } else {
        console.error('logout failed: ', response.statusText);
      }
    } catch (error) {
      console.error('Logout Error', error);
    }
  };
  // const handleLogout = () => {
  //   setLoggedIn(false);
  //   localStorage.removeItem('token');
  //   navigate('/');
  // }

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
