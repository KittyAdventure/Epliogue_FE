import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Book {
  title: string;
  author: string;
  description: string;
  image: string;
  price: string;
  publisher: string;
  pubDate: string;
  isbn: string;
  sameAuthor: Array<{ title: string }>;
}

const BookPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<Set<string>>(new Set());
  const [sortCriterion, setSortCriterion] = useState<string>('latest');
  const [createdAt, setCreatedAt] = useState<number[]>([]); // 책 등록일 저장용 상태
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/books')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.items) {
          setBooks(data.items);
          const currentTime = new Date().getTime();
          setCreatedAt(new Array(data.items.length).fill(currentTime)); // 책이 로드된 시각을 저장
        }
      })
      .catch((error) => {
        console.error('Error loading books:', error);
        setBooks([]);
      });
  }, []);

  // 책 정렬 함수
  const sortBooks = (books: Book[], createdAt: number[]) => {
    if (sortCriterion === 'latest') {
      return [...books].sort((a, b) => {
        // `books`와 `createdAt`을 인덱스 기반으로 함께 비교
        return createdAt[books.indexOf(b)] - createdAt[books.indexOf(a)]; // 등록일 기준 최신순 정렬 (내림차순)
      });
    } else if (sortCriterion === 'pubDate') {
      return [...books].sort((a, b) => {
        return new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime(); // 출간일순 정렬 (오름차순)
      });
    }
    return books; // 기본값은 원래 순서로 반환
  };

  // 정렬 기준 변경 핸들러
  const handleSortChange = (criterion: string) => {
    setSortCriterion(criterion);
  };

  const toggleBookmark = (isbn: string) => {
    setSelectedBooks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(isbn)) {
        newSet.delete(isbn);
      } else {
        newSet.add(isbn);
      }
      return newSet;
    });
  };

  if (books.length === 0) {
    return <div>Loading...</div>;
  }

  // 책 정렬 후 렌더링
  const sortedBooks = sortBooks(books, createdAt);

  return (
    <section className="section-wrap">
      <div className="pt-6 flex flex-col gap-14">
        <h1 className="text-3xl font-bold mb-6">책 정보 페이지</h1>
        <div className="flex w-full justify-between gap-[2vw]">
          {/* 정렬 기준 선택 */}
          <div className="w-1/7 h-[17vh] p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="flex items-center mb-2 ml-2">
              <h2 className="text-sm text-[#888888] mr-1">정렬 기준</h2>
              <i className="fas fa-filter text-[#888888] text-xs translate-y-[1px]"></i>
            </div>
            <hr className="border-gray-300 mb-4" />
            <div className="flex flex-col space-y-3 text-gray-700 ml-2">
              <button
                className="text-left focus:text-blue-500 focus:font-bold"
                onClick={() => handleSortChange('latest')}
              >
                최신순
              </button>
              <button className="text-left focus:text-blue-500 focus:font-bold">
                평점순
              </button>
              <button className="text-left focus:text-blue-500 focus:font-bold">
                리뷰순
              </button>
              <button
                className="text-left focus:text-blue-500 focus:font-bold"
                onClick={() => handleSortChange('pubDate')}
              >
                출간일순
              </button>
            </div>
          </div>

          {/* 책 목록 */}
          <div className="w-6/7 overflow-y-auto max-h-[80vh] grid grid-cols-[repeat(3,minmax(0,0.5fr))] gap-12 ml-12 pr-11 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {sortedBooks.map((book) => (
              <div
                key={book.isbn} // ISBN을 고유 키로 사용
                className="relative cursor-pointer book-card"
                onClick={() => navigate(`/book/${book.isbn}`)} // 책 상세 페이지로 이동
              >
                <div
                  className={`absolute top-0 right-2 cursor-pointer ${
                    selectedBooks.has(book.isbn)
                      ? 'text-green-500'
                      : 'text-black/90'
                  }`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(book.isbn);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-12"
                    style={{
                      filter:
                        'drop-shadow(0.5px 2px 3px rgba(255, 255, 255, 0.5))',
                    }}
                  >
                    <path d="M6 2a2 2 0 00-2 2v18l8-5 8 5V4a2 2 0 00-2-2H6z" />
                  </svg>
                </div>
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-[90%] object-cover rounded-lg shadow-md mb-4"
                />
                <h2 className="text-lg font-semibold mt-3 text-center">
                  {book.title}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookPage;
