import axios from 'axios';
import { useEffect, useState } from 'react';
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

const GatheringListSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [gatherings, setGatherings] = useState<Gathering[]>([]);
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


  return (
    <div className="section-wrap mx-auto p-4 mt-[80px] mb-56">
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
            <div
              key={`${gathering.memberId}-${index}`}
              className="w-full wrapper"
            >
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
