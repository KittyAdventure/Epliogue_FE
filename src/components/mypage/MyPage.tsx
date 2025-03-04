import PageTabs from './PageTabs';

// 마이페이지 클릭 -> 로그인 되어있음 -> 이 페이지로 온다
const MyPage = (): React.JSX.Element => {
  return (
    <div className="mypage ">
      <h2 className="title my-0 mx-[auto] max-w-[1440px] py-20 text-4xl font-medium">
        마이페이지
      </h2>
      <div className="contentWrap flex justify-between my-0 mx-[auto] max-w-[1440px]">
        <aside className="border border-red-500 text-center w-1/5">
          <div className="my-0 mx-[auto] w-40 h-40 border border-green-500 rounded-full">
            Avatar
          </div>
          <div className="user-info mt-5">
            <h4 className="text-xl font-medium">Username</h4>
            <p className="text-[#aaa]">username247@gmail.com</p>
            <ul className="follow-info flex justify-center items-center mt-3">
              <li className="mr-3">Followers:000</li>
              <span> | </span>
              <li className="ml-3">Following:000</li>
            </ul>
          </div>
          <div className="calendar mt-10 w-auto h-96 border border-green-500">
            Calendar
          </div>
        </aside>
        <div className="content w-4/5">
          <PageTabs />
        </div>
      </div>
    </div>
  );
};
export default MyPage;
