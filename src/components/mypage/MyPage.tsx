import axios from 'axios';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

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

interface UserInfo {
  nickname: string;
  loginId: string;
  email: string;
  follower: string;
  following: string;

  reviewCount: string;
  commentCount: string;
  meetingCount: string;
  collectionCount: string;
  point: string;
}

// 마이페이지 클릭 -> 로그인 되어있음 -> 이 페이지로 온다
const MyPage = (): React.JSX.Element => {
  // const navigate = useNavigate();
  // Robust way to handle multiple useState from same source
  const [userInfo, setUserInfo] = useState({
    nickName: '',
    loginId: '',
    email: '',
    follower: '',
    following: '',
    reviewCount: '',
    commentCount: '',
    meetingCount: '',
    collectionCount: '',
    point: '',
  });
  const [activeTab, setActiveTab] = useState<string>('Review');
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName); //set active tab
  };

  // Get user info upon visintg mypage while logged in
  const accessToken = localStorage.getItem('accesstoken');
  const memberId = localStorage.getItem('memberId');
  console.log("MYPAGE")
  console.log(typeof memberId)
  console.log(memberId)
  const fetchUserInfo = async (memberId: string) => {
    try {
      const apiUrl =
        import.meta.env.NODE === 'production'
          ? import.meta.env.VITE_API_URL_PROD
          : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.get(`${apiUrl}/api/mypage/user-info`, {
        params: { memberId },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // 메인갔다가 마이페이지로 오면 정보업데이트
      if (!response) {
        console.log('No Response MyPage User-Info');
      } else {
        console.log('==========MYPAGE RESPONSE==========');
        console.log(response);
        console.log(response.status);
        console.log(response.data);
        // response 데이터 각 아이템을 할당
        setUserInfo({
          nickName: response.data.nickname,
          loginId: response.data.loginId,
          email: response.data.email,
          follower: response.data.follower,
          following: response.data.following,
          reviewCount: response.data.reviewCount,
          commentCount: response.data.commentCount,
          meetingCount: response.data.meetingCount,
          collectionCount: response.data.collectionCount,
          point: response.data.point,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Network Error:', error.message);
        console.error('Error Details:', error.response?.data);
        console.error('Error Details:', error.response?.data.error);
      } else {
        console.error('Unexpected Error:', error);
      }
    }
  };
  useEffect(() => {
    // safeguard
    if (memberId) {
      fetchUserInfo(memberId);
    }
  }, []);

  // Values must be called from User's Data
  const tabs: Tab[] = [
    { tabId: '1', name: 'Review', value: userInfo.reviewCount },
    { tabId: '2', name: 'Meeting', value: userInfo.meetingCount },
    { tabId: '3', name: 'Collection', value: userInfo.collectionCount },
    { tabId: '4', name: 'Comment', value: userInfo.commentCount },
    { tabId: '5', name: 'Points', value: userInfo.point },
  ];

  return (
    <div className="mypage ">
      <h2 className="title my-0 mx-[auto] max-w-[1440px] py-20 text-4xl font-medium">
        {userInfo.nickName}의 페이지
      </h2>
      <div className="contentWrap flex justify-between my-0 mx-[auto] max-w-[1440px]">
        <aside className="border border-red-500 text-center w-1/5">
          <UserInfo
            nickname={userInfo.nickName}
            loginId={userInfo.loginId}
            email={userInfo.email}
            follower={userInfo.follower}
            following={userInfo.following}
          />
          <div className="calendar mt-20 w-auto h-96 border border-green-500">
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
