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
      .then((data: Book[]) => setBooks(data))
      .catch((error) => console.error('Error loading books:', error));
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true, // 아래 여백
    afterChange: (index: number) => setCurrentIndex(index),
  };

  if (books.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="section-wrap max-w-6xl mx-auto flex">
      {/* 왼쪽 텍스트 영역 */}
      <div className="w-1/3">
        <h2 className="text-4xl font-bold mb-6">인기 책 리스트</h2>
        <div>
          <h3 className="text-xl font-semibold">{books[currentIndex].title}</h3>
          <p className="text-gray-600">{books[currentIndex].author}</p>
          <p className="mt-4 text-sm leading-relaxed text-gray-700">
            {books[currentIndex].description}
          </p>
        </div>
      </div>

      {/* 오른쪽 슬라이드 영역 */}
      <div className="w-2/3">
        <Slider {...settings}>
          {books.map((book, index) => (
            <div key={index} className="image-container px-2">
              <div className="relative w-full pb-[150%]">
                {/* 2:3 비율을 유지 */}
                <img
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  src={book.image}
                  alt={book.title}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BookListSection;
