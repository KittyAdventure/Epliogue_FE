import { addMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaFilter, FaStar } from 'react-icons/fa';

interface FilterProps {
  chosung: string | null;
  setChosung: (value: string | null) => void;
  englishChosung: string | null;
  setEnglishChosung: (value: string | null) => void;
  rating: string | null;
  setRating: (value: string | null) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
}

const FilterSection: React.FC<FilterProps> = ({
  chosung,
  setChosung,
  englishChosung,
  setEnglishChosung,
  rating,
  setRating,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
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

  const ratingOptions = [
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

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false); // 드롭다운 상태 추가

  const FilterButton = ({
    letters,
    selected,
    setSelected,
    setOtherSelected,
  }: {
    letters: string[];
    selected: string | null;
    setSelected: (value: string | null) => void;
    otherSelected: string | null;
    setOtherSelected: (value: string | null) => void;
  }) => (
    <div className="flex flex-wrap gap-2">
      {letters.map((letter) => (
        <button
          key={letter}
          className={`w-10 h-10 flex items-center justify-center text-sm rounded-md transition-colors duration-300 ${
            selected === letter
              ? 'bg-black text-white font-bold'
              : 'bg-white border text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => {
            // 선택된 항목이 다른 항목이라면, 그 항목을 null로 설정
            setSelected(selected === letter ? null : letter);
            if (selected !== letter) {
              setOtherSelected(null); // 반대편 항목을 초기화
            }
          }}
        >
          {letter}
        </button>
      ))}
    </div>
  );

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
        className="w-full border px-4 py-2 rounded-lg bg-white text-gray-800"
        placeholder="YYYY-MM"
      />
      <FaCalendarAlt
        onClick={onClick}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
      />
    </div>
  );

  const handleRatingClick = () => {
    setIsDropdownOpen(!isDropdownOpen); // 드롭다운 열기/닫기
  };

  const handleRatingSelect = (value: string) => {
    setRating(value); // 별점 선택
    setIsDropdownOpen(false); // 드롭다운 닫기
  };

  return (
    <div className="w-72 max-w-[15rem] p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold flex items-center mb-4 text-gray-800">
        필터 <FaFilter className="ml-2 mt-1" />
      </h3>
      <hr className="mb-4 border-gray-300" />

      {/* 책 제목 필터 */}
      <h4 className="font-semibold mb-3 text-gray-700">책 제목</h4>
      <h5 className="font-medium mb-2 text-gray-600 text-sm">한글</h5>
      <FilterButton
        letters={koreanLetters}
        selected={chosung}
        setSelected={setChosung}
        otherSelected={englishChosung}
        setOtherSelected={setEnglishChosung}
      />

      <h5 className="font-medium mt-5 mb-2 text-gray-600 text-sm">영문</h5>
      <FilterButton
        letters={englishLetters}
        selected={englishChosung}
        setSelected={setEnglishChosung}
        otherSelected={chosung}
        setOtherSelected={setChosung}
      />

      {/* 별점 필터 */}
      <h4 className="font-semibold mt-10 mb-4 text-gray-700">별점</h4>
      <div className="relative z-50">
        <button
          className="w-full border p-2 px-4 rounded-lg text-m bg-white flex justify-between items-center"
          onClick={handleRatingClick} // 드롭다운 열기/닫기
        >
          {rating
            ? ratingOptions.find((opt) => opt.value === rating)?.label
            : '별점 선택'}
          <span className="ml-12">▼</span>
        </button>

        {isDropdownOpen && ( // 드롭다운이 열려있을 때만 표시
          <ul className="absolute w-full mt-1 border border-gray-300 rounded-lg bg-white shadow-md">
            {ratingOptions.map((option) => (
              <li
                key={option.value}
                className="flex gap-1.5 items-center py-3 px-4 cursor-pointer hover:font-bold transition-all duration-300 text-[#FACC15] hover:bg-gray-100"
                onClick={() => handleRatingSelect(option.value)} // 별점 선택
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 출판일 기간 (년-월) */}
      <h4 className="font-semibold mt-10 mb-4 text-gray-700">출판일 기간</h4>
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">시작일</label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => {
            setStartDate(date);
            setEndDate(null);
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
        <label className="block text-gray-600 font-medium mb-2">종료일</label>
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date)}
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
    </div>
  );
};

export default FilterSection;
