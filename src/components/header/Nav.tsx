import { Link } from 'react-router-dom';

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
  return (
    <nav className="gnb w-40">
      <ul className="flex">
        {navDatas.map((navData, idx) => (
          <li key={idx} className="mr-[20px] leading-[80px]">
            <Link to={navData.path}>{navData.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
