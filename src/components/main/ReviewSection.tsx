import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface Review {
  nickname: string;
  profile: string;
  text: string;
  comment: number;
  likeCount: number;
  booktit: string;
  bookimg: string;
}

const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL_DEV}/reviews/latest`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setReviews(data);
        }
      })
      .catch((error) => {
        console.error('Error loading books:', error);
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
                    src={review.profile}
                    alt={review.nickname}
                    className="w-11 h-11 rounded-full"
                  />
                  <div className="font-bold truncate">{review.nickname}</div>
                </div>
              </div>

              {/* 리뷰 내용 */}
              <div className="flex w-full gap-4 flex-1 overflow-hidden">
                <img
                  src={review.bookimg}
                  alt={review.booktit}
                  className="w-1/4 aspect-[2/3] object-cover rounded-lg"
                />
                <div className="w-3/4 flex flex-col justify-between">
                  {/* 제목 */}
                  <div className="font-bold text-base line-clamp-1">
                    {review.booktit}
                  </div>
                  {/* 텍스트 (고정 높이 적용) */}
                  <div className="text-sm overflow-hidden line-clamp-4 min-h-[80px] h-[80px]">
                    {review.text}
                  </div>
                </div>
              </div>

              {/* 하단 댓글 & 좋아요 (항상 일정한 위치 유지) */}
              <div className="flex justify-between items-center mt-4">
                <div>댓글 ({review.comment})</div>
                <div>
                  <i className="far fa-thumbs-up mr-1"></i>좋아요 (
                  {review.likeCount})
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
