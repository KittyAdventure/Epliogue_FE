import { useState } from 'react';
import { FaFilter } from 'react-icons/fa';

function UserFilterSection() {
  const [filters, setFilters] = useState({
    nickname: false,
    loginId: false,
    email: false,
    hasProfileImage: false,
    hasReviews: false,
    isActive: false,
  });
  const handleFilterChange = (filter: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };
  return (
    <div className="w-72 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold flex items-center mb-4 text-gray-800">
        필터 <FaFilter className="ml-2 mt-1" />
      </h3>
      <hr className="mb-4 border-gray-300" />
      <div>
        {/* 검색 기준 그룹 */}
        <div className="mt-4 space-y-6">
          <h3 className="font-semibold text-md">기본 검색 기준</h3>
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.nickname}
                  onChange={() => handleFilterChange('nickname')}
                />
                <span>닉네임</span>
              </label>
              <p className="text-sm text-gray-500">
                사용자의 닉네임을 기준으로 검색합니다.
              </p>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.loginId}
                  onChange={() => handleFilterChange('loginId')}
                />
                <span>아이디</span>
              </label>
              <p className="text-sm text-gray-500">
                사용자의 로그인 아이디를 기준으로 검색합니다.
              </p>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.email}
                  onChange={() => handleFilterChange('email')}
                />
                <span>이메일</span>
              </label>
              <p className="text-sm text-gray-500">
                사용자의 이메일을 기준으로 검색합니다.
              </p>
            </div>
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
                  checked={filters.hasProfileImage}
                  onChange={() => handleFilterChange('hasProfileImage')}
                />
                <span>프로필 이미지</span>
              </label>
              <p className="text-sm text-gray-500">
                프로필 이미지가 있는 유저만 검색합니다.
              </p>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.hasReviews}
                  onChange={() => handleFilterChange('hasReviews')}
                />
                <span>리뷰 작성 경험 있음</span>
              </label>
              <p className="text-sm text-gray-500">
                리뷰를 작성한 경험이 있는 유저만 검색합니다.
              </p>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.isActive}
                  onChange={() => handleFilterChange('isActive')}
                />
                <span>모임 활동 유저</span>
              </label>
              <p className="text-sm text-gray-500">
                모임 참여 활동을 하는 유저만 검색합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserFilterSection;
