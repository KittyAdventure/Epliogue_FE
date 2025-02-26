import Logo from './Logo';
import Menu from './Menu';
import Nav from './Nav';

// Header contains Nav, Logo, Menu
const Header = (): React.JSX.Element => {
  return (
    <header className="header relative shadow-[0px_0px_5px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between my-0 mx-[auto] max-w-[1440px]">
        <Nav />
        <Logo />
        <Menu />
      </div>
    </header>
  );
};
export default Header;
