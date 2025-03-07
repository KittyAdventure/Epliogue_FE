import {
  faChevronLeft,
  faChevronRight,
  faComment,
  faStar,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons'; // 필요한 아이콘 임포트
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
interface Book {
  title: string;
  author: string;
  description: string;
  image: string;
  price: string;
  publisher: string;
  pubDate: string;
  isbn: string;
  rating: number;
  ratingCount: number;
  sameAuthor: Array<{ title: string }>;
}
interface Review {
  username: string;
  content: string;
  likes: number;
  comments: number;
}

const GatheringPage: React.FC = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch(`http://localhost:5000/books/detail/${isbn}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.items) {
          setBooks(data.items);
        }
      })
      .catch((error) => {
        console.error('Error loading books:', error);
        setBooks([]);
      });
  }, []);

  if (!books) {
    return <div className="text-center text-lg">Loading book details...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Book Info Section */}
      {books.map((book, index) => (
        <div key={index} className="flex gap-6">
          <img
            src={book.image}
            alt={book.title}
            className="w-60 h-80 object-cover rounded-lg shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <p className="text-gray-500">{book.author}</p>
            <p className="mt-3">{book.description}</p>
            <p className="mt-2 text-gray-600">출판사: {book.publisher}</p>
            <p className="text-gray-600">출간일: {book.pubDate}</p>
            <p className="text-gray-600">가격: {book.price}원</p>

            {/* Rating */}
            <div className="flex items-center mt-3">
              {[...Array(5)].map((_, i) =>
                i < Math.round(book.rating) ? (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar} // 여기서 문자열 대신 faStar 객체 사용
                    className="text-yellow-400"
                  />
                ) : (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar} // 비어있는 별 아이콘도 같은 방식으로 처리
                    className="text-gray-400"
                  />
                ),
              )}
              <span className="ml-2 text-gray-500">
                {book.rating}점 ({book.ratingCount}개 리뷰)
              </span>
            </div>

            {/* Review Button */}
            <button className="mt-4 bg-black text-white py-2 px-4 rounded-lg">
              리뷰하기
            </button>
          </div>
        </div>
      ))}
      {/* Recommended Books */}
      <div className="mt-10">
        <h2 className="text-xl font-bold">같은 작가 다른 추천 작품</h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {/* {books.sameAuthor.map((item, index) => (
            <span
              key={index}
              className="bg-gray-200 text-sm px-3 py-1 rounded-full"
            >
              #{item.title}
            </span>
          ))} */}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold">리뷰</h2>
        <div className="flex justify-end mb-4">
          <select className="border px-2 py-1 rounded-md">
            <option>최신순</option>
            <option>좋아요순</option>
            <option>댓글순</option>
          </select>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-2 gap-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="font-bold">{review.username}</span>
              </div>
              <p className="text-sm text-gray-700">{review.content}</p>
              <div className="flex justify-between text-xs text-gray-500 mt-3">
                <span>
                  <FontAwesomeIcon
                    icon={faThumbsUp} // faThumbsUp 아이콘 객체 사용
                    className="mr-1"
                  />{' '}
                  {review.likes}개
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faComment} // faComment 아이콘 객체 사용
                    className="mr-1"
                  />{' '}
                  {review.comments}개
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <button className="px-3 py-1 mx-1 bg-gray-200 rounded-md">
            <FontAwesomeIcon icon={faChevronLeft} />{' '}
            {/* faChevronLeft 아이콘 사용 */}
          </button>
          <button className="px-3 py-1 mx-1 bg-gray-300 rounded-md">1</button>
          <button className="px-3 py-1 mx-1 bg-gray-200 rounded-md">2</button>
          <button className="px-3 py-1 mx-1 bg-gray-200 rounded-md">3</button>
          <button className="px-3 py-1 mx-1 bg-gray-200 rounded-md">
            <FontAwesomeIcon icon={faChevronRight} />{' '}
            {/* faChevronRight 아이콘 사용 */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GatheringPage;
