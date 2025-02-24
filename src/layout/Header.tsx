import Logo from "./Logo"
import Nav from "./Nav"
import Menu from "./Menu"

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
}
export default Header