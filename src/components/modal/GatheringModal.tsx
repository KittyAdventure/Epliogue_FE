import axios from 'axios';
import { X } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utility/AuthContext';
import { redirectToLogin } from '../../utility/AuthUtils';

interface GatheringModalProps {
  isOpen: boolean; // A boolean indicating if the modal is open
  closeModal: () => void; // A function to close the modal
}
// 모임 생성 API 호출 함수
const createMeeting = async (data: {
  title: string;
  description: string;
  location: string;
  dateTime: string;
}) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { loggedIn } = authContext;
  try {
    if (!loggedIn) {
      redirectToLogin(navigate);
      return;
    }
    const token = localStorage.getItem('accesstoken');
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL_DEV}/api/meetings/gatherings`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    alert(`모임이 생성되었습니다! 모임 ID: ${response.data.meetingId}`);
    return response.data;
  } catch (error) {
    alert('모임 생성에 실패했습니다.');
    console.error(error);
  }
};

// 책 검색 API 호출 함수 (axios 사용)
const searchBooks = async (
  query: string,
  sort: string = 'sim',
  display: number = 10,
  start: number = 1,
) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL_DEV}/api/books`,
      {
        params: {
          query: query, // 책 제목 검색
          sort: sort, // 정렬 방식 (sim: 유사도, date: 날짜순)
          display: display, // 한 번에 가져올 책 개수 (예: 10 ~ 100)
          start: start, // 결과의 시작 위치 (예: 1 ~ 100)
        },
      },
    );
    return response.data.items;
  } catch (error) {
    console.error('책 검색 실패:', error);
    return [];
  }
};

const GatheringModal: React.FC<GatheringModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const [title, setTitle] = useState(''); // 모임명 상태
  const [description, setDescription] = useState(''); // 모임 소개 상태
  const [location, setLocation] = useState(''); // 위치 상태
  const [dateTime, setDateTime] = useState(''); // 모임 일정 상태
  const [bookSearchQuery, setBookSearchQuery] = useState(''); // 책 검색 쿼리 상태
  const [bookResults, setBookResults] = useState([]); // 책 검색 결과 상태

  // 책 검색 input 변경 시
  const handleBookSearchChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const query = e.target.value;
    setBookSearchQuery(query);
    if (query.length >= 2) {
      // 최소 2글자 이상 입력시 검색
      const books = await searchBooks(query);
      setBookResults(books);
    } else {
      setBookResults([]);
    }
  };

  // 책 제목 리스트 항목 클릭 시
  const handleBookSelect = (bookTitle: string) => {
    setBookSearchQuery(bookTitle); // 클릭한 책 제목을 검색 쿼리에 설정
    setBookResults([]); // 검색 결과 목록을 숨김
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const meetingData = { title, description, location, dateTime };
    await createMeeting(meetingData);
    closeModal(); // 모임 생성 후 모달 닫기
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
            {bookResults.length > 0 && (
              <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-sm p-2">
                <ul>
                  {bookResults.map((book: { title: string }, index: number) => (
                    <li
                      key={index}
                      className="text-sm text-gray-700 cursor-pointer hover:bg-gray-100 p-3"
                      onClick={() => handleBookSelect(book.title)} // 클릭 시 제목 입력란에 설정
                    >
                      {book.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              최대 인원은 몇 명 인가요? (최대 인원 30명)
            </label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              간단한 모임 소개 글 작성해 주세요.
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3 pl-3"
              rows={4}
              maxLength={5000}
              required
            />
            <p className="text-sm text-gray-500 mt-1 text-right">
              {description.length}/5000
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-gray-500 px-6 py-2 rounded-full mr-2"
              onClick={() => {
                setTitle('');
                setDescription('');
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
