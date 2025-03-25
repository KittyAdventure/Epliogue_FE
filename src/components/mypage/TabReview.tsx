/**
 * 마이페이지 콘텐츠 컴포넌트
 */
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import Pagination from './Pagination';

interface Review {
  reviewId: number;
  reviewBookTitle: string;
  reviewBookPubYear: number;
  reviewBookAuthor: string;
  reviewContent: string;
  reviewCommentsCount: number;
  thumbnail: string;
}

const TabReview = (): React.JSX.Element => {
  const [page, setPage] = useState<number>(1); //pagination
  const [reviews, setReviews] = useState<Review[]>([]); //intial empty Review[]
  const [totalPages, setTotalPages] = useState<number>(1); //pagination total page #
  const [userNickname, setUserNickname] = useState<string>('');

  const accessToken = localStorage.getItem('accesstoken');
  const memberId = localStorage.getItem('memberId');

  const fetchReviews = useCallback(async (memberId: string, page: number) => {
    try {
      const apiUrl = //env production 인지 development 인지 확인 후 url 할당
        import.meta.env.NODE === 'production'
          ? import.meta.env.VITE_API_URL_PROD
          : import.meta.env.VITE_API_URL_DEV;
          console.log(`${apiUrl}/api/mypage/reviews`)
      const response = await axios.get(
        `${apiUrl}/api/mypage/reviews`,
        {
          params: { memberId, page },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (!response) {
        console.log('TabReview No Response');
      } else {
        console.log('Review Response');
        console.log(response);
        const {reviews, totalPages, userNickname} = response.data
        setReviews(reviews);
        setUserNickname(userNickname);
        setTotalPages(totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  },[accessToken]);

  // useEffect needed to automatically trigger API call when 'page' state updates
  useEffect(() => {
    if (memberId) {
      fetchReviews(memberId, page);
    }
  }, [memberId, page, fetchReviews]); //run the code when [something] changes

  return (
    <div className="mt-20">
      <h3 className="text-2xl">{userNickname} 님이 남긴 리뷰</h3>

      <div className="flex flex-wrap gap-y-20 justify-between w-full min-h-[680px] mt-10">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.reviewId}
              className="reviewPost relative rounded-xl w-[30%] h-[300px] px-5 py-10 shadow-md hover:shadow-lg z-[10]"
            >
              <button className="reviewDelBtn absolute top-3 right-5 text-[gray] text-sm">
                삭제하기
              </button>
              <div className="reviewContainer flex items-center">
                <img
                  src={review.thumbnail}
                  alt="review book thumbnail"
                  className="block w-[65px] h-[100px] mr-5 leading-20 shadow-sm"
                />
                <div className="reviewTop">
                  <h5 className='h-[80px]'>{review.reviewBookTitle}</h5>
                  <p className="text-[gray]">
                    <span className="mr-1">{review.reviewBookPubYear}</span> |
                    <span className="ml-1">{review.reviewBookAuthor}</span>
                  </p>
                </div>
              </div>
              <p className="mt-5 leading-5 h-[120px] line-clamp-6">
                {review.reviewContent}
              </p>
              <button className="reviewCommentCnt block mt-5">
                댓글 ({review.reviewCommentsCount})
              </button>
            </div>
          ))
        ) : (
          <p>나만의 리뷰를 남겨보세요</p>
        )}
      </div>

      {reviews.length > 0 ? (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      ) : (
        null
      )}
    </div>
  );
};
export default TabReview;
