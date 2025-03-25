import { FaFilter } from 'react-icons/fa';

interface FilterProps {
  filters: {
    nickname: string; // 유저 닉네임
    loginId: string; // 로그인 아이디
    email: string;
    profileUrl: string;
    createAt: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<FilterProps['filters']>>;
}

const UserFilterSection: React.FC<FilterProps> = ({ filters, setFilters }) => {
  // 닉네임, 아이디, 이메일 중 하나만 선택 가능하도록 설정
  const handleFilterChange = (filter: 'nickname' | 'loginId' | 'email') => {
    setFilters({
      ...filters,
      nickname: 'false',
      loginId: 'false',
      email: 'false',
      [filter]: filters[filter] === 'true' ? 'false' : 'true',
    });
  };

  // 프로필 이미지 필터 토글 (기본 이미지 제외 여부)
  const handleProfileFilterChange = () => {
    setFilters({
      ...filters,
      profileUrl:
        filters.profileUrl === 'excludeDefault' ? '' : 'excludeDefault',
    });
  };

  return (
    <div className="w-72 p-6 bg-white rounded-xl shadow-lg border border-gray-200 max-h-[40rem]">
      <h3 className="text-lg font-semibold flex items-center mb-4 text-gray-800">
        필터 <FaFilter className="ml-2 mt-1" />
      </h3>
      <hr className="mb-4 border-gray-300" />

      {/* 검색 기준 그룹 */}
      <div className="mt-4 space-y-6">
        <h3 className="font-semibold text-md">기본 검색 기준</h3>
        <div className="space-y-4">
          {['nickname', 'loginId', 'email'].map((filterKey) => (
            <div key={filterKey}>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={
                    filters[filterKey as keyof typeof filters] === 'true'
                  }
                  onChange={() =>
                    handleFilterChange(
                      filterKey as 'nickname' | 'loginId' | 'email',
                    )
                  }
                />
                <span>
                  {filterKey === 'nickname'
                    ? '닉네임'
                    : filterKey === 'loginId'
                    ? '아이디'
                    : '이메일'}
                </span>
              </label>
              <p className="text-sm text-gray-500">
                {filterKey === 'nickname'
                  ? '사용자의 닉네임을 기준으로 검색합니다.'
                  : filterKey === 'loginId'
                  ? '사용자의 로그인 아이디를 기준으로 검색합니다.'
                  : '사용자의 이메일을 기준으로 검색합니다.'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 추가 필터 그룹 */}
      <div className="mt-6 space-y-6">
        <h3 className="font-semibold text-md">추가 필터</h3>
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.profileUrl === 'excludeDefault'} // 기본 프로필 제외 여부 체크
                onChange={handleProfileFilterChange}
              />
              <span>프로필 이미지</span>
            </label>
            <p className="text-sm text-gray-500">
              프로필 이미지가 있는 유저만 검색합니다 (기본 프로필 제외).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFilterSection;
