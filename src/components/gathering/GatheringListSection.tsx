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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [gatherings, setGatherings] = useState<Gathering[]>([]);
  const [participated, setParticipated] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const gatheringsPerPage = 8;

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
  }, [currentPage]);

  const filteredGatherings = gatherings.filter((gathering) =>
    gathering.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredGatherings.length / gatheringsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const startIndex = (currentPage - 1) * gatheringsPerPage;
  const endIndex = startIndex + gatheringsPerPage;
  const currentGatherings = filteredGatherings.slice(startIndex, endIndex);

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
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="책 제목을 입력하여 모임을 검색하세요."
            className="border rounded-full p-3 px-8 w-full pr-10 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-14 mt-32 px-24 min-h-[40vh]">
        {currentGatherings.length > 0 ? (
          currentGatherings.map((gathering, index) => (
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

      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-4 py-2 rounded-full ${
              currentPage === index + 1
                ? 'bg-gray-200 text-black'
                : 'bg-white text-black'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GatheringListSection;
