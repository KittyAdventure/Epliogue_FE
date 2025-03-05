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
  sameAuthor: Array<{ title: string }>;
}

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the book ID from the URL
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/books/detail/${id}`)
        .then((response) => response.json())
        .then((data) => setBook(data))
        .catch((error) => console.error('Error loading book details:', error));
    }
  }, [id]);

  if (!book) {
    return <div>Loading book details...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{book.title}</h1>
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-80 object-cover rounded-lg mb-4"
      />
      <p>{book.description}</p>
      <p>가격: {book.price}원</p>
      <p>출판사: {book.publisher}</p>
      <p>출간일: {book.pubDate}</p>
      <p>ISBN: {book.isbn}</p>
    </div>
  );
};

export default BookDetailPage;
