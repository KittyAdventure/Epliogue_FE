import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface Gathering {
  type: string; // 'online' 또는 'offline'
  title: string;
  image: string;
}

const GatheringSection: React.FC = () => {
  const [gathering, setGathering] = useState<Gathering[]>([]);
  const [activeTab, setActiveTab] = useState<string>('online'); // 기본 활성 탭 'online'

  useEffect(() => {
    fetch('http://localhost:5000/gathering')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setGathering(data); // 서버에서 가져온 gathering 데이터를 상태에 설정
      })
      .catch((error) => console.error('Error loading gathering:', error));
  }, []);

  // 'online' 또는 'offline'에 맞는 gathering만 필터링
  const filteredGathering = gathering.filter(
    (gathering) =>
      gathering.type === activeTab || gathering.type === 'online offline',
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: filteredGathering.length > 2 ? 3 : filteredGathering.length,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="section-wrap max-w-6xl mx-auto flex gap-16">
      {/* 왼쪽 텍스트 영역 */}
      <div className="w-1/4">
        <h2 className="text-4xl font-bold mb-9">모임 리스트</h2>

        {/* 탭 메뉴 UI */}
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

      {/* 오른쪽 슬라이드 영역 */}
      <div className="w-3/4 h-full">
        {filteredGathering.length > 0 ? (
          <Slider {...settings}>
            {filteredGathering.map((gathering, index) => (
              <div key={index} className="w-full">
                {/* 이미지 컨테이너 */}
                <div className="relative w-full" style={{ aspectRatio: '2/3' }}>
                  {/* 반투명 검정 오버레이 (z-index: 10) */}
                  <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg z-10"></div>

                  {/* 이미지 (z-index: 5) */}
                  <img
                    className="absolute inset-0 w-full h-full object-cover rounded-lg z-5"
                    src={gathering.image}
                    alt={gathering.title}
                  />

                  {/* 텍스트 및 버튼 컨텐츠 (z-index: 20) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 z-20">
                    <h3 className="text-lg font-bold line-clamp-1 text-center">
                      {gathering.title}
                    </h3>
                    <p className="text-sm mt-4 text-center line-clamp-2">
                      저희 모임은 책을 사랑하는 사람들이 모여 함께 읽고,
                      토론하며, 서로의 생각을 나누는 공간입니다. 문학, 역사,
                      철학, 과학 등 다양한 분야의 책을 읽으며 세상을 바라보는
                      시야를 넓히고, 깊이 있는 대화를 통해 삶의 지혜를 얻고자
                      합니다.
                    </p>
                    <p className="mt-12 text-sm">현재 모임 인원 : (10/30)</p>

                    {/* 참여하기 버튼 */}
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
