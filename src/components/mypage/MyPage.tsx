
import PageTabs from "./PageTabs"

// 마이페이지 클릭 -> 로그인 되어있음 -> 이 페이지로 온다
const MyPage = (): React.JSX.Element => {
  return (
    <div className="mypage ">
      <h2 className="title">마이페이지</h2>
      <div className="contentWrap">
        <aside>
          <div>Avatar</div>
          <h4>Username</h4>
          <p>email@gmail.com</p>
          <ul>
            <li>Followers:000</li>
            <li>Following:000</li>
          </ul>
          <div>Calendar</div>
        </aside>
        <div className="content">
          <PageTabs />
        </div>
      </div>
    </div>
  );
};
export default MyPage;
