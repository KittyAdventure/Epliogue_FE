import {Link} from "react-router-dom"

// data/menuDatas.ts 지우고 코드여기 복붙 (최적화)
interface MenuItem {
  name: string;
  path: string;
  icon: string;
}

const menuDatas: MenuItem[] = [
  { name: '', path: '/', icon:"fas fa-search"},
  { name: '', path: '/', icon: "fas fa-user" },
];

const Menu = (): React.JSX.Element => {
  return (
    <ul className="flex">
      {menuDatas.map((menuData, idx) => (
        <li key={idx} className="leading-[80px] ml-[10px] w-[30px]">
          <Link to={menuData.path}>
            <i className={menuData.icon} style={{fontSize:"20px"}}></i>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default Menu;
