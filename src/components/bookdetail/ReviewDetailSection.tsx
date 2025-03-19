import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Review {
  id: number;
  content: string;
  nickname: string;
  memberId: string;
  memberProfileImage: string;
  likeCount: number;
  commentsCount: string;
  bookTitle: string;
  createdAt: string;
  imageUrls: string[];
}

function ReviewDetailSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sortType, setSortType] = useState('likes'); // 기본값: 좋아요순
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const reviewsPerPage = 6; // API 요청에 맞게 설정
  const navigate = useNavigate();
  const location = useLocation(); // ✅ state 가져오기
  const { bookId } = location.state || {}; // 기본값 처리
  console.log(`🔹'bookId:', ${bookId}`);

  const options = [
    { value: 'latest', label: '최신순' },
    { value: 'likes', label: '좋아요순' },
  ];

 useEffect(() => {
   const fetchReviews = async () => {
     try {
       const response = await axios.get(
         `${import.meta.env.VITE_API_URL_DEV}/books/${bookId}/reviews`,
         {
           params: {
             page: 1,
             size: 10,
             sortType: sortType,
           },
         },
       );

       const data = response.data;

       // 정렬 로직 추가 (API가 정렬을 지원하지 않는 경우 대비)
       let sortedReviews = data.content;

       if (sortType === 'likes') {
         sortedReviews = [...data.content].sort(
           (a, b) =>
             b.likeCount - a.likeCount ||
             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
         );
       } else if (sortType === 'latest') {
         sortedReviews = [...data.content].sort(
           (a, b) =>
             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
         );
       }

       // 페이징 적용
       const startIndex = (currentPage - 1) * reviewsPerPage;
       const paginatedReviews = sortedReviews.slice(
         startIndex,
         startIndex + reviewsPerPage,
       );

       setReviews(paginatedReviews);
       setTotalPages(data.totalPages); // API 응답에서 totalPages 설정
     } catch (error) {
       console.error('Error loading reviews:', error);
     }
   };

   fetchReviews();
 }, [currentPage, sortType]);

  return (
    <div className="review-section mt-28 mb-28">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">리뷰</h2>
        <div className="relative w-36 z-50">
          <button
            className="w-full border p-2 px-4 rounded-lg text-m bg-white flex justify-between items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            {options.find((opt) => opt.value === sortType)?.label || '정렬'}
            <span>▼</span>
          </button>

          {isOpen && (
            <ul className="absolute w-full mt-1 border py-2 border-gray-300 rounded-lg bg-white shadow-md">
              {options.map((option) => (
                <li
                  key={option.value}
                  className="py-2 px-4 cursor-pointer hover:font-bold transition-all duration-300"
                  onClick={() => {
                    setSortType(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="review-box grid grid-cols-3 md:grid-cols-2 gap-20 mt-10">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md relative h-[360px] hover:bg-black/5 cursor-pointer transition-all duration-300"
            onClick={() =>
              navigate(
                `${import.meta.env.VITE_API_URL_DEV}/reviews/${review.id}`,
              )
            } // 클릭 시 해당 리뷰 상세 페이지로 이동
          >
            <div className="flex items-center gap-2 mb-6">
              <img
                src={review.memberProfileImage}
                alt="User"
                className="w-12 h-12 rounded-full"
              />
              <span className="font-semibold">{review.nickname}</span>
            </div>

            {/* 이미지 렌더링 */}
            <div className="mb-3">
              <div className="grid grid-cols-5 gap-2">
                {(review.imageUrls || []).slice(0, 5).map((image, idx) => (
                  <div key={idx} className="relative w-full">
                    <img
                      src={image}
                      alt={`review-image-${idx}`}
                      className="w-full h-full object-cover rounded-lg aspect-square"
                    />
                  </div>
                ))}
              </div>
            </div>

            <p className="text-m mb-3 line-clamp-5 leading-relaxed">
              {review.content}
            </p>

            <div className="absolute bottom-5 left-6 right-6 flex justify-between text-sm text-gray-500">
              <span>댓글 {review.commentsCount}개</span>
              <span>좋아요 {review.likeCount}개</span>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-16">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`mx-1 px-3 py-1 mb-1 ${
              currentPage === i + 1
                ? 'text-black font-bold bg-gray-100 rounded-full'
                : ''
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ReviewDetailSection;

// useEffect(() => {
//   const fetchReviews = async () => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL_DEV}/reviews`,
//       );

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();

//       // 응답 데이터 확인: 데이터 구조가 올바른지 확인
//       console.log(data);

//       let sortedReviews = data;

//       // 정렬 로직 추가
//       if (sortType === 'likes') {
//         // 'comment' 필드를 'likeCount'처럼 사용
//         sortedReviews = [...data].sort(
//           (a, b) =>
//             b.comment - a.comment || // comment를 기준으로 정렬
//             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(), // comment가 같을 경우 createdAt으로 정렬
//         );
//       } else if (sortType === 'latest') {
//         // createdAt 필드를 기준으로 정렬
//         sortedReviews = [...data].sort(
//           (a, b) =>
//             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(), // 최신순 정렬
//         );
//       }

//       // 페이징 처리
//       const startIndex = (currentPage - 1) * reviewsPerPage;
//       const paginatedReviews = sortedReviews.slice(
//         startIndex,
//         startIndex + reviewsPerPage,
//       );

//       setReviews(paginatedReviews);
//       setTotalPages(Math.ceil(sortedReviews.length / reviewsPerPage)); // 페이지 수 계산 (API에서 받은 값 대신)
//     } catch (error) {
//       console.error('Error loading reviews:', error);
//     }
//   };

//   fetchReviews();
// }, [currentPage, sortType]);
