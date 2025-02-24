import { Link } from 'react-router-dom';
import { navData } from '../../data/navData';

// Part of Header
const Nav = (): React.JSX.Element => {
  return (
    <nav className="gnb">
      <ul>
        {navData.map((nav, idx) => (
          <li key={idx}>
            <Link to={nav.path}>{nav.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Nav;
