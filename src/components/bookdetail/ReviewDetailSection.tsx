// ReviewDetailSection.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Review {
  name: string;
  profile: string;
  text: string;
  comment: string;
  like: string;
  booktit: string;
  bookimg: string;
  date: string;
}

function ReviewDetailSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;
  const navigate = useNavigate();

  const options = [
    { value: 'latest', label: '최신순' },
    { value: 'likes', label: '좋아요순' },
    { value: 'comments', label: '댓글 많은 순' },
  ];

  const filteredReviews = [...reviews].sort((a, b) => {
    if (filter === 'likes') return Number(b.like) - Number(a.like);
    if (filter === 'comments') return Number(b.comment) - Number(a.comment);
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage,
  );

  useEffect(() => {
    fetch('http://localhost:5000/reviews')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setReviews(data))
      .catch((error) => console.error('Error loading reviews:', error));
  }, []);

  return (
    <div className="review-section mt-28 mb-28">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">리뷰</h2>
        <div className="relative w-36 z-50">
          <button
            className="w-full border p-2 px-4 rounded-lg text-m bg-white flex justify-between items-center hover:"
            onClick={() => setIsOpen(!isOpen)}
          >
            {filter
              ? options.find((opt) => opt.value === filter)?.label
              : '필터'}
            <span>▼</span>
          </button>

          {isOpen && (
            <ul className="absolute w-full mt-1 border py-2 border-gray-300 rounded-lg bg-white shadow-md">
              {options.map((option) => (
                <li
                  key={option.value}
                  className="py-2 px-4 cursor-pointer hover:font-bold transition-all duration-300"
                  onClick={() => {
                    setFilter(option.value);
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
        {paginatedReviews.map((review, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md relative h-[300px] hover:bg-black/5 cursor-pointer transition-all duration-300"
            onClick={() => navigate(`/reviews/${review.booktit}`)} // 클릭 시 해당 리뷰 상세 페이지로 이동
          >
            <div className="flex items-center gap-2 mb-6">
              <img
                src={review.profile}
                alt="User"
                className="w-12 h-12 rounded-full"
              />
              <span className="font-semibold">{review.name}</span>
            </div>
            <p className="text-m mb-3 line-clamp-5 leading-relaxed">
              {review.text}
            </p>
            <div className="absolute bottom-5 left-6 right-6 flex justify-between text-sm text-gray-500">
              <span>댓글 {review.comment}개</span>
              <span>좋아요 {review.like}개</span>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-16">
        {Array.from(
          { length: Math.ceil(reviews.length / reviewsPerPage) },
          (_, i) => (
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
          ),
        )}
      </div>
    </div>
  );
}

export default ReviewDetailSection;
