/**
 * 마이페이지 용 컴포넌트
 *
 */

const PageTabs = (): React.JSX.Element => {
  return (
    <div>
      {/* Tab선택 */}
      {/* <div id="tab1" className="activeTab">
        <h4>리뷰</h4>
        <p>51</p>
      </div>
      <div id="tab2">
        <h4>모임</h4>
        <p>11</p>
      </div>
      <div id="tab3">
        <h4>컬렉션</h4>
        <p>7</p>
      </div>
      <div id="tab4">
        <h4>포인트</h4>
        <p>99000</p>
      </div> */}
      {/* Tab 선택에 따라 보여지는 콘텐츠 */}
      <div role="tablist" className="tabs tabs-bordered">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Tab 1"
        />
        <div role="tabpanel" className="tab-content p-10">
          Tab content 1
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Tab 2"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-10">
          Tab content 2
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Tab 3"
        />
        <div role="tabpanel" className="tab-content p-10">
          Tab content 3
        </div>
      </div>
    </div>
  );
};
export default PageTabs;
