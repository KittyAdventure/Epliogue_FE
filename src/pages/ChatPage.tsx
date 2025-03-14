import React, { useEffect, useRef, useState } from 'react';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<
    {
      username: string;
      message: string;
    }[]
  >([]);
  const [users] = useState([
    'usernameA',
    'usernameB',
    'usernameC',
    'usernameD',
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialRender = useRef(false); // 초기에만 스크롤 방지

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
      e.preventDefault(); // 엔터키로 기본 줄바꿈을 방지
    }
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[80vh] section-wrap mx-auto rounded-lg shadow-lg overflow-hidden bg-gray-50 my-10">
      {/* 제목 */}
      <div className="bg-gray-800 p-6 rounded-t-lg shadow-md">
        <h1 className="text-3xl font-semibold text-white">모임 명</h1>
      </div>

      <div className="flex flex-1 bg-white rounded-b-lg">
        {/* 사이드바 */}
        <aside className="w-80 bg-gray-100 border-r border-gray-200 p-6 overflow-y-auto">
          <h2 className="text-lg font-medium text-gray-700 mb-6">
            모임 인원 목록 ({users.length}/301)
          </h2>
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

        {/* 채팅 영역 */}
        <main className="flex-1 flex flex-col justify-between">
          {/* 채팅 메시지 목록 */}
          <div className="flex-1 overflow-y-auto space-y-4 p-8 max-h-[60vh]">
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
          <div className="p-4 border-t bg-gray-100">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="메시지를 입력하세요..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown} // 엔터키 감지
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
