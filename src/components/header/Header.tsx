import Logo from './Logo';
import Menu from './Menu';
import Nav from './Nav';

interface HeaderProps {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({loggedIn, setLoggedIn }) => {
  return (
    <header className="header shadow-[0px_0px_5px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between my-0 mx-[auto] max-w-[1440px]">
        <Nav/>
        <Logo />
        <Menu loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      </div>
    </header>
  );
};
export default Header;
