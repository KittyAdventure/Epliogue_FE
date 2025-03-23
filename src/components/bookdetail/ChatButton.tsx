import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ChatButtonProps {
  roomId?: number;
  bookName?:string;
  bookId?:string;
  memberId?:string;
}

const ChatButton: React.FC<ChatButtonProps> = ({ roomId,bookName,bookId,memberId }) => {
  console.log(bookName)
  console.log(memberId)
  console.log(bookId)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChatClick = async () => {
    setLoading(true);
    try {
      // 1. 채팅방 목록 조회
      const chatroomsResponse = await axios.get(
        `${import.meta.env.VITE_API_URL_DEV}/api/meeting/chatrooms`,
        {
          params: { page: 1, size: 10 },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
          },
        },
      );
 
      // 2. roomId가 존재하는지 확인
      const existingRoom = chatroomsResponse.data.rooms.find(
        (room: { roomId: number }) => room.roomId === roomId,
      );

      if (existingRoom) {
        // 3. 채팅방이 있다면 참여
        await joinChatRoom(existingRoom.roomId);
      } else {
        // 4. 채팅방이 없다면 새로 생성 후 해당 채팅방 입장
        const newRoom = await createChatRoom();
        if (newRoom?.roomId) {
          await joinChatRoom(newRoom.roomId);
        }
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
        `${import.meta.env.VITE_API_URL_DEV}/api/meeting/chat/participates`,
        {
          roomId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
          },
        },
      );
      navigate(`/ChatPage/${roomId}`); // ✅ roomId만 전달
    } catch (error) {
      console.error('채팅방 참여 중 오류 발생', error);
      alert('채팅방 참여 중 오류가 발생했습니다.');
    }
  };

  // ✅ 채팅방 생성
  const createChatRoom = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_DEV}/api/meeting/chatrooms`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
          },
        },
      );
      return response.data;
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
