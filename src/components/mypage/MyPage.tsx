import { useState } from 'react';

import UserInfo from './UserInfo';
import Calendar from './Calendar';
// Tabs
import TabReview from './TabReview';
import TabMeeting from './TabMeeting';
import TabCollection from './TabCollection';
import TabComment from './TabComment';
import TabPoints from './TabPoints';

interface Tab {
  id:string;
  name: string;
  value: number;
}
// Values must be called from User's Data
const tabs: Tab[] = [
  { id: "tab1", name: 'Review', value: 55 },
  { id: "tab2", name: 'Meeting', value: 5 },
  { id: "tab3", name: 'Collection', value: 11 },
  { id: "tab4", name: 'Comment', value: 13 },
  { id: "tab5", name: 'Points', value: 10000 },
];

// UserInfo 로 전달하는 임시 props
const nickname: string = 'helloworld';
const username: string = 'webdev247';
const email: string = 'webdev00@zerobase.com';
const followers: number = 13;
const following: number = 33;

// 마이페이지 클릭 -> 로그인 되어있음 -> 이 페이지로 온다
const MyPage = (): React.JSX.Element => {
  // default tab is Review
  const [activeTab, setActiveTab] = useState<string>('Comment');
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="mypage ">
      <h2 className="title my-0 mx-[auto] max-w-[1440px] py-20 text-4xl font-medium">
        {nickname} 님의 페이지
      </h2>
      <div className="contentWrap flex justify-between my-0 mx-[auto] max-w-[1440px]">
        <aside className="border border-red-500 text-center w-1/5">
          <UserInfo
            nickname={nickname}
            username={username}
            email={email}
            followers={followers}
            following={following}
          />
          <div className="calendar mt-20 w-auto h-96 border border-green-500">
            <Calendar />
          </div>
        </aside>
        <div className="content w-4/5 ml-20">
          <div className="mypage flex">
            {tabs.map((tab) => (
              // id must be given to the parent when mapping
              // each button(tabs), upon click changes activeTab
              <div key={tab.id} className="flex flex-col text-center">
                <button
                  onClick={() => handleTabClick(tab.name)}
                  className={`${
                    activeTab === tab.name ? 'font-bold' : 'font-light'
                  } text-2xl mr-5 flex flex-col items-center w-40`}
                >
                  {tab.name}
                  <span
                    className={
                      activeTab === tab.name ? 'font-bold' : 'font-light'
                    }
                  >
                    {tab.value}
                  </span>
                </button>
              </div>
            ))}
          </div>
          {/* Contents shown upon clicking(activeTab) */}
            {activeTab === 'Review' && <TabReview />}
            {activeTab === 'Meeting' && <TabMeeting />}
            {activeTab === 'Collection' && <TabCollection />}
            {activeTab === 'Comment' && <TabComment />}
            {activeTab === 'Points' && <TabPoints />}
        </div>
      </div>
    </div>
  );
};
export default MyPage;
