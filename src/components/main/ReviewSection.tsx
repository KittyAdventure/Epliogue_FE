import { useEffect, useRef, useState } from 'react';
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
  const reviewSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('http://localhost:5000/reviews')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => console.error('Error loading reviews:', error));
  }, []);

  useEffect(() => {
    if (reviews.length > 0 && reviewSectionRef.current) {
      setTimeout(() => {
        const slickList = reviewSectionRef.current?.querySelector(
          '.slick-list',
        ) as HTMLElement;
        if (slickList) {
          slickList.style.overflow = 'visible';
        }
      }, 100);
    }
  }, [reviews]);

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
    <div
      ref={reviewSectionRef}
      className="section-wrap overflow-hidden mb-[200px]"
    >
      <div>
        <h2 className="text-4xl font-bold mb-11">리뷰</h2>
      </div>

      <div>
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div
              key={index}
              className="w-full bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between hover:shadow-2xl hover:bg-gray-100 transition-all duration-300"
            >
              {/* 유저 정보 */}
              <div className="flex justify-between items-center mb-2">
                <div className="user flex items-center gap-2">
                  <img
                    src={review.profile}
                    alt={`${review.booktit} 리뷰`}
                    className="w-11 h-11 rounded-full"
                  />
                  <div className="font-bold truncate">{review.name}</div>
                </div>
                <button className="bg-black text-white rounded-lg w-[85px] h-[32px] text-sm truncate transition-all duration-300 hover:bg-black/10 hover:text-black">
                  팔로잉
                </button>
              </div>

              {/* 리뷰 내용 */}
              <div className="flex w-full gap-4 flex-1 overflow-hidden">
                <img
                  src={review.bookimg}
                  alt={review.booktit}
                  className="w-1/4 aspect-[2/3] object-cover rounded-lg"
                />
                <div className="w-3/4 flex flex-col justify-between">
                  <div className="font-bold text-base line-clamp-1">
                    {review.booktit}
                  </div>
                  <div className="text-sm overflow-hidden line-clamp-4 min-h-[80px] h-[80px]">
                    {review.text}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
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
