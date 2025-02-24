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
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  if (books.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div>
        <div>
          <h2>인기 책 리스트</h2>
          <div>
            <h3>{books[0].title}</h3>
            <p>{books[0].author}</p>
            <div>{books[0].description}</div>
          </div>
        </div>
        <div>
          <Slider {...settings}>
            {books.map((book, index) => (
              <div key={index}>
                <img src={book.image} alt={book.title} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default BookListSection;
