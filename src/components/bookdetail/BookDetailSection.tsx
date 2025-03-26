import axios from 'axios'; // axios import 추가
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utility/AuthContext';
import { redirectToLogin } from '../../utility/AuthUtils';
import GatheringModal from '../modal/GatheringModal'; // Import GatheringModal
import ReviewModal from '../modal/ReviewModal';
import ShareModal from '../modal/ShareModal';
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
  existCollection: boolean;
  sameAuthor: Array<{ title: string; isbn: string }>;
}

interface BookDetailSectionProps {
  book: Book;
  memberId: string;
  bookName: string;
  bookId: string;
}

function BookDetailSection({ book }: BookDetailSectionProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [shareOptions, setShareOptions] = useState<{
    shareUrl: string;
    kakaoShareUrl: string;
  } | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false);
  const [gatheringModalOpen, setGatheringModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { loggedIn } = authContext;

  // 별점 클릭 핸들러
  const handleRatingClick = async (index: number) => {
    const newRating = index + 1;
    if (!loggedIn) {
      redirectToLogin(navigate);
      return;
    }
    if (rating === newRating) {
      // 별점 삭제
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL_DEV}/api/books/${book.isbn}/ratings`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
            },
          },
        );

        if (response.status === 404) {
          throw new Error('해당 책에 대한 별점이 존재하지 않습니다.');
        }
        setRating(0); // 별점 초기화
        console.log('별점 삭제 성공');
      } catch (error) {
        console.error('별점 삭제 오류:', error);
      }
    } else {
      // 별점 등록
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL_DEV}/api/books/${book.isbn}/ratings`,
          { score: newRating },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
            },
          },
        );

        if (!response.data || !response.data.score) {
          throw new Error('별점 등록 실패');
        }
        setRating(newRating); // 새로운 별점 값 업데이트
        console.log('별점 등록 성공:', response.data);
      } catch (error) {
        console.error('별점 등록 오류:', error);
      }
    }
  };

  // 마우스 오버 핸들러
  const handleMouseEnter = (index: number) => setHoverRating(index + 1);
  const handleMouseLeave = () => setHoverRating(0);

  // 공유
  const handleShareClick = (shareData: {
    shareUrl: string;
    kakaoShareUrl: string;
  }) => {
    setShareOptions(shareData);
    setShareModalOpen(true);
  };

  return (
    <div className="pt-6 flex gap-14">
      <div className="w-1/3 relative">
        <Collection bookId={book.isbn} existCollection={book.existCollection} />

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
        <div className="flex flex-wrap items-center mb-3">
          <h2 className="text-3xl font-bold w-full">{book.title}</h2>
          <h3 className="text-lg text-gray-700 mr-4 mt-1">|</h3>
          <h3 className="text-lg text-gray-700 mt-1">{book.author}</h3>
          <div className="mt-1">
            <Share bookIsbn={book.isbn} onShareClick={handleShareClick} />
          </div>
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
          {/* <ChatButton
            memberId={memberId}
            bookName={book.title}
            bookId={book.isbn}
          /> */}
          <button
            className="bg-white hover:bg-black/10 text-black font-bold py-3 px-7 rounded-lg shadow-lg"
            onClick={() => setGatheringModalOpen(true)} // Open the GatheringModal
          >
            모임생성
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
          type="book" // 책 공유임을 명시
          id={book.isbn} // 책의 ISBN을 ID로 사용
          setShareModalOpen={setShareModalOpen}
          book={book}
        />
      )}

      {/* 모임 생성 모달창 */}
      {gatheringModalOpen && (
        <GatheringModal
          isOpen={gatheringModalOpen}
          closeModal={() => setGatheringModalOpen(false)} // Close the GatheringModal
        />
      )}
    </div>
  );
}

export default BookDetailSection;
