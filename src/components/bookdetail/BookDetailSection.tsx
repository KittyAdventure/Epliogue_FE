import { useState } from 'react';
import GatheringModal from '../modal/GatheringModal';
import ReviewModal from '../modal/ReviewModal';
import ShareModal from '../modal/ShareModal';
import { Book } from '../review/type'; // Book을 import
import Collection from './Collection';
import Rating from './Rating';
import Share from './Share';

interface BookDetailSectionProps {
  book: Book;
  memberId: string;
  bookName: string;
  bookId: string;
}

function BookDetailSection({ book }: BookDetailSectionProps) {
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [shareOptions, setShareOptions] = useState<{
    shareUrl: string;
    kakaoShareUrl: string;
  } | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false);
  const [gatheringModalOpen, setGatheringModalOpen] = useState<boolean>(false);

  // 공유 핸들러
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
            bookIsbn={book.isbn}
            initialRating={book.myRating ? Number(book.avgRating) : 0} // book.avgRating을 숫자로 변환
            initialMyRating={book.myRating}
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
            onClick={() => setGatheringModalOpen(true)}
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
          type="book"
          id={book.isbn}
          setShareModalOpen={setShareModalOpen}
          book={book}
        />
      )}
      {/* 모임 생성 모달창 */}
      {gatheringModalOpen && (
        <GatheringModal
          isOpen={gatheringModalOpen}
          closeModal={() => setGatheringModalOpen(false)}
        />
      )}
    </div>
  );
}

export default BookDetailSection;
