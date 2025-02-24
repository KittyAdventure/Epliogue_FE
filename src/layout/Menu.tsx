import { Link } from 'react-router-dom';

// Part of Header
const Menu = (): React.JSX.Element => {
  return (
    <ul className="hdr-menu">
      <li>
        <Link to={'/search'}>SearchIcon</Link>
      </li>
      <li>
        <Link to={'/login'}>LoginIcon</Link>
      </li>
    </ul>
  );
};
export default Menu;
