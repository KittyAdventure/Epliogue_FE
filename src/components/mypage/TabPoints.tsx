/**
 * 마이페이지 용 컴포넌트
 */
import { Link } from 'react-router-dom';

interface Button {
  name: string;
  path: string;
}
const buttons: Button[] = [
  { name: '포인트 충전', path: '/recharge' },
  { name: '환불하기', path: './' },
];
const TabPoints = (): React.JSX.Element => {
  return (
    <div className="mt-20">
      <h3 className="text-2xl">내 프로필/리뷰를 한번 꾸며보세요</h3>
      <div className="btnWrap flex items-center gap-x-10 mt-10">
        {buttons.map((button, idx) => (
          <Link key={idx} to={button.path} className='btn block border w-[240px] h-[60px] text-center leading-[60px] rounded-xl'>
            {button.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default TabPoints;
