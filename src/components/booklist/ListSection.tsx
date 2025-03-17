import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ListSection() {
  interface Book {
    thumbnail: string;
    bookTitle: string;
    bookId: string;
  }

  const [books, setBooks] = useState<Book[]>([]);
  const [createdAt, setCreatedAt] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/main-page')
      // http://13.125.112.89:8080/aip/books/main-page
      .then((response) => response.json())
      .then((data) => {
        if (data.books) {
          setBooks(data.books);
          const currentTime = new Date().getTime();
          setCreatedAt(new Array(data.books.length).fill(currentTime));
        }
      })
      .catch((error) => {
        console.error('Error loading books:', error);
        setBooks([]);
      });
  }, []);

  const sortByLatest = (books: Book[], createdAt: number[]) => {
    return [...books].sort(
      (a, b) => createdAt[books.indexOf(b)] - createdAt[books.indexOf(a)],
    );
  };

  const sortedBooks = sortByLatest(books, createdAt);

  if (books.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-6/7 overflow-y-auto max-h-[80vh] grid grid-cols-3 gap-12 ml-12 pr-11 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {sortedBooks.map((book) => (
        <div
          key={book.bookId}
          className="relative cursor-pointer book-card"
          onClick={() => navigate(`/book/${book.bookId}`)}
        >
          <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
            <img
              src={book.thumbnail}
              alt={book.bookTitle}
              className="absolute inset-0 w-full h-full object-conver transition-transform duration-450 ease-in-out transform hover:scale-105"
            />
          </div>
          <h2 className="text-lg font-semibold mt-3 text-center">
            {book.bookTitle}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ListSection;
