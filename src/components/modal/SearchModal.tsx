import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([]); // API에서 가져올 인기 검색어 상태
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [filter, setFilter] = useState(''); // 필터 상태 (기본값 없음)
  const [activeIndex, setActiveIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState(''); // 검색어가 비었을 때 표시할 에러 메시지 상태
  const navigate = useNavigate();

  const options = [
    { value: 'title', label: '제목' },
    { value: 'author', label: '저자' },
    { value: 'user', label: '유저' },
  ];

  // ✨ 인기 검색어 API 호출
  useEffect(() => {
    const fetchPopularSearches = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL_DEV}/api/keywords`,
        );
        const data = await response.json();
        setPopularSearches(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchPopularSearches();
  }, []);

  // ✨ 책 검색 API 호출
  // useEffect(() => {
  //   if (!searchTerm) {
  //     const fetchBooks = async () => {
  //       try {
  //         const params: {
  //           query: string;
  //           sort: string | null;
  //           display: string;
  //           start: string;
  //         } = {
  //           query: searchTerm || '', // 검색어가 없다면 빈 문자열로 설정
  //           sort: 'sim', // 기본적으로 정확도순으로 설정
  //           display: '10', // 한 번에 표시할 책의 수
  //           start: '1', // 시작 페이지 (페이지 번호)
  //         };

  //         // axios를 사용하여 API 요청
  //         await axios.get(`${import.meta.env.VITE_API_URL_DEV}/api/books`, {
  //           params,
  //         });
  //       } catch (error) {
  //         console.error('Error loading books:', error);
  //       }
  //     };

  //     fetchBooks();
  //   }
  // }, [searchTerm]);

  // SearchModal.tsx
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setErrorMessage('검색어를 입력해주세요.');
      return;
    }

    let searchQuery = '';

    if (filter === 'author' || filter === 'title') {
      searchQuery = searchTerm; // 'author'나 'title' 필터일 경우, searchTerm 사용
    } else if (filter === 'user') {
      searchQuery = searchTerm; // 'user' 필터일 경우, usearchTerm 사용
    } else {
      searchQuery = searchTerm; // 기본적으로 searchTerm 사용
    }

    // 에러 메시지 초기화
    setErrorMessage('');

    const newRecentSearches = [searchTerm, ...recentSearches.slice(0, 4)];
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
    setSearchTerm(''); // 검색 후 검색어 초기화
    onClose();

    const sort = filter || 'sim'; // 필터 값이 없다면 기본값은 'sim'

    // 필터가 'user'일 때 UserSearchPage로 이동
    if (filter === 'user') {
      navigate(`/members/search/${encodeURIComponent(searchQuery)}`); // usersearchTerm 사용하여 유저 검색 페이지로 이동
    } else {
      // 그렇지 않으면 기존의 책 검색 페이지로 이동
      navigate(
        `/books/${encodeURIComponent(searchQuery)}?query=${encodeURIComponent(
          searchQuery,
        )}&sort=${sort}`,
      );
    }
  };
  // 엔터키로 검색 실행
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 인기 검색어 애니메이션 효과 (2초마다 변경)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % popularSearches.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [popularSearches.length]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center z-100">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-white shadow-lg w-full h-[60vh] p-6 relative"
          >
            <div className="section-wrap relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                aria-label="닫기"
              >
                <X size={24} />
              </button>
              <h2 className="text-xl font-semibold mb-4">검색</h2>
              <div className="flex items-center space-x-2 pb-2 border-b-2 border-gray-100 mb-8">
                <div className="relative w-36 z-50">
                  <button
                    className="w-full border p-2 px-4 rounded-lg text-m bg-white flex justify-between items-center hover:bg-gray-100"
                    onClick={() =>
                      setIsFilterDropdownOpen(!isFilterDropdownOpen)
                    }
                  >
                    {filter
                      ? options.find((opt) => opt.value === filter)?.label
                      : '필터'}
                    <span className="text-gray-300">▼</span>
                  </button>

                  {isFilterDropdownOpen && (
                    <ul className="absolute w-full mt-1 border py-2 border-gray-300 rounded-lg bg-white shadow-md">
                      {options.map((option) => (
                        <li
                          key={option.value}
                          className="py-2 px-4 cursor-pointer hover:bg-gray-100 transition-all duration-300"
                          onClick={() => {
                            setFilter(option.value);
                            setIsFilterDropdownOpen(false);
                          }}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyPress} // 엔터키 이벤트 추가
                    className="w-full px-4 py-2 text-base focus:outline-none focus:border-none"
                  />

                  <button
                    onClick={handleSearch}
                    className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                    aria-label="검색"
                  >
                    <Search size={20} />
                  </button>
                </div>
              </div>

              {/* 에러 메시지 표시 */}
              {errorMessage && (
                <div className="text-red-500 text-sm mb-4 ml-[10.5rem] -mt-4">
                  <strong>{errorMessage}</strong>
                </div>
              )}

              <div className="grid grid-cols-2 gap-40">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">최근 검색어</span>
                    <button
                      onClick={() => setRecentSearches([])}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      전체삭제
                    </button>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    {recentSearches.length > 0 ? (
                      recentSearches.map((search, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center p-2 rounded-lg"
                        >
                          <span>{search}</span>
                          <button
                            onClick={() =>
                              setRecentSearches(
                                recentSearches.filter((_, i) => i !== index),
                              )
                            }
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X size={16} />
                          </button>
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">
                        최근 검색 기록이 없습니다.
                      </p>
                    )}
                  </ul>
                </div>

                <div>
                  <span className="font-medium">인기 검색어</span>
                  <ul className="text-sm text-gray-700 space-y-2 mt-2">
                    {popularSearches.map((search, index) => (
                      <li
                        key={index}
                        className={`p-2 rounded-lg transition-all duration-1000 ${
                          index === activeIndex ? 'scale-105 bg-gray-200' : ''
                        }`}
                      >
                        <span className={`${index < 3 ? 'text-red-500' : ''}`}>
                          {index + 1}
                        </span>{' '}
                        {search}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
