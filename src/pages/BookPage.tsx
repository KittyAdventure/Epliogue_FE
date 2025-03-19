import axios from 'axios';
import { useEffect, useState } from 'react';
import FilterSection from '../components/booklist/FilterSection';
import ListSection from '../components/booklist/ListSection';

interface Book {
  thumbnail: string;
  bookTitle: string;
  bookId: string;
}

const BookPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<'rating' | 'view' | 'date'>('date'); // 정렬 상태
  const [chosung, setChosung] = useState<string | null>(null);
  const [englishChosung, setEnglishChosung] = useState<string | null>(null);
  const [rating, setRating] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params: {
          page: number;
          sort: string | null;
          chosung: string | null;
          rating: string | null;
          startDate: Date | null;
          endDate: Date | null;
        } = { page, sort, chosung, rating, startDate, endDate };

        if (chosung) params.chosung = chosung;
        if (rating) params.rating = rating;
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_DEV}/main-page`,
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
  }, [page, sort, chosung, rating, startDate, endDate]);

  const sortOptions: { value: 'rating' | 'view' | 'date'; label: string }[] = [
    { value: 'rating', label: '평점순' },
    { value: 'view', label: '조회순' },
    { value: 'date', label: '최신순' },
  ];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="section-wrap mb-[150px]">
      <div className="pt-6 flex flex-col gap-14">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-6">전체 책 리스트</h1>
          <div className="w-36 z-50 relative">
            {/* 정렬 */}
            <button
              className="w-full border p-2 px-4 rounded-lg text-m bg-white flex justify-between items-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              {sortOptions.find((opt) => opt.value === sort)?.label || '정렬'}
              <span>▼</span>
            </button>

            {isOpen && (
              <ul className="absolute w-36 mt-1 border py-2 border-gray-300 rounded-lg bg-white shadow-md">
                {sortOptions.map((option) => (
                  <li
                    key={option.value}
                    className="py-2 px-4 cursor-pointer hover:font-bold transition-all duration-300"
                    onClick={() => {
                      setSort(option.value);
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

export default BookPage;
