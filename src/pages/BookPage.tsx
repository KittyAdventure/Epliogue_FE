import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import FilterSection from '../components/booklist/FilterSection';
import ListSection from '../components/booklist/ListSection';

interface Book {
  thumbnail: string;
  bookTitle: string;
  bookId: string;
  rating?: number; // 평점
  view?: number; // 조회수
  date?: string; // 출판일자 (ISO 8601 형식 또는 다른 날짜 형식일 수 있음)
}

const BookPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [sort, setSort] = useState<'rating' | 'view' | 'date'>('date');
  const [chosung, setChosung] = useState<string | null>(null);
  const [englishChosung, setEnglishChosung] = useState<string | null>(null);
  const [rating, setRating] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [page, setPage] = useState<number>(1); // 페이지 상태 추가
  const [totalPages, setTotalPages] = useState<number>(1); // 총 페이지 수 상태 추가

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log('✅ 선택된 영어 초성:', englishChosung);

        const params = {
          sort,
          chosung,
          englishChosung,
          rating,
          startDate,
          endDate,
          page, // 페이지를 params에 추가
        };

        console.log('📡 API 요청 Params:', params);

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_DEV}/books/main-page`,
          { params },
        );

        console.log('📩 API 응답 데이터:', response.data);

        let filteredBooks: Book[] = response.data.books || [];
        setTotalPages(response.data.totalPages); // API 응답에서 총 페이지 수를 설정

        // ✅ 영어 초성이 선택된 경우 필터링
        if (englishChosung) {
          filteredBooks = filteredBooks.filter((book) =>
            book.bookTitle.toUpperCase().startsWith(englishChosung),
          );
        }

        // ✅ 정렬 적용 (클라이언트 측 정렬)
        filteredBooks.sort((a, b) => {
          if (sort === 'rating') {
            console.log('🔄 정렬: 평점순');
            return (b.rating ?? 0) - (a.rating ?? 0); // 높은 평점순
          } else if (sort === 'view') {
            console.log('🔄 정렬: 조회순');
            return (b.view ?? 0) - (a.view ?? 0); // 조회수 높은 순
          } else {
            console.log('🔄 정렬: 최신순');
            // 날짜가 ISO 8601 형식이면 new Date()로 변환해서 비교 가능
            return (
              new Date(b.date ?? '').getTime() -
              new Date(a.date ?? '').getTime()
            ); // 최신순
          }
        });

        setBooks(filteredBooks);
      } catch (error) {
        console.error('❌ Error loading books:', error);
        setBooks([]);
      }
    };

    fetchBooks();
  }, [sort, chosung, englishChosung, rating, startDate, endDate, page]); // page도 의존성 배열에 추가

  const sortOptions: { value: 'rating' | 'view' | 'date'; label: string }[] = [
    { value: 'rating', label: '평점순' },
    { value: 'view', label: '조회순' },
    { value: 'date', label: '최신순' },
  ];
  const [isOpen, setIsOpen] = useState(false);

  // 페이지네이션 버튼 클릭 시 페이지를 변경
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  // 페이지 번호 배열 생성
  const generatePageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, page - 2); // 이전 2페이지부터 시작
    let endPage = Math.min(totalPages, page + 2); // 다음 2페이지까지 포함

    // 만약 startPage가 1보다 작으면 끝 페이지로 보정
    if (page - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (1 - (page - 2)));
      startPage = 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

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

        {/* 페이지네이션 */}
        <div className="flex justify-center gap-4 mt-6 ml-60">
          <button
            onClick={() => handlePageChange(1)} // 첫 페이지로 이동
            disabled={page <= 1}
            className="px-4 py-2 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </button>
          <button
            onClick={() => handlePageChange(page - 1)} // 이전 페이지로 이동
            disabled={page <= 1}
            className="px-4 py-2 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>

          {/* 페이지 번호 버튼들 */}
          {generatePageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-4 py-2 rounded-full font-bold ${
                page === pageNum ? 'bg-blue-500 text-white' : 'text-gray-400'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(page + 1)} // 다음 페이지로 이동
            disabled={page >= totalPages}
            className="px-4 py-2 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <button
            onClick={() => handlePageChange(totalPages)} // 마지막 페이지로 이동
            disabled={page >= totalPages}
            className="px-4 py-2 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookPage;
