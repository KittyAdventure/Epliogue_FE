import { Link } from 'react-router-dom';
import logo from '../../assets/images/logobw.png';
import { ftrDatas } from '../../data/ftrDatas';
import { snsDatas } from '../../data/snsDatas';

const Footer = (): React.JSX.Element => {
  return (
      <footer className="footer flex bg-[#333] text-neutral-content items-center h-[250px]">
        <div className="flex justify-between w-full max-w-[1440px] mx-auto my-0">
          <div className="ftr-left flex">
            <div>
              <img
                src={logo}
                alt="에필로그 로고"
                className="ftr-logo mr-[20px] h-[120px]"
              />
            </div>
            <div className="flex flex-col justify-between text-white">
              <ul className="ftr-info flex gap-x-5">
                {ftrDatas.map((ftrData, idx) => (
                  <li key={idx}>
                    <Link to={ftrData.path} className="bg-primary">
                      {ftrData.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="ftr-contact flex">
                <li>(주)에필로그&nbsp;&nbsp;|&nbsp;&nbsp;냥냥모험단</li>
                <li>문의) zerobase@gmail.com</li>
              </ul>
              <p className="copyright btn-neutral">
                Copyright {new Date().getFullYear()} © All Rights Reserved
              </p>
            </div>
          </div>
          <div className="ftr-right flex flex-col flex-wrap justify-center">
            <nav className="text-white">
              {snsDatas.map((snsData, idx) => (
                <Link key={idx} to={snsData.path}>
                  <i className={snsData.icon}></i>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>
  );
};
export default Footer;
