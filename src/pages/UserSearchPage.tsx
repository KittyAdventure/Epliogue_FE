import { useState } from 'react';
import { useParams } from 'react-router-dom';
import UserFilterSection from '../components/user/UserFilterSection';
import UserListSection from '../components/user/UserListSection';

const UserSearchPage: React.FC = () => {
  const { searchTerm } = useParams<{ searchTerm: string }>();
  const [sortCriterion, setSortCriterion] = useState<string>('latest');
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { value: 'latest', label: '최신 가입순' },
    { value: 'oldest', label: '오래된 가입순' },
    { value: 'mostFollowers', label: '팔로워 많은순' },
  ];

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
                    key={option.value} // key 추가
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
          {/* 필터 영역 */}
          <UserFilterSection />

          {/* 책 리스트 영역 */}
          <UserListSection />
        </div>
      </div>
    </section>
  );
};

export default UserSearchPage;
