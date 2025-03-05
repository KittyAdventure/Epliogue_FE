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
  const [selectedBooks, setSelectedBooks] = useState<Set<number>>(new Set());
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
        }
      })
      .catch((error) => {
        console.error('Error loading books:', error);
        setBooks([]);
      });
  }, []);

  // 북마크
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

  // 상세 페이지
  // const handleBookClick = (bookId: string) => {
  //   navigate(`/book/${bookId}`);
  // };

  if (books.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section className="section-wrap">
      <div className="pt-6 flex flex-col">
        <h1 className="text-3xl font-bold mb-6">책 정보 페이지</h1>
        <div className="flex w-full">
          <div className="w-1/4 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">정렬 기준</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="cursor-pointer hover:text-blue-500">최신순</li>
              <li className="cursor-pointer hover:text-blue-500">평점순</li>
              <li className="cursor-pointer hover:text-blue-500">리뷰순</li>
              <li className="cursor-pointer hover:text-blue-500">출간일순</li>
            </ul>
          </div>
          <div className="w-3/4 overflow-y-auto max-h-[80vh] grid grid-cols-3 gap-6 ml-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {books.map((book, index) => (
              <div
                key={index}
                className="relative"
                // onClick={() => handleBookClick(book.isbn)} // 책 상세페이지 이동
              >
                <div
                  className={`absolute top-2 right-2 w-6 h-8 cursor-pointer ${
                    selectedBooks.has(index)
                      ? 'text-green-500'
                      : 'text-black/80'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(index);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-8"
                  >
                    <path d="M6 2a2 2 0 00-2 2v18l8-5 8 5V4a2 2 0 00-2-2H6z" />
                  </svg>
                </div>
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-[90%] object-cover rounded-lg shadow-md"
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
