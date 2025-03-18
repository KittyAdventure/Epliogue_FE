import axios from 'axios';
import { useEffect, useState } from 'react';

import Calendar from './Calendar';
import UserInfo from './UserInfo';
// Tabs
import TabCollection from './TabCollection';
import TabComment from './TabComment';
import TabMeeting from './TabMeeting';
import TabPoints from './TabPoints';
import TabReview from './TabReview';

interface Tab {
  id: string;
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
  const [nickName, setNickName] = useState<string>('');
  const [loginId, setLoginId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [follower, setFollower] = useState<string>('');
  const [following, setFollowing] = useState<string>('');

  const [reviewCount, setReviewCount] = useState<string>('');
  const [commentCount, setCommentCount] = useState<string>('');
  const [meetingCount, setMeetingCount] = useState<string>('');
  const [collectionCount, setCollectionCount] = useState<string>('');
  const [point, setPoint] = useState<string>('');

  const [activeTab, setActiveTab] = useState<string>('Comment');

  const handleTabClick = (tabName: string) => {
    //set active TAB
    setActiveTab(tabName);
  };

  // Get user info upon visintg mypage while logged in
  const fetchUserInfo = async (loginId: string) => {
    try {
      const apiUrl =
        import.meta.env.NODE === 'production'
          ? import.meta.env.VITE_API_URL_PROD
          : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.get(`${apiUrl}/mypage`, {
        params: { id: loginId },
      });
      // 메인갔다가 마이페이지로 오면 정보업데이트
      console.log('===========================X');
      console.log(response);
      console.log(response.data);
      console.log('============================X');
      // response 데이터 각 아이템을 할당
      setNickName(response.data.nickname);
      setLoginId(response.data.loginId);
      setEmail(response.data.email);
      setFollower(response.data.follower);
      setFollowing(response.data.following);

      setReviewCount(response.data.reviewCount);
      setCommentCount(response.data.commentCount);
      setMeetingCount(response.data.meetingCount);
      setCollectionCount(response.data.collectionCount);
      setPoint(response.data.point);
    } catch (error) {
      console.error('Failed to fetch user info', error);
    }
  };
  useEffect(() => {
    fetchUserInfo('test123');
  }, []);

  // Values must be called from User's Data
  const tabs: Tab[] = [
    { id: '1', name: 'Review', value: reviewCount },
    { id: '2', name: 'Meeting', value: meetingCount },
    { id: '3', name: 'Collection', value: collectionCount },
    { id: '4', name: 'Comment', value: commentCount },
    { id: '5', name: 'Points', value: point },
  ];

  return (
    <div className="mypage ">
      <h2 className="title my-0 mx-[auto] max-w-[1440px] py-20 text-4xl font-medium">
        {nickName}의 페이지
      </h2>
      <div className="contentWrap flex justify-between my-0 mx-[auto] max-w-[1440px]">
        <aside className="border border-red-500 text-center w-1/5">
          <UserInfo
            nickname={nickName}
            loginId={loginId}
            email={email}
            follower={follower}
            following={following}
          />
          <div className="calendar mt-20 w-auto h-96 border border-green-500">
            <Calendar />
          </div>
        </aside>
        <div className="content w-4/5 ml-20">
          <div className="mypage flex">
            {tabs.map((tab) => (
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
