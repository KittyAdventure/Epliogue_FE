import { useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ReviewModal from '../modal/ReviewModal';
import ShareModal from '../modal/ShareModal';

interface Book {
  title: string;
  author: string;
  description: string;
  image: string;
  price: string;
  publisher: string;
  pubDate: string;
  isbn: string;
}

interface ShareOption {
  shareUrl: string;
  kakaoShareUrl: string;
}

interface BookDetailSectionProps {
  book: Book;
}

function BookDetailSection({ book }: BookDetailSectionProps) {
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedBooks, setSelectedBooks] = useState<Set<string>>(new Set());
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [shareOptions, setShareOptions] = useState<ShareOption | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false);

  const toggleBookmark = (isbn: string) => {
    setSelectedBooks((prev) => {
      const newSet = new Set(prev);
      newSet.has(isbn) ? newSet.delete(isbn) : newSet.add(isbn);
      return newSet;
    });
  };

  const handleRatingClick = (index: number) => setRating(index + 1);
  const handleMouseEnter = (index: number) => setHoverRating(index + 1);
  const handleMouseLeave = () => setHoverRating(0);

  const handleShareClick = () => {
    const shareData = {
      shareUrl: `https://localhost:5000/book/${book.isbn}`,
      kakaoShareUrl: `https://localhost:5000/book/${book.isbn}?kakao=true`,
    };
    setShareOptions(shareData);
    setShareModalOpen(true);
  };

  return (
    <div className="pt-6 flex gap-14">
      <div className="w-1/3 relative">
        <div
          className={`absolute top-0 right-2 cursor-pointer ${
            selectedBooks.has(book.isbn) ? 'text-green-500' : 'text-black/90'
          }`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(book.isbn);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-12"
            style={{
              filter: 'drop-shadow(0.5px 2px 3px rgba(255, 255, 255, 0.5))',
            }}
          >
            <path d="M6 2a2 2 0 00-2 2v18l8-5 8 5V4a2 2 0 00-2-2H6z" />
          </svg>
        </div>
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="w-2/3 flex flex-col justify-center gap-2">
        <div className="flex items-center">
          <span className="text-m font-semibold">★ 평균 4.5</span>
          <span className="text-xs text-gray-500 ml-1">(2.3만명)</span>
        </div>
        <div className="flex items-center mb-3">
          <h2 className="text-3xl font-bold">{book.title}</h2>
          <h3 className="text-lg text-gray-700 mx-4">|</h3>
          <h3 className="text-lg text-gray-700">{book.author}</h3>
          <FaShareAlt
            className="ml-2 cursor-pointer mt-[2px]"
            onClick={handleShareClick}
          />
        </div>
        <p className="text-lg">{book.description}</p>
        <div className="flex flex-col gap-4 text-base text-gray-900 mt-3">
          <p>출판일 : {book.pubDate}</p>
          <p>출판사 : {book.publisher}</p>
          <p>가격 : {book.price}원</p>
        </div>

        <div className="flex gap-8 mt-4">
          <button
            className="bg-black hover:bg-black/70 text-white font-bold py-3 px-7 rounded-lg shadow-lg"
            onClick={() => setReviewModalOpen(true)}
          >
            리뷰하기
          </button>
          <button
            className="bg-white hover:bg-black/10 text-black font-bold py-3 px-7 rounded-lg shadow-lg"
            onClick={() => navigate('/ChatPage')}
          >
            채팅하기
          </button>
          <button className="bg-white hover:bg-black/10 text-black font-bold py-3 px-7 rounded-lg shadow-lg">
            모임하기
          </button>
        </div>
      </div>
      {/* 리뷰 모달창 */}
      {reviewModalOpen && (
        <ReviewModal setReviewModalOpen={setReviewModalOpen} />
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
