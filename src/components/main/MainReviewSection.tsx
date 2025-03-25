import axios from 'axios';
import { MessageSquare } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { AuthContext } from '../../utility/AuthContext';
import LikeButton from '../button/LikeButton';
import { LatestReview } from '../review/type';

const MainReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<LatestReview[]>([]);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    // AuthContext가 없으면 기본값을 설정하거나 다른 처리를 합니다.
    console.error('AuthContext가 제공되지 않았습니다.');
    return null; // 또는 다른 처리
  }

  // 페이지가 로드될 때마다 리뷰 데이터 가져오기
  useEffect(() => {
    // 최신 리뷰 가져오기
    axios
      .get(`${import.meta.env.VITE_API_URL_DEV}/api/reviews/latest`, {
        params: { page: 1, size: 2 },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
        },
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
              review.memberProfileImage || '/img/members/user.png',
            bookId: review.bookId,
            bookTitle: review.bookTitle ?? '제목 없음',
            content: review.content ?? '내용 없음',
            imageUrls: review.imageUrls ?? [],
            createdAt: review.createdAt,
            modifiedAt: review.modifiedAt,
            likeCount: review.likeCount ?? 0,
            commentsCount: review.commentsCount ?? '0',
            bookCoverUrl: review.bookCoverUrl ?? '/img/expected/silver.jpg',
          }),
        );

        setReviews(fetchedReviews);
      })
      .catch((error) => {
        console.error('🚨 API 요청 실패:', error);
        setReviews([]);
      });
  }, []);

  if (reviews.length === 0) {
    return <div>Loading...</div>;
  }

  // 슬라이드 설정
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: true,
    adaptiveHeight: true,
  };

  // 리뷰 클릭 시 페이지 이동
  const handleReviewClick = (reviewId: number) => {
    window.scrollTo(0, 0);
    navigate(`/reviews/${reviewId}`);
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
              onClick={() => handleReviewClick(review.id)}
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
                {/* 좋아요 버튼 */}
                <LikeButton
                  reviewId={review.id}
                  likeCount={review.likeCount}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MainReviewSection;
