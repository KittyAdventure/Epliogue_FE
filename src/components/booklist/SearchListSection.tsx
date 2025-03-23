import { useNavigate } from 'react-router-dom';

interface Books {
  image: string;
  title: string;
  isbn: string;
  author: string;
  price: string;
  description: string;
  pubDate: string;
}

interface ListSectionProps {
  books: Books[];
}

const SearchListSection: React.FC<ListSectionProps> = ({ books }) => {
  const navigate = useNavigate();
  console.log(books);
  // books 배열이 비어있다면 "검색 결과가 없습니다." 메시지 출력
  if (books.length === 0) {
    return (
      <div className="mx-auto mt-20 text-xl h-[40vh]">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="w-6/7 overflow-y-auto max-h-[95vh] grid grid-cols-3 gap-12 ml-12 pr-11 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {books.map((book) => (
        <div
          key={book.isbn} // 각 항목에 고유한 key prop 추가
          className="relative cursor-pointer book-card"
          onClick={() => {
            console.log(book);
            if (book.isbn) {
              window.scrollTo(0, 0);
              navigate(`/book/${book.isbn}`);
            } else {
              console.error('Book ID is missing');
            }
          }}
        >
          <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
            <img
              src={book.image}
              alt={book.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-450 ease-in-out transform hover:scale-105"
            />
          </div>
          <h2 className="text-lg font-semibold mt-3 text-center">
            {book.title}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default SearchListSection;
