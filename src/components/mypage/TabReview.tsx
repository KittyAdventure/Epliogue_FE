/**
 * 마이페이지 용 컴포넌트
 */
import axios from 'axios';
import { useEffect, useState } from 'react';
// @db.json nickname = userNickname
interface Review {
  reviewid: number;
  reviewBooktitle: string;
  reviewBookPubYear: number;
  reviewBookAuthor: string;
  reviewContent: string;
  reviewCommentsCount: number;
  thumbnail: string;
}
// 임시 review data
// const reviews: Review[] = [
//   {
//     reviewid: 1,
//     reviewBooktitle: '여우와 함께 춤을',
//     reviewBookPubYear: 2022,
//     reviewBookAuthor: '비우산',
//     reviewContent:
//       'Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
//     reviewCommentsCount: 23,
//     thumbnail:
//       'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
//   },
//   {
//     reviewid: 2,
//     reviewBooktitle: '여우와 함께 춤을',
//     reviewBookPubYear: 2022,
//     reviewBookAuthor: '비우산',
//     reviewContent:
//       'Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
//     reviewCommentsCount: 23,
//     thumbnail:
//       'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
//   },
//   {
//     reviewid: 3,
//     reviewBooktitle: '여우와 함께 춤을',
//     reviewBookPubYear: 2022,
//     reviewBookAuthor: '비우산',
//     reviewContent:
//       'Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
//     reviewCommentsCount: 23,
//     thumbnail:
//       'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
//   },
//   {
//     reviewid: 4,
//     reviewBooktitle: '여우와 함께 춤을',
//     reviewBookPubYear: 2022,
//     reviewBookAuthor: '비우산',
//     reviewContent:
//       'Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
//     reviewCommentsCount: 23,
//     thumbnail:
//       'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
//   },
//   {
//     reviewid: 5,
//     reviewBooktitle: '여우와 함께 춤을',
//     reviewBookPubYear: 2022,
//     reviewBookAuthor: '비우산',
//     reviewContent:
//       'Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
//     reviewCommentsCount: 23,
//     thumbnail:
//       'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
//   },
//   {
//     reviewid: 6,
//     reviewBooktitle: '여우와 함께 춤을',
//     reviewBookPubYear: 2022,
//     reviewBookAuthor: '비우산',
//     reviewContent:
//       'Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
//     reviewCommentsCount: 23,
//     thumbnail:
//       'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
//   },
//   {
//     reviewid: 7,
//     reviewBooktitle: '여우와 함께 춤을',
//     reviewBookPubYear: 2022,
//     reviewBookAuthor: '비우산',
//     reviewContent:
//       'Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
//     reviewCommentsCount: 23,
//     thumbnail:
//       'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
//   },
//   {
//     reviewid: 8,
//     reviewBooktitle: '여우와 함께 춤을',
//     reviewBookPubYear: 2022,
//     reviewBookAuthor: '비우산',
//     reviewContent:
//       'Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
//     reviewCommentsCount: 23,
//     thumbnail:
//       'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
//   },
//   {
//     reviewid: 9,
//     reviewBooktitle: '여우와 함께 춤을',
//     reviewBookPubYear: 2022,
//     reviewBookAuthor: '비우산',
//     reviewContent:
//       'Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
//     reviewCommentsCount: 23,
//     thumbnail:
//       'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
//   },
//   {
//     reviewid: 10,
//     reviewBooktitle: '여우와 함께 춤을',
//     reviewBookPubYear: 2022,
//     reviewBookAuthor: '비우산',
//     reviewContent:
//       'Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
//     reviewCommentsCount: 23,
//     thumbnail:
//       'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
//   },
//   {
//     reviewid: 11,
//     reviewBooktitle: '여우와 함께 춤을',
//     reviewBookPubYear: 2022,
//     reviewBookAuthor: '비우산',
//     reviewContent:
//       'Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
//     reviewCommentsCount: 23,
//     thumbnail:
//       'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
//   },
//   {
//     reviewid: 12,
//     reviewBooktitle: '여우와 함께 춤을',
//     reviewBookPubYear: 2022,
//     reviewBookAuthor: '비우산',
//     reviewContent:
//       'Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
//     reviewCommentsCount: 23,
//     thumbnail:
//       'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
//   },
// ];

const TabReview = (): React.JSX.Element => {
  const [reviews, setReviews] = useState<Review[]>([]); //intial empty Review[]
  const [page, setPage] = useState<number>(1); //pagination
  const [totalPages, setTotalPages] = useState<number>(1); //pagination total page #

  const fetchReviews = async (page: number) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/mypage',
        // `http://localhost:5000/mypage/reviews?_page=${page}&_limit=${pageLimit}` access reviews directly
      );
      const allReviews = response.data.reviews

      const pageLimit = 6; //reviews per page
      const start = (page - 1) * pageLimit
      const paginatedReviews = allReviews.slice(start, start+pageLimit)

      setReviews(paginatedReviews);
      setTotalPages(Math.ceil(allReviews.length / pageLimit));
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  // useEffect needed to automatically trigger API call when 'page' state updates
  useEffect(() => {
    fetchReviews(page); //fetchReviews is called
  }, [page]); //run the code inside useffect when 'page' changes
  // #pagination
  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1); //cant go below 1 (refactorable), setPage to new value
  };
  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1); //cant go above last page
  };

  return (
    <div className="">
      <h3 className="text-2xl">내가 남긴 리뷰</h3>

      <div className="flex flex-wrap gap-y-20 justify-between w-full min-h-[680px] mt-10">
        {reviews.map((review) => (
          <div
            id="reviewPost"
            key={review.reviewid}
            className="relative rounded-xl w-[30%] h-[300px] p-5 shadow-md hover:shadow-lg z-[10]"
          >
            <button
              id="reviewDel"
              className="absolute top-3 right-3 text-[gray] text-sm"
            >
              삭제하기
            </button>
            <div id="reviewContainer" className="flex items-center">
              <img
                src={review.thumbnail}
                alt="review book thumbnail"
                className="block w-[50px] max-h-20 mr-5 leading-20 shadow-sm"
              />
              <div id="reviewTop">
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
            <button id="reviewComment" className="block mt-5">
              댓글 ({review.reviewCommentsCount})
            </button>
          </div>
        ))}
      </div>

      <div
        id="pagination"
        className="flex justify-center my-[120px] text-center text-2xl"
      >
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`fas fa-chevron-left w-[50px] h-[50px] mr-5 
            ${page === 1 ? 'text-[gray]' : ''}`}
        ></button>
        <div className="">
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`px-5 py-1
                  ${pageNumber === page ? 'text-[black]' : 'text-[gray]'}`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className={`fas fa-chevron-right w-[50px] h-[50px] ml-5
            ${page === totalPages ? 'text-[gray]' : ''}`}
        ></button>
      </div>
    </div>
  );
};
export default TabReview;
