import axios from 'axios'; // axios 임포트
import { MessageSquare, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { LatestReview } from '../review/type';

const MainReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<LatestReview[]>([]);
  const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set()); // 좋아요한 리뷰 ID를 추적
  const navigate = useNavigate();

  const fakeReviews: LatestReview[] = [
    {
      id: 999,
      content: '재미있어요',
      nickname: '책읽는고양이',
      memberId: 'user123',
      memberProfileImage:
        'https://i.pinimg.com/736x/09/fa/41/09fa410e40c990bce7498f9d971838d6.jpg',
      likeCount: 42,
      commentsCount: '5',
      bookTitle: '감동적인 책',
      createdAt: '2024-03-21T12:00:00Z',
      modifiedAt: '2024-03-21T12:00:00Z',
      bookCoverUrl:
        'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788936434120.jpg',
      bookId: 123,
      imageUrls: [],
    },
    {
      id: 1000,
      content: '이 책은 정말 흥미진진해요!',
      nickname: '독서매니아',
      memberId: 'user456',
      memberProfileImage:
        'https://i.pinimg.com/736x/09/fa/41/09fa410e40c990bce7498f9d971838d6.jpg',
      likeCount: 56,
      commentsCount: '12',
      bookTitle: '미스터리의 매력',
      createdAt: '2024-03-22T15:00:00Z',
      modifiedAt: '2024-03-22T15:00:00Z',
      bookCoverUrl:
        'https://i.pinimg.com/736x/09/fa/41/09fa410e40c990bce7498f9d971838d6.jpg',
      bookId: 124,
      imageUrls: [
        'https://i.pinimg.com/736x/09/fa/41/09fa410e40c990bce7498f9d971838d6.jpg',
      ],
    },
    {
      id: 1001,
      content: '문학의 깊이를 느낄 수 있었습니다.',
      nickname: '책벌레',
      memberId: 'user789',
      memberProfileImage:
        'https://i.pinimg.com/736x/09/fa/41/09fa410e40c990bce7498f9d971838d6.jpg',
      likeCount: 34,
      commentsCount: '8',
      bookTitle: '철학과 문학',
      createdAt: '2024-03-23T18:00:00Z',
      modifiedAt: '2024-03-23T18:00:00Z',
      bookCoverUrl:
        'https://i.pinimg.com/736x/09/fa/41/09fa410e40c990bce7498f9d971838d6.jpg',
      bookId: 125,
      imageUrls: [
        'https://i.pinimg.com/736x/09/fa/41/09fa410e40c990bce7498f9d971838d6.jpg',
      ],
    },
    {
      id: 1002,
      content:
        '책을 통해 삶의 진리를 배울 수 있었습니다.책을 통해 삶의 진리를 배울 수 있었습니다.책을 통해 삶의 진리를 배울 수 있었습니다.책을 통해 삶의 진리를 배울 수 있었습니다.책을 통해 삶의 진리를 배울 수 있었습니다.책을 통해 삶의 진리를 배울 수 있었습니다.',
      nickname: '지혜로운사람',
      memberId: 'user101',
      memberProfileImage:
        'https://i.pinimg.com/736x/09/fa/41/09fa410e40c990bce7498f9d971838d6.jpg',
      likeCount: 62,
      commentsCount: '9',
      bookTitle: '인생의 철학',
      createdAt: '2024-03-24T10:00:00Z',
      modifiedAt: '2024-03-24T10:00:00Z',
      bookCoverUrl:
        'https://i.pinimg.com/736x/09/fa/41/09fa410e40c990bce7498f9d971838d6.jpg',
      bookId: 126,
      imageUrls: [
        'https://i.pinimg.com/736x/09/fa/41/09fa410e40c990bce7498f9d971838d6.jpg',
      ],
    },
  ];

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL_DEV}/api/reviews/latest`, {
        params: { page: 1, size: 2 },
      })
      .then((response) => {
        const data = response.data;

        if (!data || !data.content) {
          setReviews([]);
          return;
        }

        const fetchedReviews: LatestReview[] = data.content.map(
          (review: any) => ({
            id: review.id,
            nickname: review.nickname ?? '익명',
            memberId: review.memberId,
            memberProfileImage:
              review.memberProfileImage ?? '/default-profile.png',
            bookId: review.bookId,
            bookTitle: review.bookTitle ?? '제목 없음',
            content: review.content ?? '내용 없음',
            imageUrls: review.imageUrls ?? [],
            createdAt: review.createdAt,
            modifiedAt: review.modifiedAt,
            likeCount: review.likeCount ?? 0,
            commentsCount: review.commentsCount ?? '0',
            bookCoverUrl: review.bookCoverUrl ?? '/default-book.png',
          }),
        );
        // 가짜 리뷰 데이터 추가
        // 가짜 리뷰 데이터 추가
        fetchedReviews.unshift(...fakeReviews);

        setReviews((prevReviews) => [...fakeReviews, ...prevReviews]);
      })
      .catch((error) => {
        console.error('🚨 API 요청 실패:', error);
        setReviews([]);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: true,
    adaptiveHeight: true,
  };

  if (reviews.length === 0) {
    return <div>Loading...</div>;
  }

  // 좋아요 클릭 처리 함수
  const handleLike = async (reviewId: number, currentLikeCount: number) => {
    try {
      const isLiked = likedReviews.has(reviewId);

      if (isLiked) {
        // 좋아요 취소
        await axios.delete(
          `${import.meta.env.VITE_API_URL_DEV}/api/reviews/${reviewId}/likes`,
        );
        setLikedReviews(
          new Set([...likedReviews].filter((id) => id !== reviewId)),
        );
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === reviewId
              ? { ...review, likeCount: currentLikeCount - 1 }
              : review,
          ),
        );
      } else {
        // 좋아요 추가
        await axios.post(
          `${import.meta.env.VITE_API_URL_DEV}/api/reviews/${reviewId}/likes`,
        );
        setLikedReviews(new Set(likedReviews.add(reviewId)));
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === reviewId
              ? { ...review, likeCount: currentLikeCount + 1 }
              : review,
          ),
        );
      }
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
    }
  };

  return (
    <div className="section-wrap overflow-hidden mt-[100px] mb-[150px] review-section">
      <div>
        <h2 className="text-4xl font-bold mb-11">최신순 리뷰</h2>
      </div>
      <div>
        <Slider {...settings}>
          {reviews.map((review) => (
            <div
              key={review.id}
              className="relative cursor-pointer w-full h-60 bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between hover:shadow-2xl hover:bg-gray-100 transition-all duration-300"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate(`/reviews/${review.id}`);
              }}
            >
              <div className="flex justify-between items-center mb-2">
                {/* 유저 프로필 */}
                <div className="user flex items-center gap-2">
                  <img
                    src={review.memberProfileImage}
                    alt={review.nickname}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div className="font-bold truncate">{review.nickname}</div>
                </div>
              </div>
              <div className="flex w-full gap-4 flex-1 overflow-hidden">
                {/* 책 이미지 */}
                <img
                  src={
                    review.imageUrls.length > 0
                      ? review.imageUrls[0]
                      : review.bookCoverUrl
                  }
                  alt={review.bookTitle}
                  className="w-1/4 aspect-[2/3] object-cover rounded-lg"
                />
                <div className="w-3/4 flex flex-col justify-between">
                  {/* 책 제목 및 리뷰 */}
                  <div className="font-bold text-base line-clamp-1">
                    {review.bookTitle}
                  </div>
                  <div className="text-sm overflow-hidden line-clamp-4 min-h-[80px] h-[80px]">
                    {review.content}
                  </div>
                </div>
              </div>

              {/* 하단 좋아요 댓글 */}
              <div className="absolute bottom-5 left-6 right-6 flex justify-between text-base">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-5 h-5 text-gray-600" />{' '}
                  <span className="text-base text-gray-500 -mt-1">
                    {review.commentsCount}
                  </span>
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 클릭 이벤트 전파 방지
                    handleLike(review.id, review.likeCount);
                  }}
                  className={`flex items-center gap-1 text-sm ${
                    likedReviews.has(review.id)
                      ? 'text-red-500'
                      : 'text-gray-600'
                  } hover:text-gray-800`}
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span className="text-base text-gray-500">
                    {review.likeCount}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MainReviewSection;
