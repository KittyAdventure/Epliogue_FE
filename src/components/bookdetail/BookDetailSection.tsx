import { useEffect, useState } from 'react';
import ReviewModal from '../modal/ReviewModal';
import ShareModal from '../modal/ShareModal';
import ChatButton from './ChatButton';
import Collection from './Collection';
import Rating from './Rating';
import Share from './Share';

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

interface BookDetailSectionProps {
  book: Book;
  memberId: string;
  bookName: string;
  bookId: string;
}

function BookDetailSection({ book, memberId }: BookDetailSectionProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedBooks, setSelectedBooks] = useState<Set<string>>(new Set());
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [shareOptions, setShareOptions] = useState<{
    shareUrl: string;
    kakaoShareUrl: string;
  } | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // 컬렉션
    const fetchCollection = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL_DEV}/collection`,
        );

        if (!response.ok)
          throw new Error('컬렉션 정보를 가져오는 데 실패했습니다.');

        const data = await response.json();
        const bookIds: Set<string> = new Set(
          data.map((item: { bookId: number }) => item.bookId),
        );
        setSelectedBooks(bookIds);
      } catch (error) {
        console.error('컬렉션 로딩 오류:', error);
      }
    };

    // 별점
    const fetchRating = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL_DEV}/books/${book.isbn}/ratings`,
        );
        if (!response.ok)
          throw new Error('별점 정보를 가져오는 데 실패했습니다.');

        const data = await response.json();
        if (data && data.score) {
          setRating(data.score);
        }
      } catch (error) {
        console.error('별점 정보 로딩 오류:', error);
      }
    };

    fetchCollection();
    fetchRating();
  }, [book.isbn]);

  // 공유
  const handleShareClick = (shareData: {
    shareUrl: string;
    kakaoShareUrl: string;
  }) => {
    setShareOptions(shareData);
    setShareModalOpen(true);
  };

  const handleRatingClick = async (index: number) => {
    const newRating = index + 1;

    if (rating === newRating) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL_DEV}/books/${book.isbn}/ratings`,
          {
            method: 'DELETE',
          },
        );

        if (response.status === 404) {
          throw new Error('해당 책에 대한 별점이 존재하지 않습니다.');
        }
        // 삭제 후 상태 초기화
        setRating(0);
        console.log('별점 삭제 성공');
      } catch (error) {
        console.error('별점 삭제 오류:', error);
      }
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL_DEV}/books/${book.isbn}/ratings`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ score: newRating }),
          },
        );

        if (!response.ok) throw new Error('별점 등록 실패');

        const data = await response.json();
        console.log('별점 등록 성공:', data);
        setRating(newRating);
      } catch (error) {
        console.error('별점 등록 오류:', error);
      }
    }
  };

  const handleMouseEnter = (index: number) => setHoverRating(index + 1);
  const handleMouseLeave = () => setHoverRating(0);

  return (
    <div className="pt-6 flex gap-14">
      <div className="w-1/3 relative">
        <Collection
          bookIsbn={book.isbn}
          bookTitle={book.title}
          bookImage={book.image}
          selectedBooks={selectedBooks}
          setSelectedBooks={setSelectedBooks}
        />
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="w-2/3 flex flex-col justify-center gap-2">
        <div className="flex items-center">
          <span className="text-m font-semibold">★ 평균 {book.avgRating}</span>
        </div>
        <div className="flex items-center mb-3">
          <h2 className="text-3xl font-bold">{book.title}</h2>
          <h3 className="text-lg text-gray-700 mx-4">|</h3>
          <h3 className="text-lg text-gray-700">{book.author}</h3>
          <Share bookIsbn={book.isbn} onShareClick={handleShareClick} />
        </div>
        <p className="text-lg">{book.description}</p>
        <div className="flex flex-col gap-4 text-base text-gray-900 mt-3">
          <p>출판일 : {book.pubDate}</p>
          <p>출판사 : {book.publisher}</p>
          <p>가격 : {book.price}원</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-base text-gray-600 mb-3">별점</p>
          <Rating
            rating={rating}
            hoverRating={hoverRating}
            onRatingClick={handleRatingClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </div>

        <div className="flex gap-8 mt-4">
          <button
            className="bg-black hover:bg-black/70 text-white font-bold py-3 px-7 rounded-lg shadow-lg"
            onClick={() => setReviewModalOpen(true)}
          >
            리뷰하기
          </button>
          <ChatButton
            memberId={memberId}
            bookName={book.title}
            bookId={book.isbn}
          />
          <button className="bg-white hover:bg-black/10 text-black font-bold py-3 px-7 rounded-lg shadow-lg">
            모임하기
          </button>
        </div>
      </div>

      {/* 리뷰 모달창 */}
      {reviewModalOpen && (
        <ReviewModal
          setReviewModalOpen={setReviewModalOpen}
          bookId={book.isbn}
        />
      )}
      {/* 공유 모달창 */}
      {shareModalOpen && shareOptions && (
        <ShareModal
          shareOptions={shareOptions}
          setShareModalOpen={setShareModalOpen}
        />
      )}
    </div>
  );
}

export default BookDetailSection;
