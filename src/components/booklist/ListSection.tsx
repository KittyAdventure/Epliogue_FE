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

  // books 배열이 비어있다면 "검색 결과가 없습니다." 메시지 출력
  if (books.length === 0) {
    return (
      <div className="mx-auto mt-20 text-xl h-[40vh]">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="w-6/7 grid grid-cols-3 gap-12 ml-12 pr-11">
      {books.map((book) => (
        <div
          key={book.bookId} // 각 항목에 고유한 key prop 추가
          className="relative cursor-pointer book-card"
          onClick={() => navigate(`/book/${book.bookId}`)}
        >
          <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
            <img
              src={book.thumbnail}
              alt={book.bookTitle}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-450 ease-in-out transform hover:scale-105"
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
