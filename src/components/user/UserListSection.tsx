const users = Array(12).fill({
  nickname: 'bird',
  loginId: 'test123',
  email: 'test@naver.com',
  follower: '20',
  following: '30',
  reviewCount: '22',
  meetingCount: '10',
  collectionCount: '100',
  birthDate: 'YYYY-MM-DD',
  profileUrl: '/img/members/member6.jpg', // 이미지 경로를 변경하세요.
});

function UserListSection() {
  return (
    <div
      className="w-6/7 pl-12 pr-11 pt-5 pb-[4rem]"
      style={{ maxHeight: '80vh', overflowY: 'auto' }}
    >
      {/* 유저 카드 리스트 */}
      <div className="grid grid-cols-3 gap-12">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105"
          >
            <div className="relative mx-auto p-4">
              <img
                src={user.profileUrl}
                alt={user.nickname}
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
            </div>

            <div className="p-4 text-black space-y-1 pt-0">
              {/* User Information */}
              <h3 className="text-center font-semibold text-xl">
                {user.nickname}
              </h3>
              <p className="text-center text-sm text-gray-500">
                {user.loginId}
              </p>
              <p className="text-center text-sm text-gray-500">{user.email}</p>
              <p className="text-center text-xs text-gray-400">
                가입일: {user.birthDate}
              </p>

              {/* Follower/Following count */}
              <div className="flex justify-center items-center text-xs text-gray-500 mt-2 gap-4">
                <span className="flex items-center gap-1">
                  팔로워: {user.follower}
                </span>
                <span className="flex items-center gap-1">
                  팔로잉: {user.following}
                </span>
              </div>

              {/* Stats for Reviews, Meetings, Collections */}
              <div className="grid grid-cols-3 gap-4 text-xs text-gray-500 mt-3">
                <div className="flex justify-center items-center flex-col">
                  <span>리뷰</span>
                  <span>{user.reviewCount}</span>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <span>모임</span>
                  <span>{user.meetingCount}</span>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <span>컬렉션</span>
                  <span>{user.collectionCount}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserListSection;
