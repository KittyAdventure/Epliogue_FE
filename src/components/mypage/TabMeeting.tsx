/**
 * 마이페이지 콘텐츠 컴포넌트
 */
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import Pagination from './Pagination';
import {apiUrl} from "../../utility/AuthUtils"

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

  const accessToken = localStorage.getItem('accesstoken');
  const memberId = localStorage.getItem('memberId');

  const fetchMeetings = useCallback(async () => {
    if(!memberId || !accessToken) return
    try {
      const response = await axios.get(`${apiUrl}/api/mypage/meeting`, {
        params: { memberId, page },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response?.data) {
        console.log("TabMeeting Resp", response)
        const { totalPages, meetings} = response.data
        setTotalPages(totalPages);
        setMeetings(meetings);
      }
    } catch (error) {
      console.error('Failed to fetch meetings', error);
    }
  }, [accessToken, memberId, page]);

  useEffect(() => {
    fetchMeetings()
  }, [fetchMeetings]);

  return (
    <div className="mt-20">
      <h3 className="text-2xl font-semibold">나의 모임</h3>
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
          <p>모임에 한번 참석해보세요</p>
        )}
      </div>
      {meetings.length > 0 ? (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      ) : null}
    </div>
  );
};
export default TabMeeting;
