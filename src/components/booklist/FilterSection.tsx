import { addMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaFilter, FaStar } from 'react-icons/fa';

function FilterSection() {
  // 상태 관리
  const [chosung, setChosung] = useState<string | null>(null); // 한글 자음 필터
  const [englishChosung, setEnglishChosung] = useState<string | null>(null); // 영어 자음 필터
  const [rating, setRating] = useState<string | null>(null); // 별점 필터
  const [startDate, setStartDate] = useState<Date | null>(null); // 시작일 필터
  const [endDate, setEndDate] = useState<Date | null>(null); // 종료일 필터
  const [isOpen, setIsOpen] = useState(false); // 별점 드롭다운 열기/닫기
  const [filter, setFilter] = useState<string>(''); // 필터 값 문자열

  // 필터값 초기화
  const [query, setQuery] = useState<{
    chosung: string | null;
    englishChosung: string | null;
    date: string | null;
    rating: string | null;
  }>({
    chosung: null,
    englishChosung: null,
    date: null,
    rating: null,
  });

  // 한글 자음과 영어 자음
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
  const englishLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

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

  // 한글 자음 클릭 시 필터 적용
  const handleChosungClick = (letter: string) => {
    setChosung(letter);
    setQuery((prev) => ({
      ...prev,
      chosung: letter,
    }));
    updateFilter();
  };

  // 영어 자음 클릭 시 필터 적용
  const handleEnglishChosungClick = (letter: string) => {
    setEnglishChosung(letter);
    setQuery((prev) => ({
      ...prev,
      englishChosung: letter,
    }));
    updateFilter();
  };

  // 별점 클릭 시 필터 적용
  const handleRatingClick = (value: string) => {
    setRating(value);
    setQuery((prev) => ({
      ...prev,
      rating: value,
    }));
    updateFilter();
  };

  // 날짜 변경 시 필터 적용
  const handleDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
    setQuery((prev) => ({
      ...prev,
      date:
        start && end
          ? `${start.toLocaleDateString()}~${end.toLocaleDateString()}`
          : null,
    }));
    updateFilter();
  };

  // 필터 상태 업데이트 (query 객체를 문자열로 변환)
  const updateFilter = () => {
    const filterString = Object.keys(query)
      .map((key) => `${key}: ${query[key as keyof typeof query] || 'All'}`)
      .join(', ');
    setFilter(filterString);
  };

  // 별점 필터 드롭다운 토글
  const toggleDropdown = () => setIsOpen(!isOpen);

  // 날짜 선택기용 커스텀 입력 컴포넌트
  const CustomInput = ({
    value,
    onClick,
  }: {
    value: string;
    onClick: () => void;
  }) => (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onClick={onClick}
        readOnly
        className="w-full border px-4 py-2 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-400"
        placeholder="YYYY-MM"
      />
      <FaCalendarAlt
        onClick={onClick}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
      />
    </div>
  );

  return (
    <div className="w-72 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold flex items-center mb-4 text-gray-800">
        필터 <FaFilter className="ml-2 mt-1" />
      </h3>
      <hr className="mb-4 border-gray-300" />

      {/* 한글 자음 필터 */}
      <h4 className="font-semibold mb-3 text-gray-700">책 제목</h4>
      <div className="mb-5">
        <h5 className="font-medium mb-2 text-gray-600 text-sm">한글</h5>
        <div className="flex flex-wrap gap-2">
          {koreanLetters.map((letter) => (
            <button
              key={letter}
              className={`w-10 h-10 flex items-center justify-center text-sm rounded-md transition-colors duration-300 ${
                chosung === letter
                  ? 'bg-black text-white font-bold'
                  : 'bg-white border text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => handleChosungClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* 영어 자음 필터 */}
      <div className="mb-3">
        <h5 className="font-medium mb-2 text-gray-600 text-sm">영문</h5>
        <div className="flex flex-wrap gap-2">
          {englishLetters.map((letter) => (
            <button
              key={letter}
              className={`w-10 h-10 flex items-center justify-center text-sm rounded-md transition-colors duration-300 ${
                englishChosung === letter
                  ? 'bg-black text-white font-bold'
                  : 'bg-white border text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => handleEnglishChosungClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* 별점 필터 */}
      <h4 className="font-semibold mt-10 mb-4 text-gray-700">별점</h4>
      <div className="relative">
        <button
          className="w-full border p-2 px-4 rounded-lg text-m bg-white flex justify-between items-center"
          onClick={toggleDropdown}
        >
          {rating
            ? options.find((opt) => opt.value === rating)?.label
            : '별점 선택'}
          <span className="ml-12">▼</span>
        </button>

        {isOpen && (
          <ul className="absolute w-full mt-1 border py-2 border-gray-300 rounded-lg bg-white shadow-md z-50">
            {options.map((option) => (
              <li
                key={option.value}
                className="flex gap-1.5 items-center py-2 px-4 cursor-pointer hover:font-bold transition-all duration-300 text-[#FACC15]"
                onClick={() => handleRatingClick(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 출판일 기간 */}
      <h4 className="font-semibold mt-10 mb-4 text-gray-700">출판일 기간</h4>
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-1">시작일</label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => {
            handleDateChange(date, endDate); // 시작일 변경
          }}
          dateFormat="yyyy-MM"
          showMonthYearPicker
          locale={ko}
          placeholderText="YYYY-MM"
          customInput={
            <CustomInput
              value={startDate ? startDate.toLocaleDateString() : ''}
              onClick={() => {}}
            />
          }
        />
      </div>

      <span className="w-full inline-block text-center text-gray-600 font-black text-xl">
        ~
      </span>

      <div className="mt-4">
        <label className="block text-gray-600 font-medium mb-1">종료일</label>
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => {
            handleDateChange(startDate, date); // 종료일 변경
          }}
          dateFormat="yyyy-MM"
          showMonthYearPicker
          locale={ko}
          placeholderText="YYYY-MM"
          customInput={
            <CustomInput
              value={endDate ? endDate.toLocaleDateString() : ''}
              onClick={() => {}}
            />
          }
          minDate={startDate ? addMonths(startDate, 0) : undefined}
        />
      </div>

      {/* 필터 상태 표시 */}
      <div className="mt-4">
        <h5 className="text-gray-700 font-semibold">현재 필터:</h5>
        <p className="text-gray-600">{filter || '없음'}</p>
      </div>
    </div>
  );
}

export default FilterSection;
