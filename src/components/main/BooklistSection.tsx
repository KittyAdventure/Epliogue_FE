import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'; // axios 추가
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Link 추가
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  avgRating: string;
  coverUrl: string;
  price: string;
  publisher: string;
  pubDate: string;
  isbn: string; // ISBN 추가
}

const BookListSection: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_DEV}/api/trending-books`,
        );
        setBooks(response.data || []);
      } catch (error) {
        console.error('Error loading books:', error);
        setBooks([]);
      }
    };

    fetchBooks();
  }, []);
  

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 2500,
    afterChange: (index: number) => {
      setCurrentIndex(Math.min(index, books.length - 1)); // 마지막 아이템에 대한 처리
      setIsPrevDisabled(index === 0);
      setIsNextDisabled(index >= books.length);
    },
  };

  // 🔹 이전(왼쪽) 화살표 버튼
  const CustomPrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        className={`absolute left-[-40px] top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300 ease-in-out ${
          isPrevDisabled
            ? 'bg-black/5 opacity-20'
            : 'bg-black/40 hover:bg-black/70 text-white'
        }`}
        onClick={isPrevDisabled ? undefined : onClick}
        disabled={isPrevDisabled}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6" />
      </button>
    );
  };

  // 🔹 다음(오른쪽) 화살표 버튼
  const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        className={`absolute right-[-40px] top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300 ease-in-out ${
          isNextDisabled
            ? 'bg-black/5 opacity-20'
            : 'bg-black/40 hover:bg-black/70 text-white'
        }`}
        onClick={isNextDisabled ? undefined : onClick}
        disabled={isNextDisabled}
      >
        <FontAwesomeIcon icon={faChevronRight} className="w-6 h-6" />
      </button>
    );
  };

  if (books.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="section-wrap mx-auto flex gap-16 mt-[80px]">
      {/* 왼쪽 텍스트 영역 */}
      <div className="w-1/3 mt-[8%] flex flex-col">
        <h2 className="text-4xl font-bold mb-11">인기 책 리스트</h2>
        <div className="flex gap-1 items-end flex-wrap">
          <h3 className="text-xl font-semibold w-full sm:w-auto">
            {books[currentIndex].title}
          </h3>
          <p>{books[currentIndex].author}</p>
        </div>

        <div className="inline-block w-full border-solid border-1 mt-4"></div>
        <p className="mt-4 text-sm leading-relaxed text-gray-700 line-clamp-10">
          {books[currentIndex].description}
        </p>
      </div>

      {/* 오른쪽 슬라이드 영역 */}
      <div className="w-2/3">
        <Slider
          {...settings}
          prevArrow={<CustomPrevArrow />}
          nextArrow={<CustomNextArrow />}
        >
          {books.map((book, index) => (
            <div key={index} className="image-container px-2">
              <div className="relative w-full rounded-lg overflow-hidden pb-[150%]">
                {/* 책 이미지가 있을 때만 렌더링 */}
                {book.coverUrl ? (
                  <Link
                    to={`/book/${book.id}`}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      className="absolute inset-0 w-full h-full object-cover rounded-lg hover:scale-104 transition-all duration-300 ease-in-out"
                      src={book.coverUrl}
                      alt={book.title}
                    />
                  </Link>
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-transparent"></div>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BookListSection;
