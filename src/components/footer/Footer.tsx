import { Link } from 'react-router-dom';
import logo from '../../assets/images/logobw.png';
import { ftrDatas } from '../../data/ftrDatas';
import { snsDatas } from '../../data/snsDatas';

const Footer = (): React.JSX.Element => {
  return (
    // 푸터는 좌측, 우측 영역으로 나누었다
    <footer className="footer flex bg-[#333] text-neutral-content items-center h-[250px]">
      <div className="flex justify-between w-full max-w-[1440px] mx-auto my-0">
        {/* 좌측 로고+text */}
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
                  <Link to={ftrData.path} className="bg-primary" title={ftrData.name}>
                    {ftrData.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="ftr-contact flex">
              <li className="mr-[20px]">
                (주)에필로그&nbsp;&nbsp;|&nbsp;&nbsp;냥냥모험단
              </li>
              <li>문의) zerobase@gmail.com</li>
            </ul>
            <p className="copyright btn-neutral">
              Copyright {new Date().getFullYear()} © All Rights Reserved
            </p>
          </div>
        </div>
        {/* 우측 SNS Icons - 전부 깃허브로 연결 */}
        <div className="ftr-right flex flex-col flex-wrap justify-center">
          <nav className="text-white flex justify-between">
            {snsDatas.map((snsData, idx) => (
              <Link key={idx} to={snsData.path} title={snsData.name} className="block ml-[20px]">
                <i className={snsData.icon} style={{ fontSize: '30px' }}></i>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
