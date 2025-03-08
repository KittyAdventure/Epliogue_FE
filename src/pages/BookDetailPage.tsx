import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa'; // 별 아이콘
import { useNavigate, useParams } from 'react-router-dom';

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

const BookDetailPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [book, setBook] = useState<Book | null>(null);
  const [rating, setRating] = useState<number>(0); // 별점 상태
  const [hoverRating, setHoverRating] = useState<number>(0); // 마우스 오버 상태
  const { isbn } = useParams();
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
        setBooks(data.items);
      })
      .catch((error) => {
        console.error('Error loading books:', error);
        setBooks([]);
      });
  }, []);

  useEffect(() => {
    if (isbn) {
      const selectedBook = books.find((book) => book.isbn === isbn);
      setBook(selectedBook || null);
    }
  }, [isbn, books]);

  const handleRatingClick = (index: number) => {
    setRating(index + 1); // 별점 클릭 시 상태 변경
  };

  const handleMouseEnter = (index: number) => {
    setHoverRating(index + 1); // 마우스 오버 시 상태 변경
  };

  const handleMouseLeave = () => {
    setHoverRating(0); // 마우스가 별에서 벗어날 때 상태 초기화
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <section className="section-wrap">
      <div className="pt-6 flex gap-14">
        {/* 이미지 영역 */}
        <div className="w-1/3">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* 텍스트 영역 */}
        <div className="w-2/3 flex flex-col gap-4">
          <div className="flex items-center">
            <span className="text-m font-semibold">★평균 4.5</span>
            <span className="text-xs text-gray-500">(2.3만명)</span>
          </div>
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold">{book.title}</h2>
            <h3 className="text-lg text-gray-700">{book.author}</h3>
          </div>
          <p className="text-base">{book.description}</p>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-500">가격: {book.price}원</p>
            <p className="text-sm text-gray-500">출판: {book.pubDate}</p>
            <p className="text-sm text-gray-500">출판사항: {book.publisher}</p>
          </div>

          {/* 별점 부분 */}
          <div className="flex flex-col">
            <p className="text-sm text-gray-500">별점</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`text-2xl font-semibold cursor-pointer transition-all duration-200 ${
                    (hoverRating || rating) > index
                      ? 'text-yellow-500'
                      : 'text-gray-400'
                  }`}
                  onClick={() => handleRatingClick(index)} // 별 클릭 시 별점 변경
                  onMouseEnter={() => handleMouseEnter(index)} // 마우스 오버 시 별점 미리 보기
                  onMouseLeave={handleMouseLeave} // 마우스 벗어나면 초기화
                >
                  <FaStar />
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button className="bg-black hover:bg-black/70 text-white font-bold py-2 px-5 rounded-lg shadow-lg">
              리뷰하기
            </button>
            <button className="bg-white hover:bg-black/10 text-black font-bold py-2 px-5 rounded-lg shadow-lg">
              모임하기
            </button>
          </div>
        </div>
      </div>
      {book.sameAuthor && book.sameAuthor.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold">같은 작가 다른 추천 작품</h3>
          <ul className="flex flex-wrap gap-2 mt-2">
            {book.sameAuthor.map((otherBook, index) => (
              <li key={index} className="text-sm">
                <a
                  href="#"
                  className="text-blue-500"
                  onClick={() => navigate(`/book/${otherBook.title}`)}
                >
                  #{otherBook.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default BookDetailPage;
