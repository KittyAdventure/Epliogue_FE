import { useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

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

const GatheringListSection: React.FC = () => {
  // const [gatherings, setGatherings] = useState<Gathering[]>([]); // API 응답을 저장할 상태

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

  return (
    <div className="container mx-auto p-4 mt-[80px]">
      <h2 className="text-3xl font-bold mb-8">전체 모임 리스트</h2>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="현재 생성된 모임 책 제목 검색하기"
          className="border rounded-full p-3 px-8 w-full pr-10 text-lg" // 검색 아이콘 공간 확보를 위해 padding-right 추가
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FiSearch />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-32 mt-32">
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
      </div>
    </div>
  );
};

export default GatheringListSection;
