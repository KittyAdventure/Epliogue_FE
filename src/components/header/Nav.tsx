import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  name: string;
  path: string;
}

const navDatas: NavItem[] = [
  { name: '소개', path: '/project' },
  { name: '책', path: '/book' },
  { name: '모임', path: '/gathering' },
];

const Nav = () => {
  const location = useLocation(); // 현재 경로 가져오기

  return (
    <nav className="gnb w-40">
      <ul className="flex">
        {navDatas.map((navData, idx) => {
          const isActive = location.pathname === navData.path; // 현재 경로와 비교
          return (
            <li
              key={idx}
              className={`mr-[20px] leading-[80px] ${
                isActive ? 'font-bold text-blue-500' : ''
              }`}
            >
              <Link to={navData.path}>{navData.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
