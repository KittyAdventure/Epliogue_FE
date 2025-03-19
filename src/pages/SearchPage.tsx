import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FilterSection from '../components/booklist/FilterSection';
import ListSection from '../components/booklist/ListSection';

const SearchPage: React.FC = () => {
  const { searchTerm } = useParams<{ searchTerm: string }>();
  const [sortCriterion, setSortCriterion] = useState<string>('latest');
  const [isOpen, setIsOpen] = useState(false);
  const [books, setBooks] = useState<any[]>([]); // Adjust the type if you have a Book interface
  const [chosung, setChosung] = useState<string | null>(null);
  const [englishChosung, setEnglishChosung] = useState<string | null>(null);
  const [rating, setRating] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const options = [
    { value: 'latest', label: '최신순' },
    { value: 'list', label: '조회순' },
    { value: 'star', label: '평점순' },
  ];

  // Fetch books when the searchTerm or filters change
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params = {
          searchTerm,
          sort: sortCriterion,
          chosung,
          englishChosung,
          rating,
          startDate,
          endDate,
        };

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_DEV}/search`,
          {
            params,
          },
        );

        setBooks(response.data.books || []);
      } catch (error) {
        console.error('Error loading books:', error);
        setBooks([]);
      }
    };

    fetchBooks();
  }, [
    searchTerm,
    sortCriterion,
    chosung,
    englishChosung,
    rating,
    startDate,
    endDate,
  ]);

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
          {/* 필터 영역 */}
          <FilterSection
            chosung={chosung}
            setChosung={setChosung}
            englishChosung={englishChosung}
            setEnglishChosung={setEnglishChosung}
            rating={rating}
            setRating={setRating}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />

          {/* 책 리스트 영역 */}
          <ListSection books={books} />
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
