import { useState } from 'react';
import FilterSectopm from '../components/booklist/FilterSectopm';
import ListSection from '../components/booklist/ListSection';

const BookPage: React.FC = () => {
  const [sortCriterion, setSortCriterion] = useState<string>('latest');
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { value: 'latest', label: '최신순' },
    { value: 'list', label: '조회순' },
    { value: 'star', label: '평점순' },
  ];

  return (
    <section className="section-wrap mb-[150px]">
      <div className="pt-6 flex flex-col gap-14">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-6">전체 책 리스트</h1>
          <div className="w-35 z-50">
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
              <ul className="absolute w-35 mt-1 border py-2 border-gray-300 rounded-lg bg-white shadow-md">
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
          {/* 필터 영역 */}
          <FilterSectopm />

          {/* 책 리스트 영역 */}
          <ListSection />
        </div>
      </div>
    </section>
  );
};

export default BookPage;
