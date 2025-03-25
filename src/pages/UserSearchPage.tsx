import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserFilterSection from '../components/user/UserFilterSection';
import UserListSection from '../components/user/UserListSection';

interface Params extends Record<string, string | undefined> {
  searchTerm: string;
}

const UserSearchPage: React.FC = () => {
  const { searchTerm } = useParams<Params>();
  const [sortCriterion, setSortCriterion] = useState<string>('latest');
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { value: 'newest', label: '최신 가입순' },
    { value: 'oldest', label: '오래된 가입순' },
  ];

  const [filters, setFilters] = useState({
    nickname: 'false',
    loginId: 'true', // 기본값을 true로 설정 (loginId가 기본 검색 필터로 선택)
    email: 'false',
    profileUrl: 'false',
    createAt: 'false',
  });
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const searchType = filters.loginId === 'true' ? 'loginId' : 'nickname'; // loginId가 true일 때 loginId를 검색 기준으로 사용
      const keyword = searchTerm; // 검색할 키워드
      const page = 0; // 페이지 번호
      const size = 9; // 페이지 당 회원 수

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL_DEV}/api/members/search`,
        {
          params: {
            searchType,
            keyword,
            page,
            size,
          },
        },
      );
      setUsers(data.data.content);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, filters]);

  return (
    <section className="section-wrap mb-[150px]">
      <div className="pt-6 flex flex-col gap-14">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">{`"${searchTerm}"에 대한 결과`}</h1>
          <div className="w-36 z-50">
            <button
              className="w-full border p-2 px-4 rounded-lg text-m bg-white flex justify-between items-center hover:"
              onClick={() => setIsOpen(!isOpen)}
            >
              {sortCriterion
                ? options.find((opt) => opt.value === sortCriterion)?.label
                : '정렬'}
              <span>▼</span>
            </button>

            {isOpen && (
              <ul className="absolute w-36 mt-1 border py-2 border-gray-300 rounded-lg bg-white shadow-md">
                {options.map((option) => (
                  <li
                    key={option.value}
                    className="py-2 px-4 cursor-pointer hover:font-bold transition-all duration-300"
                    onClick={() => {
                      setSortCriterion(option.value);
                      setIsOpen(false);
                    }}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex w-full justify-between gap-[2vw]">
          {/* 유저 필터 영역 */}
          <UserFilterSection filters={filters} setFilters={setFilters} />

          {/* 유저 리스트 영역 */}
          <UserListSection users={users} isLoading={isLoading} />
        </div>
      </div>
    </section>
  );
};

export default UserSearchPage;
