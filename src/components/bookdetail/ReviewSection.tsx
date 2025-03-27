import axios from 'axios';
import { MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LikeButton from '../button/LikeButton';
interface Review {
  id: number;
  content: string;
  nickname: string;
  memberId: number;
  memberProfileImage: string;
  likeCount: number;
  commentsCount: number;
  bookTitle: string;
  createdAt: string;
  imageUrls: string[];
  liked: boolean;
}

interface ReviewSectionProps {
  bookId: string; // bookId를 props로 받음
}

function ReviewSection({ bookId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sortType, setSortType] = useState('latest'); // 기본값: 좋아요순
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const reviewsPerPage = 6; // API 요청에 맞게 설정
  const navigate = useNavigate();
  // console.log('bookId: ', bookId); // bookId 확인

  const options = [
    { value: 'latest', label: '최신순' },
    { value: 'likes', label: '좋아요순' },
  ];

  // 리뷰 목록을 가져오는 useEffect
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_DEV}/api/books/${bookId}/reviews`,
          {
            params: {
              page: currentPage,
              size: reviewsPerPage,
              sortType: sortType,
            },
          },
        );

        console.log('API 응답 데이터:', response.data); // 응답 데이터 확인
        console.log('총 페이지 수:', response.data.totalPages); // totalPages 확인

        setReviews(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error loading reviews:', error);
      }
    };

    fetchReviews();
  }, [currentPage, sortType, bookId]);

  // 좋아요 상태 변경 함수
  const handleLikeToggle = (reviewId: number, currentLiked: boolean) => {
    // 상태 변경 로직을 작성 (예: API 요청 후 상태 업데이트)
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              liked: !currentLiked,
              likeCount: currentLiked
                ? review.likeCount - 1
                : review.likeCount + 1,
            }
          : review,
      ),
    );
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="review-section mt-28 mb-28">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">리뷰</h2>
        <div className="relative w-36 z-50">
          <button
            className="w-full border p-2 px-4 rounded-lg text-m bg-white flex justify-between items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            {options.find((opt) => opt.value === sortType)?.label || '정렬'}
            <span>▼</span>
          </button>

          {isOpen && (
            <ul className="absolute w-full mt-1 border py-2 border-gray-300 rounded-lg bg-white shadow-md">
              {options.map((option) => (
                <li
                  key={option.value}
                  className="py-2 px-4 cursor-pointer hover:font-bold transition-all duration-300"
                  onClick={() => {
                    setSortType(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="review-box grid grid-cols-3 gap-20 mt-10">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md relative h-[360px] hover:bg-black/5 cursor-pointer transition-all duration-300"
            onClick={() => {
              window.scrollTo(0, 0); // 페이지 상단으로 스크롤
              navigate(`/reviews/${review.id}`); // 해당 리뷰 페이지로 이동
            }}
          >
            <div className="flex items-center gap-2 mb-6">
              <img
                src={review.memberProfileImage || '/img/members/user.png'}
                alt="User"
                className="w-12 h-12 rounded-full"
              />
              <span className="font-semibold">{review.nickname}</span>
            </div>

            <div className="mb-3">
              <div className="grid grid-cols-5 gap-2">
                {(review.imageUrls || []).slice(0, 5).map((image, idx) => (
                  <div key={idx} className="relative w-full">
                    <img
                      src={image}
                      alt={`review-image-${idx}`}
                      className="w-full h-full object-cover rounded-lg aspect-square"
                    />
                  </div>
                ))}
              </div>
            </div>

            <p className="text-m mb-3 line-clamp-5 leading-relaxed">
              {review.content}
            </p>

            <div className="absolute bottom-5 left-6 right-6 flex justify-between text-base">
              <span className="flex items-center gap-1">
                <MessageSquare className="w-5 h-5 text-gray-600" />{' '}
                <span className="text-base text-gray-500 -mt-1">
                  {review.commentsCount}
                </span>
              </span>
              {/* 좋아요 버튼 */}
              <LikeButton
                reviewId={review.id}
                likeCount={review.likeCount}
                liked={review.liked}
                onClick={(e) => {
                  e.stopPropagation(); // 클릭 이벤트 전파 방지
                  handleLikeToggle(review.id, review.liked);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-4 py-2 rounded-full ${
              currentPage === index + 1
                ? 'bg-gray-200 text-black'
                : 'bg-white text-black'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ReviewSection;
