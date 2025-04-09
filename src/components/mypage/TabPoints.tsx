/**
 * 마이페이지 용 컴포넌트
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PointsMyItems from './PointsMyItems';
import PointsShop from './PointsShop';

interface Button {
  name: string;
  path: string;
}
const buttons: Button[] = [
  { name: '포인트 충전', path: '/payment' },
  { name: '환불하기', path: './' },
];
const tabData = [
  { name: '내 아이템', key: 'myitems' },
  { name: '상점', key: 'shop' },
];

const TabPoints = (): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>('myitems');

  const handleTabClick = (tabKey: string) => {
    setActiveTab(tabKey); //set active tab
  };
  const handleWindow = () => {
    window.scrollTo(0, 0);
  };

  const tabComponents: Record<string, React.JSX.Element> = {
    myitems: <PointsMyItems />,
    shop: <PointsShop />,
  };

  return (
    <div className="mt-20">
      <h3 className="text-2xl font-semibold">
        내 프로필/리뷰를 한번 꾸며보세요
      </h3>
      <div className="btnWrap flex items-center gap-x-10 mt-10">
        {buttons.map((button, idx) => (
          <Link
            key={idx}
            to={button.path}
            className="btn block border w-[240px] h-[60px] text-center leading-[60px] rounded-xl"
            onClick={handleWindow}
          >
            {button.name}
          </Link>
        ))}
      </div>
      <div className="w-full mt-20">
        <h3 className="font-bold text-xl">상점</h3>
        <div className="pointTabs flex mt-5">
          {tabData.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`py-2 w-[220px] h-[60px] border ${
                activeTab === tab.key
                  ? 'font-bold border-black'
                  : 'font-light'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
        {tabComponents[activeTab]}
      </div>
    </div>
  );
};
export default TabPoints;
