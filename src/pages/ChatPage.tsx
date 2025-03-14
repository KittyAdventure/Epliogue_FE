import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<
    {
      username: string;
      message: string;
    }[]
  >([]);
  const [users, setUsers] = useState([
    'usernameA',
    'usernameB',
    'usernameC',
    'usernameD',
    'usernameA',
    'usernameB',
    'usernameC',
    'usernameD',
    'usernameA',
    'usernameB',
    'usernameC',
    'usernameD',
    'usernameA',
    'usernameB',
    'usernameC',
    'usernameD',
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [profile, setProfile] = useState({
    username: 'My username',
    avatar: '/img/members/member6.jpg',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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

  // 메시지가 추가될 때마다 스크롤을 아래로 이동
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  // 모임 나가기 처리
  const handleLeaveGroup = () => {
    setMessages([]);
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user !== profile.username),
    );
    setProfile({
      username: '',
      avatar: '',
    });
    navigate(-1);
  };

  return (
    <div className="flex flex-col section-wrap rounded-lg shadow-lg overflow-hidden bg-gray-50 my-10">
      {/* 제목 */}
      <div className="flex justify-between bg-black p-6 rounded-t-lg shadow-md">
        <h1 className="text-3xl font-semibold text-white">모임 명</h1>
        {profile.username && (
          <button
            className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-2 font-semibold transition-colors duration-300"
            onClick={handleLeaveGroup}
          >
            모임 나가기
          </button>
        )}
      </div>

      <div className="flex flex-1 bg-white rounded-b-lg">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-white bg-gray-700 p-5 max-h-[65px]">
            모임 인원 목록 ({users.length}/300)
          </h2>
          {/* 사이드바 */}
          <aside
            className="w-80 bg-gray-100 border-r border-gray-200 p-6 overflow-y-auto"
            style={{ overflowY: 'auto', maxHeight: '55vh' }}
          >
            <ul className="space-y-4">
              {users.map((user) => (
                <li key={user} className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center text-lg font-semibold">
                    {user.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-md text-gray-800">{user}</span>
                </li>
              ))}
            </ul>
          </aside>

          {/* 내 프로필 */}
          <div className="p-5 bg-gray-700 border-gray-200 my-auto max-h-[80px] flex items-center gap-4 rounded-bl-lg">
            <img
              src={profile.avatar}
              alt={profile.username}
              className="w-11 h-11 rounded-full object-cover"
            />
            <div className="text-lg font-semibold text-white">
              {profile.username}
            </div>
          </div>
        </div>

        {/* 채팅 영역 */}
        <main className="flex-1 flex flex-col justify-between">
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
            <div className="flex items-center space-x-3">
              <input
                type="text"
                className="flex-1 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="메시지를 입력하세요..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
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
