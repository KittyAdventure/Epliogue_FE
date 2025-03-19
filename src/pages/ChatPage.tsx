import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>(); // 타입을 명확히 지정
  const [messages, setMessages] = useState<
    { username: string; message: string }[]
  >([]);
  const [users, setUsers] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [profile, setProfile] = useState({
    username: 'My username',
    avatar: '/img/members/member6.jpg',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // ✅ 가짜 채팅방 데이터
  const fakeChatRooms = [
    { roomId: 1, bookname: '채식주의자', bookid: '9788936434595' },
    { roomId: '2', bookname: '테스트 책2', bookid: '456' },
  ];

  useEffect(() => {
    if (!roomId) {
      // ✅ roomId가 없으면 가짜 데이터에서 roomId 설정 (1번 채팅방으로)
      navigate(`/ChatPage/999`);
    }

    // ✅ 가짜 채팅 데이터 설정
    setMessages([
      { username: 'usernameA', message: '안녕하세요!' },
      { username: 'usernameB', message: '반갑습니다!' },
      { username: 'usernameC', message: '채팅방에 오신 것을 환영합니다.' },
    ]);
    setUsers(['usernameA', 'usernameB', 'usernameC', 'usernameD']);
  }, [roomId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { username: '나', message: newMessage },
      ]);
      setNewMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newMessage.trim()) {
      handleSendMessage();
      e.preventDefault();
    }
  };

  // 스크롤을 아래로 이동
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  // ✅ 채팅방 입장 버튼 클릭 시 roomId로 이동
  const handleJoinChat = (roomId: string) => {
    navigate(`/ChatPage/${roomId}`);
  };

  // 채팅방 나가기
  const handleLeaveGroup = () => {
    setMessages([]);
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user !== profile.username),
    );
    setProfile({ username: '', avatar: '' });
    navigate(-1);
  };

  return (
    <div className="flex flex-col section-wrap rounded-lg shadow-lg overflow-hidden bg-gray-50 my-10">
      {/* 제목 */}
      <div className="flex justify-between bg-black p-6 rounded-t-lg shadow-md">
        <h1 className="text-3xl font-semibold text-white">
          자유 치유할 수 없는 질병
          <span className="ml-4 text-base font-medium text-gray-300">
            온라인 채팅창
          </span>
        </h1>
        {profile.username && (
          <button
            className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-2 font-semibold transition-colors duration-300"
            onClick={handleLeaveGroup}
          >
            채팅 나가기
          </button>
        )}
      </div>

      <div className="flex flex-1 bg-white rounded-b-lg">
        {/* 사이드바 - 채팅방 목록 */}
        <aside className="w-80 overflow-y-auto bg-gray-100 p-2">
          <h2 className="text-lg font-semibold text-white bg-gray-700 p-5 max-h-[65px]">
            채팅방 목록
          </h2>
          <ul className="space-y-4">
            {fakeChatRooms.map((room) => (
              <li
                key={room.roomId}
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-4 rounded-lg"
                onClick={() => handleJoinChat(room.roomId)}
              >
                <div className="text-md text-gray-800">{room.bookname}</div>
              </li>
            ))}
          </ul>
        </aside>

        {/* 채팅 영역 */}
        <main className="flex-1 flex flex-col justify-between h-[850px]">
          <div
            ref={chatContainerRef}
            className="flex-1 space-y-4 p-9 max-h-[60vh]"
            style={{ overflowY: 'auto', maxHeight: '769px' }}
          >
            {messages.map((message, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center text-lg font-semibold">
                  {message.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700">
                    {message.username}
                  </div>
                  <div className="text-sm text-gray-800 bg-gray-200 p-3 rounded-lg shadow-sm">
                    {message.message}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 메시지 입력 영역 */}
          <div className="p-5 bg-gray-100 max-h-[80px] rounded-br-lg">
            <div className="relative flex items-center space-x-3 w-full">
              <input
                type="text"
                className="relative flex-1 rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="메시지를 입력하세요..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {newMessage && (
                <button
                  className="absolute right-[6rem] top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setNewMessage('')}
                  aria-label="Clear message"
                >
                  <X size={20} />
                </button>
              )}
              <button
                className="bg-gray-700 hover:bg-gray-800 text-white rounded-full px-6 py-2 font-semibold transition-colors duration-300"
                onClick={handleSendMessage}
              >
                전송
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatPage;
