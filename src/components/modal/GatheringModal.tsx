import axios from 'axios';
import { X } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utility/AuthContext';
import { redirectToLogin } from '../../utility/AuthUtils';

interface Book {
  title: string;
  isbn: string;
}

interface GatheringModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

interface Gathering {
  bookId: string;
  title: string;
  content: string;
  location: string;
  dateTime: string;
  maxPeople: number;
}

const GatheringModal: React.FC<GatheringModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [maxPeople, setMaxPeople] = useState(0);
  const [bookSearchQuery, setBookSearchQuery] = useState('');
  const [bookResults, setBookResults] = useState<Book[]>([]);
  const [bookId, setBookId] = useState<string | null>(null);

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { loggedIn } = authContext;

  // 모임 생성 API 호출 함수
  const createMeeting = async (meetingData: Gathering) => {
    const token = localStorage.getItem('accesstoken');
    if (!loggedIn) {
      redirectToLogin(navigate);
      return;
    }

    try {
      console.log('모임 생성 데이터:', meetingData);
      // Token 출력
      console.log('Authorization Token:', token);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_DEV}/api/meetings/gatherings`,
        meetingData, // 전송되는 body 데이터
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', 
          },
        },
      );

      console.log('모임 생성 성공 응답:', response);

      alert(`모임이 생성되었습니다! 모임 ID: ${response.data.meetingId}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('모임 생성 실패:', error);
        if (error.config) {
          console.log('요청된 URL:', error.config.url);
          console.log('요청 데이터:', error.config.data); // 요청 본문이 실제로 들어가는지 확인
        }
        alert('모임 생성에 실패했습니다.');
      } else {
        console.error('알 수 없는 에러 발생:', error);
      }
    }
  };

  // 책 검색 API 호출 함수
  const searchBooks = async (
    query: string,
    sort: string = 'sim',
    display: number = 10,
    start: number = 1,
  ): Promise<Book[]> => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL_DEV}/api/books`,
        {
          params: { query, sort, display, start },
        },
      );
      return response.data.items as Book[];
    } catch (error) {
      console.error('책 검색 실패:', error);
      return [];
    }
  };

  // 책 검색 input 변경 시
  const handleBookSearchChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const query = e.target.value;
    setBookSearchQuery(query);
    if (query.length >= 2) {
      const books = await searchBooks(query);
      setBookResults(books);
    } else {
      setBookResults([]);
    }
  };

  // 책 제목 클릭 시
  const handleBookSelect = (book: Book) => {
    setBookSearchQuery(book.title);
    setBookId(book.isbn);
    setBookResults([]);
    console.log('선택한 책 ISBN:', book.isbn);
  };

  // 모임 생성 버튼 클릭 시
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookId) {
      alert('책을 선택해 주세요.');
      return;
    }

    const meetingData: Gathering = {
      title,
      content,
      location,
      dateTime,
      maxPeople,
      bookId,
    };

    // 모임 생성 API 호출
    const createdMeeting = await createMeeting(meetingData);

    // 모임 생성 성공 후 모달 닫기
    if (createdMeeting) {
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-60">
      <div className="bg-white p-11 rounded-lg shadow-lg w-1/5 min-w-[400px] relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold mx-auto">모임 생성하기</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 absolute right-3 top-3"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* 책명 검색 */}
          <div className="mb-4 relative">
            <label
              htmlFor="bookSearch"
              className="block text-sm font-medium text-gray-700"
            >
              책 제목 검색
            </label>
            <input
              type="text"
              id="bookSearch"
              value={bookSearchQuery}
              onChange={handleBookSearchChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md py-3 pl-3"
              placeholder="책 제목을 검색하세요(최소 2자이상)"
              required
            />
            {bookResults.map((book, index) => (
              <li
                key={index}
                className="text-sm text-gray-700 cursor-pointer hover:bg-gray-100 p-3"
                onClick={() => handleBookSelect(book)} // ✅ 클릭 시 handleBookSelect 실행
              >
                {book.title}
              </li>
            ))}
          </div>

          {/* 모임명 입력 */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              모임 명
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md py-3 pl-3"
              required
            />
          </div>

          {/* 최대 인원 선택 */}
          <div className="mb-4">
            <label
              htmlFor="maxPeople"
              className="block text-sm font-medium text-gray-700"
            >
              최대 인원은 몇 명 인가요? (최대 인원 30명)
            </label>
            <select
              id="maxPeople"
              value={maxPeople}
              onChange={(e) => setMaxPeople(Number(e.target.value))}
              className="mt-1 block w-full py-3 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">인원 수를 선택하세요</option>
              {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}명
                </option>
              ))}
            </select>
          </div>

          {/* 모임 일정 (날짜와 시간 선택) */}
          <div className="mb-4">
            <label
              htmlFor="dateTime"
              className="block text-sm font-medium text-gray-700"
            >
              모임 일정 (날짜와 시간을 선택해 주세요.)
            </label>
            <input
              type="datetime-local"
              id="dateTime"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3 pl-3"
              required
            />
          </div>

          {/* 위치 입력 */}
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              위치
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md py-3 pl-3"
              required
            />
          </div>

          {/* 간단한 모임 소개 작성 */}
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              간단한 모임 소개 글 작성해 주세요.
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="resize-none border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3 pl-3"
              rows={4}
              maxLength={5000}
              required
            />
            <p className="text-sm text-gray-500 mt-1 text-right">
              {content.length}/5000
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-gray-500 px-6 py-2 rounded-full mr-2"
              onClick={() => {
                setTitle('');
                setContent('');
                setLocation('');
                setDateTime('');
              }}
            >
              다시 쓰기
            </button>
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-full"
            >
              생성하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GatheringModal;
