import {useNavigate} from "react-router-dom"
interface MenuItem {
  name: string;
  path: string;
  icon: string;
}
const menuDatas: MenuItem[] = [
  { name: 'mypage', path: "/mypage", icon: 'fas fa-user' },
  { name: 'search', path: '/', icon: 'fas fa-search' },
];

interface MenuProps {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
const Menu: React.FC<MenuProps> = ({ loggedIn, setLoggedIn }): React.JSX.Element => {
  const navigate = useNavigate();

  const handleMenuClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,menuData: MenuItem): void => {
    event.preventDefault()
    if(menuData.name === "mypage"){
      // 로그인 되있다->mypage 안되있다->login
      if (loggedIn){
        navigate("/mypage")
      }else {
        navigate("/login")
      }
    }else {
      navigate(menuData.path)
    }
  };
  const handleLogout = (): void => {
    setLoggedIn(false); // Update the loggedIn state to false
    navigate('/'); // Navigate to the main page or login page after logout
  };
  return (
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
      {/* 로그인 true -> 로그아웃 버튼 생성 */}
      {loggedIn && (
        <li className="text-sm leading-[80px] ml-[20px]">
          <button title="Logout" className="hover:underline" onClick={handleLogout}>
            로그아웃
          </button>
        </li>
      )}
    </ul>
  );
};
export default Menu;
