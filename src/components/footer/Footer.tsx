import logo from '../../assets/images/logo.png';

// Footer contains: Logo, SnS
const Footer = (): React.JSX.Element => {
  return (
    <footer className="footer">
      <div className="ftr-wrap">
        <div className="ftr-left">
          <img src={logo} alt="에필로그 로고" className="ftr-logo" />
          <ul className="ftr-info">
            <li>
              <a>이용약관</a>
            </li>
            <li>
              <a>개인정보처리방침</a>
            </li>
            <li>
              <a>저작권정책</a>
            </li>
          </ul>
          <ul className="ftr-contact">
            <li>(주)에필로그 | 냥냥모험단</li>
            <li>문의) zerobase@gmail.com</li>
          </ul>
          <p className="copyright">Copyright ⓒ All Rights Reserved</p>
        </div>
        <div className="ftr-right">
          <ul className="ftr-sns">
            <li>
              <a>GitHub</a>
            </li>
            <li>
              <a>Facebook</a>
            </li>
            <li>
              <a>Instagram</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
