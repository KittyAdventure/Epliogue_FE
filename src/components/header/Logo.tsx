import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

// Part of Header
const Logo = (): React.JSX.Element => {
  return (
    <h1 className="logo">
      <Link to="/" className=''>
        <img src={logo} alt="에필로그 로고" className="h-[80px] max-w-[100%]" />
      </Link>
    </h1>
  );
};
export default Logo;
