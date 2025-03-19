import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ChatButtonProps {
  memberId: number;
  bookName: string;
  bookId: string; // bookId를 받도록 추가
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
      // 1. 채팅방 목록을 가짜 데이터로 설정
      const fakeChatRooms = [
        { roomId: 1, bookname: '채식주의자', bookid: '9788936434595' },
        { roomId: 2, bookname: '테스트 책2', bookid: '456' },
      ];

      console.log('가짜 채팅방 목록:', fakeChatRooms);

      // 2. 해당 책 제목과 bookId에 맞는 채팅방을 찾는다.
      const existingRoom = fakeChatRooms.find(
        (room) => room.bookname === bookName && room.bookid === bookId,
      );

      if (existingRoom) {
        console.log(`기존 채팅방(${existingRoom.roomId})을 찾음.`);
        await joinChatRoom(existingRoom.roomId);
      } else {
        console.log('해당 책의 채팅방이 없음, 새로 생성.');
        await createChatRoom();
      }
    } catch (error) {
      console.error('채팅방 조회 또는 생성 중 오류 발생', error);
    } finally {
      setLoading(false);
    }
  };

  // 채팅방 참여
  const joinChatRoom = async (roomId: number) => {
    try {
      console.log(`채팅방(${roomId})에 참가합니다.`); // 실제 API 호출 대신 로그 출력
      navigate(`/ChatPage/${roomId}`); // 채팅방 페이지로 이동
    } catch (error) {
      console.error('채팅방 참여 중 오류 발생', error);
      alert('채팅방 참여 중 오류가 발생했습니다.');
    }
  };

  // 채팅방 생성
  const createChatRoom = async () => {
    try {
      console.log('새로운 채팅방을 생성합니다.'); // 실제 API 호출 대신 로그 출력
      const fakeRoomId = 999; // 가짜 채팅방 ID
      navigate(`/ChatPage/${fakeRoomId}`); // 새로 생성된 채팅방 페이지로 이동
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
