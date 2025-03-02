import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface Book {
  title: string;
  author: string;
  description: string;
  image: string;
}

const BookListSection: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    fetch('http://localhost:5000/books')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: Book[]) => {
        // 빈 아이템을 추가하지 않고 데이터만 바로 설정
        setBooks(data);
      })
      .catch((error) => console.error('Error loading books:', error));
  }, []);

  const settings = {
    dots: false,
    infinite: true, // 무한 반복
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 4000,
    afterChange: (index: number) => {
      setCurrentIndex(Math.min(index, books.length - 1)); // 마지막 아이템에 대한 처리
    },
  };

  if (books.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="section-wrap max-w-6xl mx-auto flex items-center gap-16">
      {/* 왼쪽 텍스트 영역 */}
      <div className="w-1/3 h-[19%] flex flex-col">
        <h2 className="text-4xl font-bold mb-11">인기 책 리스트</h2>
        <div className="flex gap-4 items-end">
          <h3 className="text-xl font-semibold">{books[currentIndex].title}</h3>
          <p>{books[currentIndex].author}</p>
        </div>
        <div className="inline-block w-full border-solid border-1 mt-4"></div>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          {books[currentIndex].description}
        </p>
      </div>

      {/* 오른쪽 슬라이드 영역 */}
      <div className="w-2/3">
        <Slider {...settings}>
          {books.map((book, index) => (
            <div key={index} className="image-container px-2">
              <div className="relative w-full rounded-lg overflow-hidden pb-[150%]">
                {/* 책 이미지가 있을 때만 렌더링 */}
                {book.image ? (
                  <img
                    className="absolute inset-0 w-full h-full object-cover rounded-lg hover:scale-104 transition-all duration-300 ease-in-out"
                    src={book.image}
                    alt={book.title}
                  />
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
