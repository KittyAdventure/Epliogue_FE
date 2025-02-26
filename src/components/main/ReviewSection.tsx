import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface Review {
  name: string;
  profile: string;
  text: string;
  comment: string;
  like: string;
  booktit: string;
  bookimg: string;
}

const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/reviews')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setReviews(data)) // 🔥 reviews 상태 업데이트
      .catch((error) => console.error('Error loading reviews:', error));
  }, []);

  const settings = {
    dots: true,
    infinite: false, // 무한 반복 제거
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    adaptiveHeight: true,
  };

  if (reviews.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="section-wrap overflow-hidden">
      <div>
        <h2 className="text-4xl font-bold mb-11 text-center">리뷰</h2>
      </div>

      <div>
        <Slider {...settings}>
          {reviews.map((review) => (
            <div className="w-full aspect-[3/2] bg-white rounded-2xl shadow-lg p-4 mb-5 flex flex-col justify-between">
              {/* user */}
              <div className="flex justify-between items-center mb-2">
                <div className="user flex items-center gap-2">
                  <img
                    src={review.profile}
                    alt={`${review.booktit} 리뷰`}
                    className="w-11 h-11 rounded-full"
                  />
                  <div className="mr-8 font-bold">{review.name}</div>
                </div>
                <div className="bg-black text-white rounded-lg px-6 py-1.5 text-sm">
                  팔로잉
                </div>
              </div>

              {/* review */}
              <div className="flex w-full gap-4 py-3">
                <img
                  src={review.bookimg}
                  alt={review.booktit}
                  className="w-1/4 h-full object-cover"
                />
                <div className="w-2/3 flex flex-col gap-3">
                  <div className="font-bold text-base line-clamp-1">
                    {review.booktit}
                  </div>
                  <div className="text-sm line-clamp-3 overflow-hidden">
                    {review.text}
                  </div>
                </div>
              </div>

              {/* footer */}
              <div className="flex justify-between items-center">
                <div>댓글 ({review.comment})</div>
                <div>
                  <i className="far fa-thumbs-up mr-1"></i>좋아요 ({review.like}
                  )
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
