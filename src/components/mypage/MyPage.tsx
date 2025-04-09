import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utility/useAuth';
import {apiUrl} from "../../utility/AuthUtils"

import Calendar from './Calendar';
import UserInfo from './UserInfo';
// Tabs
import TabCollection from './TabCollection';
import TabComment from './TabComment';
import TabMeeting from './TabMeeting';
import TabPoints from './TabPoints';
import TabReview from './TabReview';

interface Tab {
  tabId: string;
  name: string;
  value: string;
}
//object where each KEY is string, VALUE is react component
const tabComponents: Record<string, React.JSX.Element> = {
  //object entries, each entry in object maps a tab ; render component based on tab name
  Review: <TabReview />,
  Meeting: <TabMeeting />,
  Collection: <TabCollection />,
  Comment: <TabComment />,
  Points: <TabPoints />,
};

interface UserInfo {
  [key: string]: string;
  nickName: string;
  loginId: string;
  email: string;
  phone: string; //api명세서 추가 안됐음
  profileUrl: string;
  follower: string;
  following: string;

  reviewCount: string;
  commentCount: string;
  meetingCount: string;
  collectionCount: string;
  point: string;
}

const tabData = [
  { name: 'Review', key: 'reviewCount' },
  { name: 'Meeting', key: 'meetingCount' },
  { name: 'Collection', key: 'collectionCount' },
  { name: 'Comment', key: 'commentCount' },
  { name: 'Points', key: 'point' },
];
// 마이페이지 클릭 -> 로그인 되어있음 -> 이 페이지로 온다
const MyPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null); //from name:type x12 -> 1 line of code
  const [activeTab, setActiveTab] = useState<string>('Review');

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName); //set active tab
  };
  const handleLogOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('memberId');
    localStorage.removeItem('accesstoken');
    navigate('/');
  };

  // Fetch user info upon entering MyPage
  const fetchUserInfo = async () => {
    const accessToken = localStorage.getItem('accesstoken');
    const memberId = localStorage.getItem('memberId');
    if (!accessToken || !memberId) {
      handleLogOut();
      return;
    }
    try {
      const response = await axios.get(`${apiUrl}/api/mypage/user-info`, {
        params: { memberId },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // 메인갔다가 마이페이지로 오면 정보업데이트
      if (response?.data) {
        console.log('Mypage Response', response);
        setUserInfo(response.data); // response 데이터 각 아이템을 할당
      } else {
        console.warn('Mypage - No user data received');
      }
    } catch (error) {
      handleApiError(error);
    }
  };
  const handleApiError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      console.error('MyPage-Axios Net Error:', error.message);
    } else {
      console.error('MyPage-Unexpected Error:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []); //removed dependecy array to avoid unnecessary re-fetching

  // dynamically setup tab buttons
  const tabs: Tab[] = tabData.map(({ name, key }, idx) => ({
    tabId: `${idx + 1}`,
    name,
    value: userInfo?.[key as keyof UserInfo] ?? '0', //explicitly state the type
  }));

  //userinfo fetched asynchronously, ensure it's defined before access
  if (!userInfo) return <p>Loading...</p>;
  return (
    <div className="mypage ">
      <h2 className="title my-0 mx-[auto] max-w-[1440px] py-20 text-4xl font-medium">
        {userInfo.nickName} 님의 페이지
      </h2>
      <div className="contentWrap flex justify-between my-0 mx-[auto] max-w-[1440px] min-h-[1200px]">
        <aside className="text-center w-1/5">
          <UserInfo
            nickName={userInfo.nickName}
            loginId={userInfo.loginId}
            email={userInfo.email}
            follower={userInfo.follower}
            following={userInfo.following}
            phone={userInfo.phone} //추가안됐음
            profileUrl={userInfo.profileUrl}
          />
          <div className="calendar mt-20 w-auto h-96">
            <Calendar />
          </div>
        </aside>
        <div className="content w-4/5 ml-20">
          <div className="mypage flex">
            {tabs.map((tab) => (
              <div key={tab.tabId} className="flex flex-col text-center">
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
          {tabComponents[activeTab]}
        </div>
      </div>
    </div>
  );
};
export default MyPage;
