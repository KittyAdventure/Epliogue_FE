import { useEffect, useState } from 'react';
import { FaLink, FaShareAlt, FaStar, FaTimes } from 'react-icons/fa';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';

interface Book {
  title: string;
  author: string;
  description: string;
  image: string;
  price: string;
  publisher: string;
  pubDate: string;
  isbn: string;
  sameAuthor: Array<{ title: string }>;
}

interface ShareOption {
  type: string;
  id: string;
  shareUrl: string;
  kakaoShareUrl: string;
}

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

const BookDetailPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [book, setBook] = useState<Book | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedBooks, setSelectedBooks] = useState<Set<string>>(new Set());
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [shareOptions, setShareOptions] = useState<ShareOption | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const { isbn } = useParams();
  const navigate = useNavigate();

  const toggleBookmark = (isbn: string) => {
    setSelectedBooks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(isbn)) {
        newSet.delete(isbn);
      } else {
        newSet.add(isbn);
      }
      return newSet;
    });
  };

  useEffect(() => {
    fetch('http://localhost:5000/books')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data.detail);
      })
      .catch((error) => {
        console.error('Error loading books:', error);
        setBooks([]);
      });
  }, []);

  useEffect(() => {
    if (isbn && books.length > 0) {
      const selectedBook = books.find((b) => b.isbn === isbn);
      setBook(selectedBook || null);
    }
  }, [isbn, books]);
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

  const handleRatingClick = (index: number) => {
    setRating(index + 1); // 별점 클릭 시 상태 변경
  };

  const handleMouseEnter = (index: number) => {
    setHoverRating(index + 1); // 마우스 오버 시 상태 변경
  };

  const handleMouseLeave = () => {
    setHoverRating(0); // 마우스가 별에서 벗어날 때 상태 초기화
  };

  const handleShareClick = (type: string, id: string) => {
    // 더미 데이터를 기반으로 공유 URL 설정
    const shareData = {
      type,
      id,
      shareUrl: `https://localhost:5000/${type}/${id}`,
      kakaoShareUrl: `https://localhost:5000/${type}/${id}?kakao=true`,
    };
    setShareOptions(shareData);
    setShareModalOpen(true); // 모달창 열기
  };

  const handleCopyLink = () => {
    if (shareOptions) {
      navigator.clipboard.writeText(shareOptions.shareUrl);
      alert('링크가 복사되었습니다!');
    }
  };

  const handleKakaoShare = () => {
    if (shareOptions) {
      window.location.href = shareOptions.kakaoShareUrl; // 카카오 링크 공유 예시
    }
  };
  const [filter, setFilter] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

  const filteredReviews = [...reviews].sort((a, b) => {
    if (filter === 'likes') return Number(b.like) - Number(a.like);
    if (filter === 'comments') return Number(b.comment) - Number(a.comment);
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage,
  );

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <section className="section-wrap">
      <div className="pt-6 flex gap-14">
        {/* 이미지 영역 */}
        <div className="w-1/3 relative">
          <div
            className={`absolute top-0 right-2 cursor-pointer ${
              selectedBooks.has(book.isbn) ? 'text-green-500' : 'text-black/90'
            }`}
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(book.isbn);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-12"
              style={{
                filter: 'drop-shadow(0.5px 2px 3px rgba(255, 255, 255, 0.5))',
              }}
            >
              <path d="M6 2a2 2 0 00-2 2v18l8-5 8 5V4a2 2 0 00-2-2H6z" />
            </svg>
          </div>
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* 텍스트 영역 */}
        <div className="w-2/3 flex flex-col gap-4">
          <div className="flex items-center">
            <span className="text-m font-semibold">★평균 4.5</span>
            <span className="text-xs text-gray-500">(2.3만명)</span>
          </div>
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold">{book.title}</h2>
            <h3 className="text-lg text-gray-700">{book.author}</h3>
            <FaShareAlt
              className="ml-2 cursor-pointer"
              onClick={() => handleShareClick('book', book.isbn)}
            />
          </div>
          <p className="text-base">{book.description}</p>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-500">가격: {book.price}원</p>
            <p className="text-sm text-gray-500">출판: {book.pubDate}</p>
            <p className="text-sm text-gray-500">출판사항: {book.publisher}</p>
          </div>

          {/* 별점 부분 */}
          <div className="flex flex-col">
            <p className="text-sm text-gray-500">별점</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`text-2xl font-semibold cursor-pointer transition-all duration-300 ${
                    (hoverRating || rating) > index
                      ? 'text-yellow-500'
                      : 'text-gray-400'
                  }`}
                  onClick={() => handleRatingClick(index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <FaStar />
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button className="bg-black hover:bg-black/70 text-white font-bold py-2 px-5 rounded-lg shadow-lg transition-all duration-300">
              리뷰하기
            </button>
            <button className="bg-white hover:bg-black/10 text-black font-bold py-2 px-5 rounded-lg shadow-lg transition-all duration-300">
              모임하기
            </button>
          </div>
        </div>
      </div>

      {/* 공유 모달창 */}
      {shareModalOpen && shareOptions && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-96 shadow-lg scale-100">
            <h3 className="text-2xl text-center font-bold text-gray-800 mb-8">
              공유하기
            </h3>
            <div className="flex justify-evenly gap-4 mb-1">
              <div className="flex flex-col items-center">
                <button
                  className="bg-gray-100 hover:bg-gray-300 text-black p-6 rounded-full shadow-md transition-all duration-200"
                  onClick={handleCopyLink}
                >
                  <FaLink className="text-3xl" />{' '}
                </button>
                <span className="mt-3 text-sm font-semibold text-gray-700">
                  링크복사
                </span>
              </div>
              <div className="flex flex-col items-center">
                <button
                  className="bg-[#FEE500] hover:bg-[#F9D000] text-black p-6 rounded-full shadow-md transition-all duration-200"
                  onClick={handleKakaoShare}
                >
                  <RiKakaoTalkFill className="text-3xl transform scale-125" />{' '}
                  {/* scale-125로 카카오톡 아이콘 크기만 키움 */}
                </button>
                <span className="mt-3 text-sm font-semibold text-gray-700">
                  카카오톡
                </span>
              </div>
            </div>
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl"
              onClick={() => setShareModalOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
      {/* 같은 작가 */}
      {book.sameAuthor && book.sameAuthor.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-3 mt-28">
            같은 작가 다른 추천 작품
          </h3>
          <div className="flex flex-wrap gap-2">
            {book.sameAuthor.map((otherBook, index) => (
              <button
                key={index}
                className="bg-white hover:bg-gray-200 shadow-md text-sm px-5 py-3 rounded-full transition-all duration-300"
                onClick={() => navigate(`/book/${otherBook.title}`)}
              >
                #{otherBook.title}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* 리뷰 영역 */}
      <div className="review-section mt-28 mb-28">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">리뷰</h2>
          <select
            className="border p-2 rounded-lg text-sm cursor-pointer"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="latest">최신순</option>
            <option value="likes">좋아요순</option>
            <option value="comments">댓글 많은 순</option>
          </select>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-2 gap-20">
          {paginatedReviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md relative h-[300px] hover:bg-black/5 cursor-pointer transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-6">
                <img
                  src={review.profile}
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
                <span className="font-semibold">{review.name}</span>
              </div>
              <p className="text-sm mb-3 line-clamp-5 leading-relaxed">
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
        <div className="flex justify-center mt-6">
          {Array.from(
            { length: Math.ceil(reviews.length / reviewsPerPage) },
            (_, i) => (
              <button
                key={i}
                className={`mx-1 px-3 py-1 rounded-lg border ${
                  currentPage === i + 1 ? 'bg-black text-white' : 'bg-gray-200'
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default BookDetailPage;
