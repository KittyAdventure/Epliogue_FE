/**
 * 마이페이지 콘텐츠 컴포넌트
 */
import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';

interface Review {
  reviewid: number;
  reviewBooktitle: string;
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
  const fetchReviews = async (memberId: string, page: number) => {
    try {
      const apiUrl = //env production 인지 development 인지 확인 후 url 할당
        import.meta.env.NODE === 'production'
          ? import.meta.env.VITE_API_URL_PROD
          : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.get(`${apiUrl}/api/mypage/reviews`, {
        params: { memberId, page }, //query parameter
        // headers 필요 (인증)
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response) {
        console.log('TabReview No Response');
      } else {
        console.log(response);
        console.log(response.data);
        console.log('Meeting Response');
        const { userNickname, totalPage, reviews = [] } = response.data; //mypage 각 가져오기
        console.log(response.data);
        setUserNickname(userNickname);
        setReviews(reviews);
        setTotalPages(Number(totalPage));
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  // useEffect needed to automatically trigger API call when 'page' state updates
  useEffect(() => {
    if (memberId) {
      fetchReviews(memberId, page);
    }
  }, [memberId, page]); //run the code when [something] changes

  return (
    <div className="mt-20">
      <h3 className="text-2xl">{userNickname} 남긴 리뷰</h3>

      <div className="flex flex-wrap gap-y-20 justify-between w-full min-h-[680px] mt-10">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.reviewid}
              className="reviewPost relative rounded-xl w-[30%] h-[300px] p-5 shadow-md hover:shadow-lg z-[10]"
            >
              <button className="reviewDelBtn absolute top-3 right-3 text-[gray] text-sm">
                삭제하기
              </button>
              <div className="reviewContainer flex items-center">
                <img
                  src={review.thumbnail}
                  alt="review book thumbnail"
                  className="block w-[50px] max-h-20 mr-5 leading-20 shadow-sm"
                />
                <div className="reviewTop">
                  <h5>{review.reviewBooktitle}</h5>
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
