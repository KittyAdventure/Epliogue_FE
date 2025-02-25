import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

// Part of Header
const Logo = (): React.JSX.Element => {
  return (
    <h1 className="logo flex justify-center items-center text-center">
      <Link to="/" className='flex items-center justify-center'>
        <img src={logo} alt="에필로그 로고" className="h-[80px]" />
      </Link>
    </h1>
  );
};
export default Logo;
