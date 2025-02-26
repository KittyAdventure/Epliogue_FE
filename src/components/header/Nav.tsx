import { Link } from 'react-router-dom';

// data/navDatas.ts 지우고 코드여기 복붙 (최적화)
interface NavItem {
  name: string;
  path: string;
}
const navDatas: NavItem[] = [
  { name: '소개', path: '/' },
  { name: '책', path: '/' },
  { name: '모임', path: '/' },
];

const Nav = (): React.JSX.Element => {
  return (
    <nav className="gnb">
      <ul className='flex'>
        {navDatas.map((navData, idx) => (
          <li key={idx} className='mr-[20px] leading-[80px]'>
            <Link to={navData.path}>{navData.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Nav;
