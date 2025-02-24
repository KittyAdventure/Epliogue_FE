import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

// Part of Header
const Logo = (): React.JSX.Element => {
  return (
    <h1 className="logo">
      <Link to="/">
        <img src={logo} alt="에필로그 로고" className="hdr-logo" />
      </Link>
    </h1>
  );
};
export default Logo;
