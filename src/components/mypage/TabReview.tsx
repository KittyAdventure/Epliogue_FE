/**
 * 마이페이지 콘텐츠 컴포넌트
 */
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const handleReviewDelete = async (reviewId: number) => {
    console.log(reviewId);
    if (!reviewId) {
      console.error('invalid reviewId');
      return;
    }
    try {
      const apiUrl = //env production 인지 development 인지 확인 후 url 할당
        import.meta.env.NODE === 'production'
          ? import.meta.env.VITE_API_URL_PROD
          : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.delete(`${apiUrl}/api/reviews/${reviewId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        console.log('TabReview Response', response);
        alert('성공적으로 리뷰를 삭제했습니다');
        if (memberId) {
          fetchReviews(memberId, page); //삭제 후 탭 리뷰를 업데이트 해줌
        }
      } else {
        console.log('Review Unexpected Error', response.status);
      }
    } catch (error) {
      console.error('Review Del Error', error);
    }
  };

  const fetchReviews = useCallback(
    async (memberId: string, page: number) => {
      try {
        const apiUrl = //env production 인지 development 인지 확인 후 url 할당
          import.meta.env.NODE === 'production'
            ? import.meta.env.VITE_API_URL_PROD
            : import.meta.env.VITE_API_URL_DEV;
        const response = await axios.get(`${apiUrl}/api/mypage/reviews`, {
          params: { memberId, page },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response) {
          console.log('TabReview No Response');
        } else {
          console.log('Review Response');
          console.log(response);
          const { reviews, totalPages, userNickname } = response.data;
          setReviews(reviews);
          setUserNickname(userNickname);
          setTotalPages(totalPages);
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    },
    [accessToken],
  );

  // useEffect needed to automatically trigger API call when 'page' state updates
  useEffect(() => {
    if (memberId) {
      fetchReviews(memberId, page);
    }
  }, [memberId, page, fetchReviews]); //run the code when [something] changes

  return (
    <div className="mt-20">
      <h3 className="text-2xl font-semibold">
        {userNickname}의 리뷰
      </h3>

      <div className="flex flex-wrap gap-y-20 justify-between w-full min-h-[680px] mt-10">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.reviewId}
              className="reviewPost relative rounded-xl w-[30%] h-[320px] px-5 py-10 shadow-md hover:shadow-lg z-[10]"
            >
              <button
                className="reviewDelBtn absolute top-3 right-5 text-[gray] text-sm"
                onClick={() => handleReviewDelete(review.reviewId)}
              >
                삭제하기
              </button>
              <div className="reviewContainer w-full flex items-center">
                <img
                  src={review.thumbnail}
                  alt="review book thumbnail"
                  className="block w-[65px] h-[100px] mr-5 leading-20 shadow-sm"
                />

                <Link
                  to={`/reviews/${review.reviewId}`}
                  className="reviewTop h-[100px]"
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  <h5 className="w-[100%] h-[60px] text-semibold leading-5 text-ellipsis line-clamp-3">
                    {review.reviewBookTitle}
                  </h5>
                  <p className="text-[gray] mt-5">
                    <span className="mr-1">{review.reviewBookAuthor}</span>|
                    <span className="ml-1">
                      {review.reviewBookPubYear
                        ? review.reviewBookPubYear
                        : 'N/A'}
                    </span>
                  </p>
                </Link>
              </div>
              <p className="mt-5 leading-5 h-[120px] line-clamp-6">
                {review.reviewContent}
              </p>
              <button className="reviewComment block mb-3 hover:underline">
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
      ) : null}
    </div>
  );
};
export default TabReview;
