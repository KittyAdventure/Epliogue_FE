import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookDetailSection from '../components/bookdetail/BookDetailSection';
import ReviewDetailSection from '../components/bookdetail/ReviewDetailSection';
import SameAuthorSection from '../components/bookdetail/SameAuthorSection';

// Book 인터페이스 정의
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

interface BookDetailPageProps {
  memberId: string;
}

const BookDetailPage: React.FC<BookDetailPageProps> = ({ memberId }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [book, setBook] = useState<Book | null>(null);
  const { isbn } = useParams();
  // const data = {
  //   query: isbn,
  //   type:"d_isbn"
  // }
  useEffect(() => {
    if (!isbn) return;

    const url = `${
      import.meta.env.VITE_API_URL_DEV
    }/books/detail?query=${isbn}&type=d_isbn`;
    console.log('📌 요청 URL 확인:', url);

    fetch(url, {
      method: 'GET', // ✅ GET 요청으로 변경
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // body:JSON.stringify(data)
    })
      .then(async (response) => {
        console.log('🔄 응답 상태 코드:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `❌ 서버 응답 오류: ${response.status} - ${errorText}`,
          );
        }

        return response.json();
      })
      .then((jsonData) => {
        console.log('✅ 서버 응답 데이터:', jsonData);
        setBook(jsonData);
      })
      .catch((error) => {
        console.error('🚨 Error loading book details:', error.message);
        setBook(null);
      });
  }, [isbn]);

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
      {/* BookDetailSection */}
      <BookDetailSection
        book={book}
        memberId={memberId}
        bookName={book.title}
        bookId={book.isbn}
      />

      {/* 같은 작가 */}
      <SameAuthorSection sameAuthor={book.sameAuthor} />

      {/* 리뷰 영역 */}
      <ReviewDetailSection />
    </section>
  );
};

export default BookDetailPage;
