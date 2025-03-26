import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookDetailSection from '../components/bookdetail/BookDetailSection';
import ReviewDetailSection from '../components/bookdetail/ReviewSection';
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
  existCollection: boolean;
  sameAuthor: Array<{ title: string; isbn: string }>;
}

interface BookDetailPageProps {
  memberId: string;
}

const BookDetailPage: React.FC<BookDetailPageProps> = ({ memberId }) => {
  const [book, setBook] = useState<Book | null>(null);
  const { isbn } = useParams();

  useEffect(() => {
    if (!isbn) return;

    // API URL 생성
    const url = `${
      import.meta.env.VITE_API_URL_DEV
    }/api/books/detail?query=${isbn}&type=d_isbn`;

    const token = localStorage.getItem('accesstoken');
    const headers: { [key: string]: string } = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    // 토큰이 있으면 Authorization 헤더 추가
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // API 호출
    fetch(url, {
      method: 'GET',
      headers,
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `❌ 서버 응답 오류: ${response.status} - ${errorText}`,
          );
        }
        return response.json();
      })
      .then((jsonData) => {
        setBook(jsonData);
      })
      .catch((error) => {
        console.error('🚨 Error loading book details:', error.message);
        setBook(null);
      });
  }, [isbn]); // isbn이 변경될 때마다 다시 실행

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
      <ReviewDetailSection bookId={book.isbn} />
    </section>
  );
};

export default BookDetailPage;
