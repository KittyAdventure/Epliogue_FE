import { useNavigate } from 'react-router-dom';

interface Book {
  thumbnail: string;
  bookTitle: string;
  bookId: string;
}

interface ListSectionProps {
  books: Book[];
}

const ListSection: React.FC<ListSectionProps> = ({ books }) => {
  const navigate = useNavigate();

  if (!books.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-6/7 overflow-y-auto max-h-[95vh] grid grid-cols-3 gap-12 ml-12 pr-11 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {books.map((book) => (
        <div
          key={book.bookId}
          className="relative cursor-pointer book-card"
          onClick={() => navigate(`/book/${book.bookId}`)}
        >
          <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
            <img
              src={book.thumbnail}
              alt={book.bookTitle}
              className="absolute inset-0 w-full h-full object-conver transition-transform duration-450 ease-in-out transform hover:scale-105"
            />
          </div>
          <h2 className="text-lg font-semibold mt-3 text-center">
            {book.bookTitle}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ListSection;
