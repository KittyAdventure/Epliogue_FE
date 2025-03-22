import { useEffect, useState } from 'react';
import axios from 'axios';

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

// const dummyData: Gathering[] = [
//   {
//     meetingId: 1,
//     title: '독서 모임 A',
//     content: '해리포터를 읽고 이야기 나누는 모임입니다.',
//     dateTime: '2025-02-21,12:00:00',
//     bookImage:
//       'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791173321528.jpg',
//     nowPeople: 5,
//     total: 20,
//     bookTitle: '해리포터와 마법사의 돌',
//     location: '서울시 강남구',
//   },
//   {
//     meetingId: 2,
//     title: '독서 모임 B',
//     content: '어린왕자를 읽으며 삶의 의미를 찾아봐요.',
//     dateTime: '2025-02-21,12:00:00',
//     bookImage:
//       'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791194368175.jpg',
//     nowPeople: 8,
//     total: 30,
//     bookTitle:
//       'ETS 토익 단기공략 750+(LC+RC) (기출문제 한국 독점출간, 기출 문항으로 보강한 단기완성 시리즈)',
//     location: '서울시 마포구',
//   },
//   {
//     meetingId: 3,
//     title: '문학 토론회',
//     content: '디스토피아 문학 1984를 주제로 토론합니다.',
//     dateTime: '2025-02-21,12:00:00',
//     bookImage:
//       'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788998441012.jpg',
//     nowPeople: 10,
//     total: 15,
//     bookTitle: '1984',
//     location: '서울시 종로구',
//   },
//   {
//     meetingId: 4,
//     title: '책 읽는 밤',
//     content: '밤에 함께 책을 읽고 감상을 나누는 모임입니다.',
//     dateTime: '2025-02-21,12:00:00',
//     bookImage:
//       'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788936434120.jpg',
//     nowPeople: 3,
//     total: 10,
//     bookTitle: '데미안',
//     location: '서울시 서초구',
//   },
// ];

const GatheringListSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // 검색어 상태
  const [gatherings, setGatherings] = useState<Gathering[]>([]); // 실제 모임 리스트 상태
  const [filteredGatherings, setFilteredGatherings] = useState<Gathering[]>([]); // 필터링된 모임 리스트
  const [participated, setParticipated] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // API에서 gathering 데이터를 가져오는 코드
    const fetchGatherings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_DEV}/meetings/gatherings`,
          {
            params: { page: 1, limit: 10 },
          },
        );
        const fetchedGatherings: Gathering[] = response.data;
        setGatherings(fetchedGatherings); // 받은 데이터를 gatherings 상태에 저장
        setFilteredGatherings(fetchedGatherings); // 필터링된 데이터도 초기화
      } catch (error) {
        console.error('Error loading gathering:', error);
      }
    };
    fetchGatherings();
  }, []); // 컴포넌트 마운트 시 한 번만 호출

  useEffect(() => {
    // 검색어에 따라 모임 리스트를 필터링
    if (searchQuery) {
      setFilteredGatherings(
        gatherings.filter((gathering) =>
          gathering.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    } else {
      setFilteredGatherings(gatherings); // 검색어가 없으면 전체 모임 표시
    }
  }, [searchQuery, gatherings]); // searchQuery나 gatherings가 변경될 때마다 필터링

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
            placeholder="현재 생성된 모임 책 제목 검색하기"
            className="border rounded-full p-3 px-8 w-full pr-10 text-lg" // 검색 아이콘 공간 확보를 위해 padding-right 추가
            value={searchQuery} // 상태값을 입력 필드에 반영
            onChange={(e) => setSearchQuery(e.target.value)} // 입력된 값을 상태에 저장
          />
        </div>
      </div>
      {/* 모임 리스트 */}
      <div className="grid grid-cols-4 gap-14 mt-32 px-24 min-h-[40vh]">
        {filteredGatherings.length > 0 ? (
          filteredGatherings.map((gathering) => (
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
