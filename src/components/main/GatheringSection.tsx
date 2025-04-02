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
        // console.log('API 응답 데이터:', response.data);
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
              <div key={gathering.memberId} className="w-full wrapper">
                <div className="col">
                  {/* container */}
                  <div
                    className="container relative w-full group rounded-lg"
                    style={{
                      aspectRatio: '2/3',
                      perspective: '1000px', // 3D 효과를 위한 perspective
                    }}
                  >
                    {/* Hover 유도 문구 */}
                    <div className="absolute -top-7 w-full flex justify-center items-center text-black text-lg font-semibold drop-shadow-md opacity-80 group-hover:opacity-0 group-hover:translate-y-[-4px] transition-all duration-500 ease-in-out">
                      <span className="flex items-center animate-bounce">
                        🖱️ 마우스 올려서 정보 확인하기
                      </span>
                    </div>
                    {/* front: 카드의 앞면 */}
                    <div
                      className="front absolute inset-0 w-full h-full group-hover:rotate transition-all duration-300 ease-in-out"
                      style={{
                        transformStyle: 'preserve-3d', // 3D 효과 적용
                        backfaceVisibility: 'hidden', // 뒷면이 보이지 않도록 설정
                        backgroundImage: `url(${gathering.bookImage})`, // 배경 이미지로 책 이미지 설정
                        backgroundSize: 'cover', // 배경 이미지 크기 조정
                        backgroundPosition: 'center', // 이미지의 중심에 맞추기
                        borderRadius: '10px', // 부드러운 모서리 처리
                      }}
                    >
                      <div className="inner flex flex-col items-center justify-center w-full h-full rounded-lg p-4">
                        <h3 className="text-2xl font-semibold text-white text-center drop-shadow-md">
                          {gathering.title}
                        </h3>
                        <p className="text-base font-medium mt-6 mb-1 text-white drop-shadow-md">
                          현재 인원: {gathering.nowPeople}/{gathering.maxPeople}{' '}
                          명
                        </p>
                      </div>
                    </div>

                    {/* back: 카드의 뒷면 */}
                    <div
                      className="back absolute inset-0 w-full h-full group-hover:rotate-back transition-all duration-300 ease-in-out bg-gradient-to-b from-gray-900 via-gray-700 to-gray-900 shadow-xl"
                      style={{
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden',
                        borderRadius: '10px',
                      }}
                    >
                      <div className="inner flex flex-col items-center justify-center gap-2 p-6 text-base text-center text-white drop-shadow-md">
                        <p>
                          <span className="font-semibold">모임소개 :</span>{' '}
                          {gathering.content}
                        </p>
                        <p>
                          <span className="font-semibold">일정 :</span>{' '}
                          {gathering.dateTime}
                        </p>
                        <p>
                          <span className="font-semibold">장소 :</span>{' '}
                          {gathering.location}
                        </p>
                        <GatheringBtn meetingId={gathering.id} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 책 제목 */}
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
