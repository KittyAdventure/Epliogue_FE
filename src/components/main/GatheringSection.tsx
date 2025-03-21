import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MdNavigateNext } from 'react-icons/md';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface Gathering {
  meetingId: number;
  hostId?: number;
  title: string;
  content: string;
  dateTime: string;
  location: string;
  nowPeople: number;
  total?: number;
  bookTitle: string;
  bookImage: string;
}

const dummyData: Gathering[] = [
  {
    meetingId: 1,
    title: '독서 모임 A',
    content:
      '해리포터를 읽고 이야기 나누는 모임입니다.해리포터를 읽고 이야기 나누는 모임입니다.해리포터를 읽고 이야기 나누는 모임입니다.해리포터를 읽고 이야기 나누는 모임입니다.해리포터를 읽고 이야기 나누는 모임입니다.해리포터를 읽고 이야기 나누는 모임입니다.해리포터를 읽고 이야기 나누는 모임입니다.해리포터를 읽고 이야기 나누는 모임입니다.해리포터를 읽고 이야기 나누는 모임입니다.해리포터를 읽고 이야기 나누는 모임입니다.해리포터를 읽고 이야기 나누는 모임입니다.해리포터를 읽고 이야기 나누는 모임입니다.',
    dateTime: '2025-02-21,12:00:00',
    bookImage:
      'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791173321528.jpg',
    nowPeople: 5,
    total: 20,
    bookTitle: '해리포터와 마법사의 돌',
    location: '서울시 강남구',
  },
  {
    meetingId: 2,
    title: '독서 모임 B',
    content: '어린왕자를 읽으며 삶의 의미를 찾아봐요.',
    dateTime: '2025-02-21,12:00:00',
    bookImage:
      'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791194368175.jpg',
    nowPeople: 8,
    total: 30,
    bookTitle:
      'ETS 토익 단기공략 750+(LC+RC) (기출문제 한국 독점출간, 기출 문항으로 보강한 단기완성 시리즈)',
    location: '서울시 마포구',
  },
  {
    meetingId: 3,
    title: '문학 토론회',
    content: '디스토피아 문학 1984를 주제로 토론합니다.',
    dateTime: '2025-02-21,12:00:00',
    bookImage:
      'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788998441012.jpg',
    nowPeople: 10,
    total: 15,
    bookTitle: '1984',
    location: '서울시 종로구',
  },
  {
    meetingId: 4,
    title: '책 읽는 밤',
    content: '밤에 함께 책을 읽고 감상을 나누는 모임입니다.',
    dateTime: '2025-02-21,12:00:00',
    bookImage:
      'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788936434120.jpg',
    nowPeople: 3,
    total: 10,
    bookTitle: '데미안',
    location: '서울시 서초구',
  },
];

const GatheringSection: React.FC = () => {
  // const [gatherings, setGatherings] = useState<Gathering[]>([]); // API 응답을 저장할 상태
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const navigate = useNavigate();

  const GatheringPage = () => {
    navigate(`/gathering`);
  };

  useEffect(() => {
    // const fetchGatherings = async () => {
    //   try {
    //     const response = await axios.get(
    //       `${import.meta.env.VITE_API_URL_DEV}/meetings/gatherings`,
    //       {
    //         params: { page: 1, limit: 10 },
    //       },
    //     );
    //     setGatherings(response.data);
    //   } catch (error) {
    //     console.error('Error loading gathering:', error);
    //   }
    // };
    // fetchGatherings();
  }, []);

  const slidesToShow = Math.min(dummyData.length, 3);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow > 0 ? slidesToShow : 1,
    slidesToScroll: 1,
    arrows: true,
    afterChange: (index: number) => {
      setIsPrevDisabled(index === 0);
      setIsNextDisabled(index >= dummyData.length - slidesToShow);
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
          onClick={GatheringPage}
        >
          <span className="mr-2">전체 모임 리스트 보러가기</span>
          <MdNavigateNext size={20} />
        </button>
      </div>

      <div className="w-3/4 h-full relative pt-[90px]">
        {dummyData.length > 0 ? (
          <Slider
            {...settings}
            prevArrow={<CustomPrevArrow />}
            nextArrow={<CustomNextArrow />}
          >
            {dummyData.map((gathering) => (
              <div key={gathering.meetingId} className="w-full">
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
                    <p className="text-sm font-medium mt-6">
                      현재 인원: {gathering.nowPeople}/{gathering.total} 명
                    </p>
                    <button className="transition-all duration-300 ease-in-out mt-2 bg-white text-black px-6 py-2 rounded-lg font-bold shadow-md hover:bg-black hover:text-white">
                      참여하기
                    </button>
                  </div>
                </div>
                <p className="text-lg mt-4 text-center font-semibold">
                  {gathering.bookTitle}
                </p>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-gray-500">모임 정보를 불러오는 중...</p>
        )}
      </div>
    </div>
  );
};

export default GatheringSection;
