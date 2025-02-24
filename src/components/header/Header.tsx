import Logo from './Logo';
import Menu from './Menu';
import Nav from './Nav';

// Header contains Nav, Logo, Menu
const Header = (): React.JSX.Element => {
  return (
    <header className="header">
      <div className="hdr-wrap">
        <Nav />
        <Logo />
        <Menu />
      </div>
    </header>
  );
};
export default Header;
