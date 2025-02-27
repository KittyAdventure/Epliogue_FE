import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface Gathering {
  type: string;
  title: string;
  image: string;
}

const GatheringSection: React.FC = () => {
  const [gathering, setGathering] = useState<Gathering[]>([]);
  const [activeTab, setActiveTab] = useState<string>('online');
  const [currentSlide, setCurrentSlide] = useState(0); // 현재 슬라이드 위치
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/gathering')
      .then((response) => response.json())
      .then((data) => setGathering(data))
      .catch((error) => console.error('Error loading gathering:', error));
  }, []);

  const filteredGathering = gathering.filter(
    (g) => g.type === activeTab || g.type === 'online offline',
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: filteredGathering.length > 2 ? 3 : filteredGathering.length,
    slidesToScroll: 1,
    arrows: true,
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next);
    },
    afterChange: (index: number) => {
      setIsPrevDisabled(index === 0);
      setIsNextDisabled(
        index >= filteredGathering.length - settings.slidesToShow,
      );
    },
  };

  const CustomPrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        className={`absolute left-[-40px] top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300 ease-in-out ${
          isPrevDisabled
            ? 'bg-gray-400 opacity-20'
            : 'bg-black/40 hover:bg-black/70 text-white'
        }`}
        onClick={isPrevDisabled ? undefined : onClick}
        disabled={isPrevDisabled}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6" />
      </button>
    );
  };

  const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        className={`absolute right-[-40px] top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300 ease-in-out ${
          isNextDisabled
            ? 'bg-gray-400'
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
        <h2 className="text-4xl font-bold mb-9">모임 리스트</h2>
        <div className="flex flex-col items-start gap-4">
          <button
            onClick={() => setActiveTab('online')}
            className={`py-2 px-4 ${
              activeTab === 'online' ? 'font-bold bg-gray-100' : 'text-gray-500'
            }`}
          >
            # 온라인
          </button>
          <button
            onClick={() => setActiveTab('offline')}
            className={`py-2 px-4 ${
              activeTab === 'offline'
                ? 'font-bold bg-gray-100'
                : 'text-gray-500'
            }`}
          >
            # 오프라인
          </button>
        </div>
      </div>

      <div className="w-3/4 h-full relative">
        {filteredGathering.length > 0 ? (
          <Slider
            {...settings}
            prevArrow={<CustomPrevArrow />}
            nextArrow={<CustomNextArrow />}
          >
            {filteredGathering.map((gathering, index) => (
              <div key={index} className="w-full">
                <div className="relative w-full" style={{ aspectRatio: '2/3' }}>
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg z-10"></div>
                  <img
                    className="absolute inset-0 w-full h-full object-cover rounded-lg z-5"
                    src={gathering.image}
                    alt={gathering.title}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 z-20">
                    <h3 className="text-lg font-bold line-clamp-1 text-center">
                      {gathering.title}
                    </h3>
                    <p className="text-base mt-4 text-center line-clamp-2">
                      저희 모임은 책을 사랑하는 사람들이 모여 함께 읽고,
                      토론하며, 서로의 생각을 나누는 공간입니다.
                    </p>
                    <p className="mt-12 text-sm">현재 모임 인원 : (10/30)</p>
                    <button className="mt-6 bg-white text-black px-6 py-2 rounded-lg font-bold shadow-md">
                      참여하기
                    </button>
                  </div>
                </div>
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
