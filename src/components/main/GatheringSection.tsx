import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdNavigateNext } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import GatheringBtn from '../button/GatheringBtn';

interface Gathering {
  id: number;
  memberId: number;
  bookId: string;
  title: string;
  content: string;
  location: string;
  dateTime: string;
  nowPeople: number;
  maxPeople?: number;
  bookImage: string;
  bookTitle: string;
}

const GatheringSection: React.FC = () => {
  const [gatherings, setGatherings] = useState<Gathering[]>([]);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const navigate = useNavigate();

  const GatheringPage = () => {
    navigate(`/gathering`);
  };

  // 모임 리스트
  useEffect(() => {
    const fetchGatherings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_DEV}/api/meetings/gatherings`,
          {
            params: { page: 1, size: 10 },
          },
        );
        console.log('API 응답 데이터:', response.data);
        setGatherings(response.data.content);
      } catch (error) {
        console.error('Error loading gathering:', error);
      }
    };
    fetchGatherings();
  }, []);

  const slidesToShow = Math.min(gatherings.length, 3);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow > 0 ? slidesToShow : 1,
    slidesToScroll: 1,
    arrows: true,
    afterChange: (index: number) => {
      setIsPrevDisabled(index === 0);
      setIsNextDisabled(index >= gatherings.length - slidesToShow);
    },
  };

  // 🔹 이전(왼쪽) 화살표 버튼
  const CustomPrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        className={`absolute left-[-40px] top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300 ease-in-out ${
          isPrevDisabled
            ? 'bg-black/5 opacity-20'
            : 'bg-black/40 hover:bg-black/70 text-white'
        }`}
        onClick={isPrevDisabled ? undefined : onClick}
        disabled={isPrevDisabled}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6" />
      </button>
    );
  };

  // 🔹 다음(오른쪽) 화살표 버튼
  const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        className={`absolute right-[-40px] top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300 ease-in-out ${
          isNextDisabled
            ? 'bg-black/5 opacity-20'
            : 'bg-black/40 hover:bg-black/70 text-white'
        }`}
        onClick={isNextDisabled ? undefined : onClick}
        disabled={isNextDisabled}
      >
        <FontAwesomeIcon icon={faChevronRight} className="w-6 h-6" />
      </button>
    );
  };


  return (
    <div className="section-wrap flex gap-16 mb-[200px]">
      <div className="w-1/4">
        <h2 className="text-4xl font-bold mb-24">모임 리스트</h2>
        <p className="font-medium text-gray-700 text-base flex flex-col gap-6">
          <span className="text-gray-900 font-bold text-2xl">
            #오프라인 모임
          </span>
          <span className="pt-3 text-gray-600 text-lg leading-relaxed">
            다양한 공간에서 책과 <br />
            사람을 만나는 의미 있는 시간!
          </span>
          <span className="text-gray-600 text-lg leading-relaxed">
            책을 함께 읽고 깊은 대화를 <br />
            나누는 독서모임에 참여하세요.
          </span>
        </p>
        <button
          className="mt-6 flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-all duration-200"
          onClick={() => {
            window.scrollTo(0, 0);
            GatheringPage();
          }}
        >
          <span className="mr-2">전체 모임 리스트 보러가기</span>
          <MdNavigateNext size={20} />
        </button>
      </div>
      <div className="w-3/4 h-full relative pt-[90px]">
        {gatherings.length > 0 ? (
          <Slider
            {...settings}
            prevArrow={<CustomPrevArrow />}
            nextArrow={<CustomNextArrow />}
          >
            {gatherings.map((gathering) => (
              <div key={gathering.memberId} className="w-full">
                <div
                  className="relative w-full group overflow-hidden rounded-lg"
                  style={{ aspectRatio: '2/3' }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg z-10"></div>
                  <img
                    className="absolute inset-0 w-full h-full object-cover rounded-lg z-5 transition-transform duration-300 ease-in-out group-hover:scale-105"
                    src={gathering.bookImage}
                    alt={gathering.title}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 z-20">
                    <h3 className="text-xl font-bold line-clamp-1 text-center">
                      {gathering.title}
                    </h3>
                    <p className="text-[0.9rem] mt-3 text-center line-clamp-4">
                      {gathering.content}
                    </p>
                    <p className="text-sm mt-6 text-center">
                      <span className="font-semibold">일정 :</span>{' '}
                      {gathering.dateTime}
                    </p>
                    <p className="text-sm text-center">
                      <span className="font-semibold">장소 :</span>{' '}
                      {gathering.location}
                    </p>
                    <p className="text-sm font-medium mt-6 mb-6">
                      현재 인원: {gathering.nowPeople}/{gathering.maxPeople} 명
                    </p>
                    <GatheringBtn meetingId={gathering.id} />
                  </div>
                </div>
                <p className="text-lg mt-4 text-center font-semibold">
                  {gathering.bookTitle}
                </p>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="w-3/4 h-full relative pt-[90px] text-gray-500 text-center">
            모임 정보를 불러오는 중...
          </p>
        )}
      </div>
    </div>
  );
};

export default GatheringSection;
