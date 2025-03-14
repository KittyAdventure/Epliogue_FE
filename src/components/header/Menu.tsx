import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

interface MenuProps {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<MenuProps> = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // 🔹 모달 상태 추가

  const handleMenuClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    menuData: MenuItem,
  ): void => {
    event.preventDefault();
    if (menuData.name === 'mypage') {
      if (loggedIn) {
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

  const handleLogout = (): void => {
    setLoggedIn(false);
    navigate('/');
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
