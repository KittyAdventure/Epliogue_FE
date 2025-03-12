import { useState } from 'react';

interface Comment {
  id: number;
  username: string;
  content: string;
  time: string;
  profileImage?: string;
}

const commentsData: Comment[] = [
  {
    id: 1,
    username: 'Username',
    content:
      '평범한 여성 영혜가 육식을 거부하면서 시작되는 충격적이고 기괴한 변화의 과정을 그립니다. 가족과 사회의 압박 속에서 영혜는 점차 극단적인 선택을 하게 되며, 인간 본성과 욕망, 그리고 광기에 대한 깊은 통찰을 제공합니다. 이 소설은 아름다움과 잔혹함이 공존하는 강렬한 문체와 함께 독자를 끌어들입니다.',
    time: '3개월 전',
    profileImage: 'https://randomuser.me/api/portraits/men/20.jpg',
  },
  {
    id: 2,
    username: 'Username',
    content:
      '평범한 여성 영혜가 육식을 거부하면서 시작되는 충격적이고 기괴한 변화의 과정을 그립니다. 가족과 사회의 압박 속에서 영혜는 점차 극단적인 선택을 하게 되며, 인간 본성과 욕망, 그리고 광기에 대한 깊은 통찰을 제공합니다. 이 소설은 아름다움과 잔혹함이 공존하는 강렬한 문체와 함께 독자를 끌어들입니다.',
    time: '3개월 전',
    profileImage: 'https://randomuser.me/api/portraits/men/6.jpg',
  },
  {
    id: 3,
    username: 'Username',
    content:
      '평범한 여성 영혜가 육식을 거부하면서 시작되는 충격적이고 기괴한 변화의 과정을 그립니다. 가족과 사회의 압박 속에서 영혜는 점차 극단적인 선택을 하게 되며, 인간 본성과 욕망, 그리고 광기에 대한 깊은 통찰을 제공합니다. 이 소설은 아름다움과 잔혹함이 공존하는 강렬한 문체와 함께 독자를 끌어들입니다.',
    time: '3개월 전',
    profileImage: 'https://randomuser.me/api/portraits/men/20.jpg',
  },
  {
    id: 4,
    username: 'Username',
    content:
      '평범한 여성 영혜가 육식을 거부하면서 시작되는 충격적이고 기괴한 변화의 과정을 그립니다. 가족과 사회의 압박 속에서 영혜는 점차 극단적인 선택을 하게 되며, 인간 본성과 욕망, 그리고 광기에 대한 깊은 통찰을 제공합니다. 이 소설은 아름다움과 잔혹함이 공존하는 강렬한 문체와 함께 독자를 끌어들입니다.',
    time: '3개월 전',
    profileImage: 'https://randomuser.me/api/portraits/men/6.jpg',
  },
];

export default function CommentPage() {
  const [comments, setComments] = useState<Comment[]>(commentsData);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() === '') return; // 빈 댓글은 추가하지 않도록 함
    const newEntry: Comment = {
      id: comments.length + 1,
      username: 'Username',
      content: newComment,
      time: '방금 전',
      profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
    };
    setComments([newEntry, ...comments]); // 새 댓글을 기존 댓글 목록의 맨 앞에 추가
    setNewComment(''); // 댓글을 작성한 후 텍스트 입력창을 비움
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-8 gap-6">
        <div className="flex flex-col items-center gap-3">
          {/* 왼쪽 영역 - 프로필 사진과 유저 닉네임 */}
          <img
            src="https://randomuser.me/api/portraits/men/20.jpg"
            alt="User's profile"
            className="w-12 h-12 rounded-full border-2 border-gray-300"
          />
          <span className="font-semibold text-xl text-gray-800">Username</span>
        </div>

        <div className="flex flex-col">
          {/* 오른쪽 영역 - 급류 텍스트 */}
          <h1 className="text-3xl font-bold text-gray-900">급류</h1>
          <p className="text-gray-600 text-lg mt-2">
            평범한 여성 영혜가 육식을 거부하면서 시작되는 충격적이고 기괴한
            변화의 과정을 그립니다. 가족과 사회의 압박 속에서 영혜는 점차
            극단적인 선택을 하게 되며, 인간 본성과 욕망, 그리고 광기에 대한 깊은
            통찰을 제공합니다.
          </p>
        </div>
      </div>

      <div className="pt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">댓글 달기</h2>
        <div className="flex items-start gap-4">
          <textarea
            className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)} // 텍스트 상태를 업데이트
          />
        </div>
        {/* 댓글 추가 버튼 */}
        <button
          onClick={handleAddComment} // 버튼 클릭 시 handleAddComment 함수 호출
          className="mt-4 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          댓글 작성
        </button>
      </div>

      <div className="mt-10">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-200 py-6">
            <div className="flex items-center gap-4">
              {comment.profileImage && (
                <img
                  src={comment.profileImage}
                  alt={`${comment.username}'s profile`}
                  className="w-12 h-12 rounded-full border-2 border-gray-300"
                />
              )}
              <div>
                <span className="font-semibold text-gray-800">
                  {comment.username}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {comment.time}
                </span>
              </div>
            </div>
            <p className="text-gray-700 mt-3">{comment.content}</p>
            <div className="flex items-center mt-4">
              <button className="text-sm text-gray-600 hover:text-gray-800 transition duration-200 mr-4">
                댓글
              </button>
              <span className="text-sm text-gray-500">30</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
