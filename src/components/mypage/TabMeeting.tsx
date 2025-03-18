/**
 * 마이페이지 콘텐츠 컴포넌트
 */
import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';

interface Meeting {
  meetingId: string;
  meetingBookTitle: string;
  meetingPeople: string;
  dateTime: string;
  location: string;
  thumbnail: string;
}

const TabMeeting = (): React.JSX.Element => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchMeetings = async (memberId: string, page: number) => {
    try {
      const apiUrl =
        import.meta.env.NODE === 'production'
          ? import.meta.env.VITE_API_URL_PROD
          : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.get(`${apiUrl}/mypage/meeting`, {
        params: { memberId, page },
      });

      console.log(response.data);
      setTotalPages(response.data.totalPages);
      setMeetings(response.data.meetings);
    } catch (error) {
      console.error('Failed to fetch meetings', error);
    }
  };

  useEffect(() => {
    fetchMeetings('test111', page);
  }, [page]);

  return (
    <div className="mt-20">
      <h3 className="text-2xl">나의 모임</h3>
      <div className="flex flex-wrap gap-y-20 justify-between w-full mt-10">
        {meetings.length > 0 ? (
          meetings.map((meeting) => (
            <div
              key={meeting.meetingId}
              className="meetingPost w-[480px] h-[300px] px-5 py-10 rounded-xl shadow-md hover:cursor-pointer"
              // onClick={()=> openMeetingModal()}
            >
              <div className="meetingContainer flex p-x-5">
                <img
                  src={meeting.thumbnail}
                  alt="meeting book thumbnail"
                  className="block w-[145px] max-h-[220px]"
                />
                <div className="meetingInfo pl-5">
                  <h4 className="font-bold leading-[60px]">
                    {meeting.meetingBookTitle}
                    <span className="ml-5 text-gray-500">
                      {meeting.meetingPeople}참가 중
                    </span>
                  </h4>
                  <h5 className="leading-5 font-bold mt-5">일정</h5>
                  <p className="leading-5">{meeting.dateTime}</p>

                  <h5 className="leading-5 font-bold mt-5">장소</h5>
                  <p className="leading-5 h-[60px] line-clamp-3">
                    {meeting.location}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>모임에 한번 참여해보세요</p>
        )}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};
export default TabMeeting;
