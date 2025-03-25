interface UserListProps {
  users: {
    nickname: string; // 유저 닉네임
    loginId: string; // 로그인 아이디
    email: string;
    profileUrl: string;
    createAt: string;
  }[]; // 배열 형태로 정의
  isLoading: boolean;
}

const DEFAULT_PROFILE_IMAGE = '/img/members/user.png';

const UserListSection: React.FC<UserListProps> = ({ users, isLoading }) => {
  if (isLoading) {
    return <div className="mx-auto mt-20 text-xl h-[40vh]">Loading...</div>
  }

  // users가 없거나 빈 배열일 경우 처리
  if (!users || users.length === 0) {
    return (
      <div className="w-6/7 pl-12 pr-7 pb-[4rem] mx-auto mt-20 text-xl text-center">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div
      className="w-6/7 pl-12 pr-7 pb-[4rem]"
      style={{ maxHeight: '80vh', overflowY: 'auto' }}
    >
      {/* User Card List */}
      <div className="grid grid-cols-3 gap-4 cursor-pointer">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-xl transform transition-all duration-400 hover:scale-103 hover:bg-gray-100 p-6"
          >
            <div className="text-black space-y-1 pt-0 flex flex-col items-center">
              <p className="text-center text-sm text-gray-400 rounded-full border border-gray-100">
                <img
                  src={
                    user.profileUrl && user.profileUrl !== DEFAULT_PROFILE_IMAGE
                      ? user.profileUrl
                      : DEFAULT_PROFILE_IMAGE
                  }
                  alt="Profile"
                  className="w-16 h-16 rounded-full"
                />
              </p>

              <h3 className="text-center font-semibold text-xl">
                {user.nickname ? `${user.nickname}` : 'No nickname'}
              </h3>
              <p className="text-center text-sm text-gray-500">
                ID : {user.loginId}
              </p>
              <p className="text-center text-sm text-gray-500">
                Email : {user.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListSection;
