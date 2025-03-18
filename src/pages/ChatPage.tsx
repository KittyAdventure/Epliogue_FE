import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs'; // STOMP 클라이언트
import SockJS from 'sockjs-client'; // SockJS 클라이언트
import { X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const { roomId } = useParams(); // URL에서 roomId를 가져옴
  const [messages, setMessages] = useState<any[]>([]); // 메시지 상태
  const [users, setUsers] = useState<string[]>([]); // 사용자 목록 상태
  const [newMessage, setNewMessage] = useState(''); // 새로운 메시지 입력 상태
  const [profile, setProfile] = useState({
    username: 'My username',
    avatar: '/img/members/member6.jpg',
  }); // 프로필 상태
  const [chatRoom, setChatRoom] = useState<any>(null); // 채팅방 정보
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [stompClient, setStompClient] = useState<Client | null>(null); // STOMP 클라이언트 상태

  useEffect(() => {
    if (roomId) {
      fetchChatRoomDetails(roomId);
      fetchMessages(roomId, 1, 10); // 초기 메시지 로드
      fetchParticipants(roomId);
    }

    // WebSocket 연결
    connectWebSocket();

    return () => {
      // 컴포넌트가 언마운트될 때 WebSocket 연결 종료
      if (stompClient) {
        stompClient.deactivate(); // deactivate()로 연결 종료
      }
    };
  }, [roomId]);

  const connectWebSocket = () => {
    // WebSocket 연결 설정
    const socket = new SockJS('http://localhost:8080/ws'); // 서버의 WebSocket URL
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        if (roomId) {
          // 채팅방에 연결하기 위해 해당 roomId로 구독
          client.subscribe(`/topic/chat/${roomId}`, (message) => {
            const newMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                messageId: newMessage.messageId,
                roomId: newMessage.roomId,
                bookId: newMessage.bookId,
                content: newMessage.content,
                timestamp: newMessage.timestamp,
              },
            ]);
          });
        }
      },
      onStompError: (frame) => {
        console.error('STOMP error', frame);
      },
    });
    client.activate(); // WebSocket 활성화
    setStompClient(client); // STOMP 클라이언트 상태 저장
  };

  const fetchChatRoomDetails = async (roomId: string) => {
    try {
      const response = await axios.get(`/api/meeting/chatrooms/${roomId}`);
      setChatRoom(response.data);
    } catch (error) {
      console.error('채팅방 정보를 불러오는 데 실패했습니다.', error);
    }
  };

  const fetchMessages = async (roomId: string, page: number, limit: number) => {
    try {
      const response = await axios.get(
        `/api/meeting/chat/message?roomId=${roomId}&page=${page}&limit=${limit}`,
      );
      setMessages(response.data.messages);
    } catch (error) {
      console.error('메시지를 불러오는 데 실패했습니다.', error);
    }
  };

  const fetchParticipants = async (roomId: string) => {
    try {
      const response = await axios.get(
        `/api/meeting/chat/participates?roomId=${roomId}`,
      );
      const participants = response.data.participants.map(
        (participant: any) => participant.username,
      );
      setUsers(participants);
    } catch (error) {
      console.error('참여자를 불러오는 데 실패했습니다.', error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const messagePayload = {
          roomId,
          memberId: 10, // 현재 로그인된 사용자 ID (예시: 10)
          bookId: 123, // bookId 추가
          content: newMessage,
        };

        // 서버로 메시지 전송 (STOMP를 통해 실시간으로 전송)
        if (stompClient) {
          stompClient.publish({
            destination: `/app/chat/${roomId}`,
            body: JSON.stringify(messagePayload),
          });
        }

        setMessages((prevMessages) => [
          ...prevMessages,
          { username: '나', message: newMessage },
        ]);
        setNewMessage('');
      } catch (error) {
        console.error('메시지 전송에 실패했습니다.', error);
      }
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
  const handleLeaveGroup = async () => {
    try {
      await axios.delete('/api/meeting/chat/participates', {
        data: { roomId, memberId: 10 }, // 현재 로그인된 사용자 ID (예시: 10)
      });
      setMessages([]);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user !== profile.username),
      );
      setProfile({ username: '', avatar: '' });
      navigate(-1);
    } catch (error) {
      console.error('채팅방 나가기에 실패했습니다.', error);
    }
  };

  // 메시지 입력 비우기
  const handleClearInput = () => {
    setNewMessage('');
  };

  // 다른 유저 페이지로 이동 (예시: 유저 프로필 클릭)
  const handleViewUserProfile = (username: string) => {
    navigate(`/user/${username}`);
  };

  if (!chatRoom) {
    return <div>로딩 중...</div>;
  }

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
        <div className="flex flex-col justify-between">
          {/* 인원 목록 */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-white bg-gray-700 p-5 max-h-[65px]">
              현재 채팅 인원 ({users.length}/30)
            </h2>
            {/* 사이드바 */}
            <aside
              className="w-80 overflow-y-auto bg-gray-100 p-2"
              style={{ height: 'calc(850px - 145px)' }}
            >
              <ul className="space-y-4">
                {users.map((user) => (
                  <li
                    key={user}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-4 rounded-lg"
                    onClick={() => handleViewUserProfile(user)} // 클릭 시 프로필 페이지로 이동
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center text-lg font-semibold">
                      {user.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-md text-gray-800">{user}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          {/* 내 프로필 */}
          <div
            className="p-5 bg-gray-700 border-gray-200 max-h-[80px] flex items-center gap-4 rounded-bl-lg cursor-pointer hover:bg-gray-800 transition-all duration-300 ease-in-out transform"
            onClick={() => handleViewUserProfile(profile.username)} // 프로필 클릭 시 마이페이지로 이동
          >
            <img
              src={profile.avatar}
              alt={profile.username}
              className="w-11 h-11 rounded-full object-cover"
            />
            <div className="text-lg font-semibold text-white transition-colors duration-300 ease-in-out hover:text-gray-300">
              {profile.username}
            </div>
          </div>
        </div>

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
          <div className="p-5 bg-gray-100 max-h-[80px] rounded-br-lg my-0">
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
                  onClick={handleClearInput}
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

// test
// import { X } from 'lucide-react';
// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ChatPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState<
//     {
//       username: string;
//       message: string;
//     }[]
//   >([]);
//   const [users, setUsers] = useState([
//     'usernameA',
//     'usernameB',
//     'usernameC',
//     'usernameD',
//   ]);
//   const [newMessage, setNewMessage] = useState('');
//   const [profile, setProfile] = useState({
//     username: 'My username',
//     avatar: '/img/members/member6.jpg',
//   });

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const chatContainerRef = useRef<HTMLDivElement>(null);

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { username: '나', message: newMessage },
//       ]);
//       setNewMessage('');
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && newMessage.trim()) {
//       handleSendMessage();
//       e.preventDefault();
//     }
//   };

//   // 메시지가 추가될 때마다 스크롤을 아래로 이동
//   useEffect(() => {
//     chatContainerRef.current?.scrollTo({
//       top: chatContainerRef.current.scrollHeight,
//       behavior: 'smooth',
//     });
//   }, [messages]);

//   // 가짜 데이터 로드
//   useEffect(() => {
//     // 여기에서 가짜 데이터를 설정합니다.
//     setMessages([
//       { username: 'usernameA', message: '안녕하세요!' },
//       { username: 'usernameB', message: '반갑습니다!' },
//       { username: 'usernameC', message: '채팅방에 오신 것을 환영합니다.' },
//     ]);
//     setUsers(['usernameA', 'usernameB', 'usernameC', 'usernameD']);
//     setProfile({
//       username: 'My username',
//       avatar: '/img/members/member6.jpg',
//     });
//   }, []);

//   // 모임 나가기 처리
//   const handleLeaveGroup = () => {
//     setMessages([]);
//     setUsers((prevUsers) =>
//       prevUsers.filter((user) => user !== profile.username),
//     );
//     setProfile({
//       username: '',
//       avatar: '',
//     });
//     navigate(-1);
//   };

//   // 메시지 입력 비우기
//   const handleClearInput = () => {
//     setNewMessage('');
//   };

//   // 다른 유저 페이지로 이동 (예시: 유저 프로필 클릭)
//   const handleViewUserProfile = (username: string) => {
//     navigate(`/user/${username}`);
//   };
