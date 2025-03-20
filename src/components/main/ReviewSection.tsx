import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
interface Review {
  nickname: string; // :white_check_mark: 백엔드: nickname
  profile: string; // :white_check_mark: 백엔드: memberProfileImage
  text: string; // :white_check_mark: 백엔드: content
  comment: number; // :white_check_mark: 백엔드: commentsCount
  likeCount: number; // :white_check_mark: 백엔드: likeCount
  booktit: string; // :white_check_mark: 백엔드: bookTitle
  bookimg: string; // :white_check_mark: 백엔드: imageUrls[0] (첫 번째 이미지)
}
const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL_DEV}/reviews/latest?page=1&size=2`)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorText) => {
            throw new Error(`🚨 API 요청 실패: ${errorText}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        // console.log('✅ 서버 응답 데이터:', data); // 🔍 여기서 확인!

        if (!data || !data.content) {
          // console.error("❌ 'content'가 응답에 없음:", data);
          setReviews([]);
          return;
        }

        const formattedReviews = data.content.map((review: any) => ({
          nickname: review.nickname ?? '익명',
          profile: review.memberProfileImage ?? '/default-profile.png',
          text: review.content ?? '내용 없음',
          comment: review.commentsCount ?? 0,
          likeCount: review.likeCount ?? 0,
          booktit: review.bookTitle ?? '제목 없음',
          bookimg:
            review.imageUrls?.length > 0
              ? review.imageUrls[0]
              : '/default-book.png',
        }));

        // console.log('🛠 변환된 리뷰 데이터:', formattedReviews); // 🔍 데이터 변환 확인
        setReviews(formattedReviews);
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
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };
  if (reviews.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="section-wrap overflow-hidden mt-[100px] mb-[150px] review-section">
      <div>
        <h2 className="text-4xl font-bold mb-11">최신순 리뷰</h2>
      </div>
      <div>
        <Slider {...settings}>
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="w-full bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between hover:shadow-2xl hover:bg-gray-100 transition-all duration-300"
            >
              {/* 유저 정보 */}
              <div className="flex justify-between items-center mb-2">
                <div className="user flex items-center gap-2">
                  <img
                    src={review.profile} // :white_check_mark: `profile` 변경
                    alt={review.nickname}
                    className="w-11 h-11 rounded-full"
                  />
                  <div className="font-bold truncate">{review.nickname}</div>
                </div>
              </div>
              {/* 리뷰 내용 */}
              <div className="flex w-full gap-4 flex-1 overflow-hidden">
                <img
                  src={review.bookimg} // :white_check_mark: `bookimg` 변경
                  alt={review.booktit}
                  className="w-1/4 aspect-[2/3] object-cover rounded-lg"
                />
                <div className="w-3/4 flex flex-col justify-between">
                  {/* 제목 */}
                  <div className="font-bold text-base line-clamp-1">
                    {review.booktit} {/* :white_check_mark: `booktit` 변경 */}
                  </div>
                  {/* 텍스트 (고정 높이 적용) */}
                  <div className="text-sm overflow-hidden line-clamp-4 min-h-[80px] h-[80px]">
                    {review.text} {/* :white_check_mark: `text` 변경 */}
                  </div>
                </div>
              </div>
              {/* 하단 댓글 & 좋아요 (항상 일정한 위치 유지) */}
              <div className="flex justify-between items-center mt-4">
                <div>댓글 ({review.comment})</div>{' '}
                {/* :white_check_mark: `comment` 변경 */}
                <div>
                  <i className="far fa-thumbs-up mr-1"></i>좋아요 (
                  {review.likeCount}){' '}
                  {/* :white_check_mark: `likeCount` 변경 */}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
export default ReviewSection;
