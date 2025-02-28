import {Link} from "react-router-dom"

// data/menuDatas.ts 지우고 코드여기 복붙 (최적화)
interface MenuItem {
  name: string;
  path: string;
  icon: string;
}

const menuDatas: MenuItem[] = [
  { name: 'mypage', path: '/login', icon: 'fas fa-user' },
  { name: 'search', path: '/', icon: 'fas fa-search' },
];

const Menu = (): React.JSX.Element => {
  return (
    <ul className="flex flex-row-reverse w-40">
      {menuDatas.map((menuData, idx) => (
        <li key={idx} className="leading-[80px] ml-[20px]">
          <Link to={menuData.path} title={menuData.name}>
            <i className={menuData.icon} style={{ fontSize: '20px' }}></i>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default Menu;
