import axios from 'axios';
import { useEffect, useState } from 'react';

interface Gathering {
  id?: number;
  meetingId: number;
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

const GatheringListSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // 검색어 상태
  const [gatherings, setGatherings] = useState<Gathering[]>([]); // 전체 모임 목록
  const [participated, setParticipated] = useState<Record<number, boolean>>({});

  // 모임 리스트 데이터 불러오기
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

  // 검색어로 모임 필터링
  const filteredGatherings = gatherings.filter(
    (gathering) =>
      gathering.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()), // 책 제목에 검색어가 포함된 경우만 필터링
  );

  // 참여 버튼 클릭 처리
  const handleParticipateClick = (meetingId: number) => {
    setParticipated((prevState) => ({
      ...prevState,
      [meetingId]: true,
    }));
  };

  return (
    <div className="container mx-auto p-4 mt-[80px] mb-56">
      <div className="mx-24">
        <h2 className="text-3xl font-bold mb-8">전체 모임 리스트</h2>
        {/* 모임 검색 */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="책 제목을 입력하여 모임을 검색하세요."
            className="border rounded-full p-3 px-8 w-full pr-10 text-lg" // 검색 아이콘 공간 확보를 위해 padding-right 추가
            value={searchQuery} // 상태값을 입력 필드에 반영
            onChange={(e) => setSearchQuery(e.target.value)} // 입력된 값을 상태에 저장
          />
        </div>
      </div>
      {/* 모임 리스트 */}
      <div className="grid grid-cols-4 gap-14 mt-32 px-24 min-h-[40vh]">
        {filteredGatherings.length > 0 ? (
          filteredGatherings.map((gathering, index) => (
            <div key={`${gathering.meetingId}-${index}`} className="w-full">
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
                    현재 인원: {gathering.nowPeople}/{gathering.maxPeople} 명
                  </p>
                  <button
                    className={`transition-all duration-300 ease-in-out mt-2 px-6 py-2 rounded-full font-bold shadow-md ${
                      participated[gathering.meetingId]
                        ? 'bg-blue-500 text-white hover:bg-blue-700'
                        : 'bg-white text-black hover:bg-black hover:text-white'
                    }`}
                    onClick={() => handleParticipateClick(gathering.meetingId)}
                  >
                    {participated[gathering.meetingId]
                      ? '참여완료'
                      : '참여하기'}
                  </button>
                </div>
              </div>
              <p className="text-lg mt-4 text-center font-semibold">
                {gathering.bookTitle}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center text-xl font-semibold text-gray-500">
            해당하는 모임이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default GatheringListSection;
