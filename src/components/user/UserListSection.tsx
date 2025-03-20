interface UserListProps {
  users: {
    id: string; // 유저 닉네임
    loginId: string; // 로그인 아이디
    email: string;
    profileUrl: string;
    createAt: string;
  }[]; // 배열 형태로 정의
  isLoading: boolean;
}

const UserListSection: React.FC<UserListProps> = ({ users, isLoading }) => {
  if (isLoading) {
    return <div className="mx-auto mt-20 text-xl h-[40vh]">Loading...</div>;
  }

  // users가 없거나 빈 배열일 경우 처리
  if (!users || users.length === 0) {
    return (
      <div className="mx-auto mt-20 text-xl h-[40vh]">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div
      className="w-6/7 pl-12 pr-7 pt-5 pb-[4rem]"
      style={{ maxHeight: '80vh', overflowY: 'auto' }}
    >
      {/* User Card List */}
      <div className="grid grid-cols-3 gap-4 cursor-pointer">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all duration-400 hover:scale-103 hover:bg-gray-100 mb-7 py-5"
          >
            <div className="p-4 text-black space-y-1 pt-0">
              <h3 className="text-center font-semibold text-xl">
                {user.loginId}
              </h3>
              <p className="text-center text-sm text-gray-500">{user.email}</p>
              <p className="text-center text-sm text-gray-400">
                {user.id ? `Nickname: ${user.id}` : 'No nickname'}
              </p>
              <p className="text-center text-sm text-gray-400">
                {user.profileUrl === 'true'
                  ? 'Has Profile Image'
                  : 'No Profile Image'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListSection;
