import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ChatButtonProps {
  memberId: string;
  bookName: string;
  bookId: string;
}

const ChatButton: React.FC<ChatButtonProps> = ({
  memberId,
  bookName,
  bookId,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChatClick = async () => {
    setLoading(true);
    try {
      // 1. 채팅방 목록 조회
      const chatroomsResponse = await axios.get(
        `${import.meta.env.VITE_API_URL_DEV}/meeting/chatrooms`,
        {
          params: { page: 1, limit: 10 },
        },
      );

      // 2. 해당 책 제목과 bookId에 맞는 채팅방 찾기
      const existingRoom = chatroomsResponse.data.rooms.find(
        (room: { bookname: string; bookid: string }) =>
          room.bookname === bookName && room.bookid === bookId,
      );

      if (existingRoom) {
        // 3. 채팅방이 있다면 참여
        await joinChatRoom(existingRoom.roomId);
      } else {
        // 4. 채팅방이 없다면 새로 생성
        await createChatRoom();
      }
    } catch (error) {
      console.error('채팅방 조회 또는 생성 중 오류 발생', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ 채팅방 참여
  const joinChatRoom = async (roomId: number) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL_DEV}/meeting/chat/participates`,
        {
          roomId,
          memberId,
          bookId,
        },
      );
      navigate(`/ChatPage/${roomId}`, { state: { memberId, bookId } }); // ✅ state로 데이터 전달
    } catch (error) {
      console.error('채팅방 참여 중 오류 발생', error);
      alert('채팅방 참여 중 오류가 발생했습니다.');
    }
  };

  // ✅ 채팅방 생성
  const createChatRoom = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_DEV}/meeting/chatrooms`,
        {
          memberId,
          bookname: bookName,
        },
      );
      const roomId = response.data.roomId;
      navigate(`/ChatPage/${roomId}`, { state: { memberId, bookId } }); // ✅ state로 데이터 전달
    } catch (error) {
      console.error('채팅방 생성 중 오류 발생', error);
      alert('채팅방 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <button
      className="bg-white hover:bg-black/10 text-black font-bold py-3 px-7 rounded-lg shadow-lg"
      onClick={handleChatClick}
      disabled={loading}
    >
      {loading ? '로딩 중...' : '채팅하기'}
    </button>
  );
};

export default ChatButton;
