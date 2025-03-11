import { useEffect, useState } from 'react';
import { FaFilter, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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

const BookPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortCriterion, setSortCriterion] = useState<string>('latest'); // For sorting
  const [filter, setFilter] = useState<string>(''); // For rating filter
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [createdAt, setCreatedAt] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const englishLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const koreanLetters = [
    'ㄱ',
    'ㄴ',
    'ㄷ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅅ',
    'ㅇ',
    'ㅈ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];

  const options = [
    {
      value: '5',
      label: (
        <>
          <FaStar className="text-[#FACC15]" />{' '}
          <FaStar className="text-[#FACC15]" />{' '}
          <FaStar className="text-[#FACC15]" />{' '}
          <FaStar className="text-[#FACC15]" />{' '}
          <FaStar className="text-[#FACC15]" />
        </>
      ),
    },
    {
      value: '4',
      label: (
        <>
          <FaStar className="text-[#FACC15]" />{' '}
          <FaStar className="text-[#FACC15]" />{' '}
          <FaStar className="text-[#FACC15]" />{' '}
          <FaStar className="text-[#FACC15]" />{' '}
          <FaStar className="text-[#D1D1D1]" />
        </>
      ),
    },
    {
      value: '3',
      label: (
        <>
          <FaStar className="text-[#FACC15]" />{' '}
          <FaStar className="text-[#FACC15]" />{' '}
          <FaStar className="text-[#FACC15]" />{' '}
          <FaStar className="text-[#D1D1D1]" />{' '}
          <FaStar className="text-[#D1D1D1]" />
        </>
      ),
    },
    {
      value: '2',
      label: (
        <>
          <FaStar className="text-[#FACC15]" />{' '}
          <FaStar className="text-[#FACC15]" />{' '}
          <FaStar className="text-[#D1D1D1]" />{' '}
          <FaStar className="text-[#D1D1D1]" />{' '}
          <FaStar className="text-[#D1D1D1]" />
        </>
      ),
    },
    {
      value: '1',
      label: (
        <>
          <FaStar className="text-[#FACC15]" />{' '}
          <FaStar className="text-[#D1D1D1]" />{' '}
          <FaStar className="text-[#D1D1D1]" />{' '}
          <FaStar className="text-[#D1D1D1]" />{' '}
          <FaStar className="text-[#D1D1D1]" />
        </>
      ),
    },
  ];

  const options2 = [
    { value: 'latest', label: '최신순' },
    { value: 'list', label: '조회순' },
    { value: 'star', label: '평점순' },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/books')
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          setBooks(data.items);
          const currentTime = new Date().getTime();
          setCreatedAt(new Array(data.items.length).fill(currentTime));
        }
      })
      .catch((error) => {
        console.error('Error loading books:', error);
        setBooks([]);
      });
  }, []);

  const sortBooks = (books: Book[], createdAt: number[]) => {
    if (sortCriterion === 'latest') {
      return [...books].sort(
        (a, b) => createdAt[books.indexOf(b)] - createdAt[books.indexOf(a)],
      );
    } else if (sortCriterion === 'pubDate') {
      return [...books].sort(
        (a, b) => new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime(),
      );
    }
    return books;
  };

  if (books.length === 0) {
    return <div>Loading...</div>;
  }

  const sortedBooks = sortBooks(books, createdAt);

  return (
    <section className="section-wrap">
      <div className="pt-6 flex flex-col gap-14">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-6">책 정보 페이지</h1>
          <div className="w-35 z-50">
            <button
              className="w-full border p-2 px-4 rounded-lg text-m bg-white flex justify-between items-center hover:"
              onClick={() => setIsOpen2(!isOpen2)}
            >
              {sortCriterion
                ? options2.find((opt) => opt.value === sortCriterion)?.label
                : '정렬'}
              <span>▼</span>
            </button>

            {isOpen2 && (
              <ul className="absolute w-35 mt-1 border py-2 border-gray-300 rounded-lg bg-white shadow-md">
                {options2.map((option2) => (
                  <li
                    key={option2.value}
                    className="py-2 px-4 cursor-pointer hover:font-bold transition-all duration-300"
                    onClick={() => {
                      setSortCriterion(option2.value);
                      setIsOpen2(false);
                    }}
                  >
                    {option2.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex w-full justify-between gap-[2vw]">
          {/* 정렬 기준 선택 */}
          <div className="w-70 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold flex items-center mb-4 text-gray-800">
              필터 <FaFilter className="ml-2 text-gray-600" />
            </h3>
            <hr className="mb-4 border-gray-300" />

            {/* 책 제목 필터 */}
            <h4 className="font-semibold mb-3 text-gray-700">책 제목</h4>
            <div className="mb-5">
              <h5 className="font-medium mb-2 text-gray-600">한글</h5>
              <div className="flex flex-wrap gap-2">
                {koreanLetters.map((letter) => (
                  <button
                    key={letter}
                    className={`w-10 h-10 flex items-center justify-center text-sm rounded-md transition-colors duration-300 ${
                      selectedLetter === letter
                        ? 'bg-blue-500 text-white border border-blue-700'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                    onClick={() => setSelectedLetter(letter)}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <h5 className="font-medium mb-2 text-gray-600">영문</h5>
              <div className="flex flex-wrap gap-2">
                {englishLetters.map((letter) => (
                  <button
                    key={letter}
                    className={`w-10 h-10 flex items-center justify-center text-sm rounded-md transition-colors duration-300 ${
                      selectedLetter === letter
                        ? 'bg-blue-500 text-white border border-blue-700'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                    onClick={() => setSelectedLetter(letter)}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <h4 className="font-semibold mb-2 text-gray-700">별점</h4>
            <div className="relative">
              <button
                className="w-full border p-2 px-4 rounded-lg text-m bg-white flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
              >
                {filter
                  ? options.find((opt) => opt.value === filter)?.label
                  : '별점 선택'}
                <span className="ml-12">▼</span>
              </button>

              {isOpen && (
                <ul className="absolute w-full mt-1 border py-2 border-gray-300 rounded-lg bg-white shadow-md">
                  {options.map((option) => (
                    <li
                      key={option.value}
                      className="flex gap-1.5 items-center py-2 px-4 cursor-pointer hover:font-bold transition-all duration-300 text-[#FACC15]"
                      onClick={() => {
                        setFilter(option.value);
                        setIsOpen(false);
                      }}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Date Filter */}
            <h4 className="font-semibold mt-5 mb-2 text-gray-700">
              출판일 기간
            </h4>
            <div className="flex flex-col gap-3">
              <input
                type="date"
                className="border p-2 rounded-md w-full bg-white text-gray-800 focus:ring-2 focus:ring-blue-400"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setEndDate(''); // Reset the end date when start date changes
                }}
              />
              <span className="text-center text-gray-600">~</span>
              <input
                type="date"
                className="border p-2 rounded-md w-full bg-white text-gray-800 focus:ring-2 focus:ring-blue-400"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                disabled={!startDate}
              />
            </div>
          </div>

          {/* Books List */}
          <div className="w-6/7 overflow-y-auto max-h-[80vh] grid grid-cols-[repeat(3,minmax(0,0.5fr))] gap-12 ml-12 pr-11 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {sortedBooks.map((book) => (
              <div
                key={book.isbn}
                className="relative cursor-pointer book-card"
                onClick={() => navigate(`/book/${book.isbn}`)}
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-[90%] object-cover rounded-lg shadow-md mb-4"
                />
                <h2 className="text-lg font-semibold mt-3 text-center">
                  {book.title}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookPage;
