import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookDetailSection from '../components/bookdetail/BookDetailSection';
import ReviewDetailSection from '../components/bookdetail/ReviewDetailSection';
import SameAuthorSection from '../components/bookdetail/SameAuthorSection';

interface Book {
  isbn: string;
  title: string;
  author: string;
  description: string;
  image: string;
  price: string;
  publisher: string;
  pubDate: string;
  avgRating: string;
  sameAuthor: Array<{ title: string; isbn: string }>;
}

const BookDetailPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [book, setBook] = useState<Book | null>(null);
  const { isbn } = useParams();

  useEffect(() => {
    fetch('http://localhost:5000/detail') // books/detail
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error('Error loading books:', error);
        setBooks([]);
      });
  }, []);

  useEffect(() => {
    if (isbn && books.length > 0) {
      const selectedBook = books.find((b) => b.isbn === isbn);
      setBook(selectedBook || null);
    }
  }, [isbn, books]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <section className="section-wrap">
      <BookDetailSection book={book} />

      {/* 같은 작가 */}
      <SameAuthorSection sameAuthor={book.sameAuthor} />

      {/* 리뷰 영역 */}
      <ReviewDetailSection />
    </section>
  );
};

export default BookDetailPage;
