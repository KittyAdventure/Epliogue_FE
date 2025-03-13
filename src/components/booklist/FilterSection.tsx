import { addMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaFilter, FaStar } from 'react-icons/fa';

function FilterSection() {
  const [filter, setFilter] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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
  // Custom Input Component
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

      {/* 책 제목 필터 */}
      <h4 className="font-semibold mb-3 text-gray-700">책 제목</h4>
      <div className="mb-5">
        <h5 className="font-medium mb-2 text-gray-600 text-sm">한글</h5>
        <div className="flex flex-wrap gap-2">
          {koreanLetters.map((letter) => (
            <button
              key={letter}
              className={`w-10 h-10 flex items-center justify-center text-sm rounded-md transition-colors duration-300 ${
                selectedLetter === letter
                  ? 'bg-black text-white font-bold'
                  : 'bg-white border text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-3">
        <h5 className="font-medium mb-2 text-gray-600 text-sm">영문</h5>
        <div className="flex flex-wrap gap-2">
          {englishLetters.map((letter) => (
            <button
              key={letter}
              className={`w-10 h-10 flex items-center justify-center text-sm rounded-md transition-colors duration-300 ${
                selectedLetter === letter
                  ? 'bg-black text-white font-bold'
                  : 'bg-white border text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* 별점 */}
      <h4 className="font-semibold mt-10 mb-4 text-gray-700">별점</h4>
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

      {/* 출판일 기간 (년-월) */}
      <h4 className="font-semibold mt-10 mb-4 text-gray-700">출판일 기간</h4>
      {/* 첫 번째 날짜 선택 */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-1">시작일</label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => {
            setStartDate(date);
            setEndDate(null); // 시작 날짜 변경 시 종료 날짜 초기화
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
          calendarClassName="custom-calendar" // 커스텀 클래스 이름 추가
        />
      </div>

      <span className="w-full inline-block text-center text-gray-600 font-black text-xl">
        ~
      </span>

      {/* 두 번째 날짜 선택 */}
      <div className="mt-4">
        <label className="block text-gray-600 font-medium mb-1">종료일</label>
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
          minDate={startDate ? addMonths(startDate, 0) : undefined} // 시작월 이전 선택 방지
        />
      </div>
    </div>
  );
}

export default FilterSection;
