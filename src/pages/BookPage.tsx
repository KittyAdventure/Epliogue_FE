import { useEffect, useState } from 'react';

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
  const [selectedBooks, setSelectedBooks] = useState<Set<number>>(new Set());

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
        }
      })
      .catch((error) => {
        console.error('Error loading books:', error);
        setBooks([]);
      });
  }, []);

  const toggleBookmark = (index: number) => {
    setSelectedBooks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  if (books.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section className="section-wrap">
      <div className="pt-6 flex flex-col gap-14">
        {/* 타이틀 */}
        <h1 className="text-3xl font-bold mb-6">책 정보 페이지</h1>
        <div className="flex w-full justify-between gap-[2vw]">
          {/* 정렬기준 */}
          <div className="w-1/7 h-[17vh] p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="flex items-center mb-2 ml-2">
              <h2 className="text-sm text-[#888888] mr-1">정렬 기준</h2>
              <i className="fas fa-filter text-[#888888] text-xs translate-y-[1px]"></i>
            </div>
            <hr className="border-gray-300 mb-4" />
            <div className="flex flex-col space-y-3 text-gray-700 ml-2">
              <button className="text-left focus:text-blue-500 focus:font-bold">
                최신순
              </button>
              <button className="text-left focus:text-blue-500 focus:font-bold">
                평점순
              </button>
              <button className="text-left focus:text-blue-500 focus:font-bold">
                리뷰순
              </button>
              <button className="text-left focus:text-blue-500 focus:font-bold">
                출간일순
              </button>
            </div>
          </div>
          {/* 책 목록 */}
          <div className="w-6/7 overflow-y-auto max-h-[80vh] grid grid-cols-[repeat(3,minmax(0,0.5fr))] gap-12 ml-12 pr-11 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {books.map((book, index) => (
              <div key={index} className="relative">
                <div
                  className={`absolute top-0 right-2 cursor-pointer ${
                    selectedBooks.has(index)
                      ? 'text-green-500'
                      : 'text-black/80'
                  }`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(index);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-12"
                  >
                    <path d="M6 2a2 2 0 00-2 2v18l8-5 8 5V4a2 2 0 00-2-2H6z" />
                  </svg>
                </div>

                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-[90%] object-cover rounded-lg shadow-md mb-4" // 이미지와 제목 사이에 간격 추가
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
