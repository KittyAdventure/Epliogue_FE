import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches] = useState<string[]>([
    '한강',
    '채식주의자',
    '작별하지 않는다',
    '불변의 법칙',
    '당신이 누군가를 죽였다',
    '히가시노 게이고',
    '데일 카네기 인간관계론',
    '인간 실격',
    '불편한 편의점',
    '데미안',
  ]);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [filter, setFilter] = useState('');

  const options = [
    { value: 'latest', label: '제목' },
    { value: 'likes', label: '저자' },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm) {
      const newRecentSearches = [searchTerm, ...recentSearches.slice(0, 4)];
      setRecentSearches(newRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
      setSearchTerm('');
      onClose();
      navigate(`/search/${searchTerm}`);
    }
  };

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
                    placeholder="검색어를 입력하세요..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
