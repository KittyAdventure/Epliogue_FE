import { useEffect, useState } from 'react';
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
          <div className='flex flex-col gap-4"'>
            <p className="text-sm text-gray-500">가격: {book.price}원</p>
            <p className="text-sm text-gray-500">출판: {book.pubDate}</p>
            <p className="text-sm text-gray-500">출판사항: {book.publisher}</p>
          </div>
          <div className="flex flex-col r">
            <p className="text-sm text-gray-500">별점</p>
            <div className="flex gap-1">
              <span className="text-xl font-semibold">★</span>
              <span className="text-xl font-semibold">★</span>
              <span className="text-xl font-semibold">★</span>
              <span className="text-xl font-semibold">★</span>
              <span className="text-xl font-semibold">☆</span>
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
