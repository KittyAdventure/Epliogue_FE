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
                {/* 이미지 비율 유지 */}
                <div className="relative w-full" style={{ aspectRatio: '2/3' }}>
                  <img
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    src={gathering.image}
                    alt={gathering.title}
                  />
                </div>
                <div className="font-bold text-center mt-2">
                  {gathering.title}
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
