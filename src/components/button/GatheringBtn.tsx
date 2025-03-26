import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utility/AuthContext';
import { redirectToLogin } from '../../utility/AuthUtils';

interface GatheringBtnProps {
  meetingId: number;
}

const GatheringBtn: React.FC<GatheringBtnProps> = ({ meetingId }) => {
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [participated, setParticipated] = useState<{ [key: number]: boolean }>({
    [meetingId]: isJoined,
  });
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { loggedIn } = authContext;

  // 모임 참가 API 호출
  const joinMeeting = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('accesstoken');
      if (!loggedIn) {
        redirectToLogin(navigate);
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_DEV}/api/meetings/gatherings/join`,
        { meetingId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        setIsJoined(true);
        setParticipated((prev) => ({ ...prev, [meetingId]: true }));
        alert('모임에 참가하셨습니다!');
      }
    } catch (error) {
      console.error('모임 참가 실패:', error);
      setError('모임 참가에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 모임 나가기 API 호출
  const leaveMeeting = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('accesstoken');
      if (!loggedIn) {
        redirectToLogin(navigate);
        return;
      }

      const response = await axios.delete(
        `${
          import.meta.env.VITE_API_URL_DEV
        }/api/meetings/gatherings/${meetingId}/leave`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          data: { meetingId },
        },
      );

      if (response.status === 200) {
        setIsJoined(false);
        setParticipated((prev) => ({ ...prev, [meetingId]: false }));
        alert('모임을 나갔습니다.');
      }
    } catch (error) {
      console.error('모임 나가기 실패:', error);
      setError('모임 나가기 실패');
    } finally {
      setLoading(false);
    }
  };

  // 버튼 클릭 핸들러
  const handleParticipateClick = () => {
    if (participated[meetingId]) {
      leaveMeeting();
    } else {
      joinMeeting();
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* {loading && <p className="text-gray-500">로딩 중...</p>} */}
      {error && <p className="text-red-500">{error}</p>}

      <button
        className={`transition-all duration-300 ease-in-out mt-2 px-6 py-2 rounded-full font-bold shadow-md ${
          participated[meetingId]
            ? 'bg-blue-500 text-white hover:bg-blue-700'
            : 'bg-white text-black hover:bg-black hover:text-white'
        }`}
        onClick={handleParticipateClick}
        disabled={loading}
      >
        {participated[meetingId] ? '참여완료' : '참여하기'}
      </button>
    </div>
  );
};

export default GatheringBtn;
