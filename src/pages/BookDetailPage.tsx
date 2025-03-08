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
  const [books, setBooks] = useState<Book[]>([]); // 모든 책 데이터 상태
  const [book, setBook] = useState<Book | null>(null); // 선택한 책의 세부 정보 상태
  const { isbn } = useParams(); // URL에서 isbn 가져오기
  const navigate = useNavigate();

  // 모든 책 데이터를 한번에 불러오기
  useEffect(() => {
    fetch('http://localhost:5000/books')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data.items); // 모든 책 정보를 상태에 저장
      })
      .catch((error) => {
        console.error('Error loading books:', error);
        setBooks([]); // 데이터 로드 실패 시 빈 배열로 설정
      });
  }, []);

  // 책의 세부 정보를 isbn에 맞게 필터링하여 설정
  useEffect(() => {
    if (isbn) {
      const selectedBook = books.find((book) => book.isbn === isbn); // isbn에 맞는 책 찾기
      setBook(selectedBook || null); // 선택된 책 정보 설정
    }
  }, [isbn, books]); // isbn이나 books가 변경될 때마다 실행

  // 로딩 상태 처리
  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <section className="section-wrap">
      <div className="pt-6 flex flex-col gap-14">
        {/* 책 상세 정보 */}
        <div className="flex flex-col items-center">
          <img
            src={book.image}
            alt={book.title}
            className="w-[300px] h-[400px] object-cover rounded-lg shadow-md mb-4"
          />
          <h2 className="text-2xl font-semibold text-center">{book.title}</h2>
          <h3 className="text-lg text-center text-gray-700">{book.author}</h3>
          <p className="text-base text-center mt-4">{book.description}</p>
          <div className="mt-6 text-center">
            <p className="text-lg font-medium">Price: {book.price}원</p>
            <p className="text-sm text-gray-500">
              Published by: {book.publisher}
            </p>
            <p className="text-sm text-gray-500">
              Published on: {book.pubDate}
            </p>
          </div>

          {/* 같은 저자의 다른 책들 */}
          {book.sameAuthor && book.sameAuthor.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-center">
                Other books by {book.author}:
              </h3>
              <ul className="mt-4">
                {book.sameAuthor.map((otherBook, index) => (
                  <li key={index} className="text-center">
                    <a
                      href="#"
                      className="text-blue-500"
                      onClick={() => navigate(`/book/${otherBook.title}`)}
                    >
                      {otherBook.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookDetailPage;
