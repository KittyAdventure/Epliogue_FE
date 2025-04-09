/**
 * 마이페이지 콘텐츠 컴포넌트
 */
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../utility/AuthUtils';
import Pagination from './Pagination';

interface Review {
  reviewId: string;
  reviewBookTitle: string;
  reviewBookPubYear: string;
  reviewBookAuthor: string;
  reviewContent: string;
  reviewCommentsCount: string;
  thumbnail: string;
}

const TabReview = (): React.JSX.Element => {
  const [page, setPage] = useState<number>(1); //pagination
  const [reviews, setReviews] = useState<Review[]>([]); //intial empty Review[]
  const [totalPages, setTotalPages] = useState<number>(1); //pagination total page #
  const [userNickname, setUserNickname] = useState<string>('');

  const accessToken = localStorage.getItem('accesstoken');
  const memberId = localStorage.getItem('memberId');

  const fetchReviews = useCallback(async () => {
    if (!memberId) return;
    try {
      // import apiUrl
      const response = await axios.get(`${apiUrl}/api/mypage/reviews`, {
        params: { memberId, page },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response?.data) {
        console.log("TabReview Resp", response)
        const { reviews, totalPages, userNickname } = response.data;
        setReviews(reviews);
        setTotalPages(totalPages);
        setUserNickname(userNickname);
      }
    } catch (error) {
      console.error('TabReview Fetch Error:', error);
    }
  }, [accessToken, memberId, page]);
  // useEffect needed to automatically trigger API call when 'page' state updates
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]); //run the code when [something] changes

  const handleReviewDelete = async (reviewId: string) => {
    if (!reviewId) {
      console.error('invalid reviewId');
      return;
    }
    try {
      const response = await axios.delete(`${apiUrl}/api/reviews/${reviewId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response) {
        console.log('TabReview - Deleted', response);
        alert('리뷰를 삭제했습니다');
        // page > 1 이상일 경우 + 페이지에 리뷰가 하나있고 삭제했을때, 이전 페이지 보여줌
        if (reviews.length === 1 && page > 1){
          setPage((prevPage) => prevPage - 1) //page의 최신 값을 가져옴
        }else {
          fetchReviews(); //삭제 후 탭 리뷰를 업데이트 해줌
        }
      } else {
        console.log('TabReview Del Resp Error', response);
      }
    } catch (error) {
      console.error('TabReview Del Catch Error', error);
      alert("삭제 중 오류 발생")
    }
  };

  return (
    <div className="mt-20">
      <h3 className="text-2xl font-semibold">{userNickname}의 리뷰</h3>

      <div className=" grid grid-cols-3 gap-y-20 gap-x-10 justify-between w-full min-h-[680px] mt-10">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.reviewId}
              className="reviewPost relative rounded-xl w-[100%] h-[320px] px-5 py-10 shadow-md hover:shadow-lg z-[10]"
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
                  className="block w-16 h-24 mr-5 leading-20 shadow-sm object-cover"
                />

                <Link
                  to={`/reviews/${review.reviewId}`}
                  className="reviewTop"
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  <h5 className="w-full h-16 text-semibold leading-5 text-ellipsis line-clamp-3">
                    {review.reviewBookTitle}
                  </h5>
                  <p className="text-[gray] mt-3">
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
              <Link
                to={`/reviews/${review.reviewId}`}
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
                className="reviewComment block mb-3 hover:underline"
              >
                댓글 ({review.reviewCommentsCount})
              </Link>
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
