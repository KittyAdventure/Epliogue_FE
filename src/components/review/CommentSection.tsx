// CommentSection.tsx
import { ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Comment } from './type'; // 타입 파일이 있으면 가져오기

interface CommentSectionProps {
  comments: Comment[];
  newComment: string;
  onNewCommentChange: (comment: string) => void;
  onAddComment: () => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  newComment,
  onNewCommentChange,
  onAddComment,
}) => {
  // state 변수를 컴포넌트 내부로 이동
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const options = [
    { value: 'latest', label: '최신순' },
    { value: 'likes', label: '좋아요순' },
  ];

  useEffect(() => {
    window.scrollTo(0, 0); // 컴포넌트가 마운트될 때 페이지 상단으로 스크롤
  }, []);

  return (
    <div>
      {/* 댓글 달기 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 ml-2">
          댓글 달기
        </h2>
        <div className="w-full bg-white p-4 border border-gray-300 rounded-xl shadow-lg">
          <textarea
            className="w-full h-24 p-3 focus:outline-none focus:ring-0 resize-none"
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => onNewCommentChange(e.target.value)}
          />
          <div className="flex justify-end mt-3 gap-2">
            <button
              onClick={() => onNewCommentChange('')}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              취소
            </button>
            <button
              onClick={onAddComment}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-black/80 transition"
            >
              작성
            </button>
          </div>
        </div>
      </div>
      {/* 정렬 */}
      <div className="absolute float-right right-16 w-36 z-50 mt-7">
        <button
          className="w-full border p-2 px-4 rounded-lg text-m bg-white flex justify-between items-center hover:"
          onClick={() => setIsOpen(!isOpen)}
        >
          {filter ? options.find((opt) => opt.value === filter)?.label : '정렬'}
          <span>▼</span>
        </button>

        {isOpen && (
          <ul className="absolute w-full mt-1 border py-2 border-gray-300 rounded-lg bg-white shadow-md">
            {options.map((option) => (
              <li
                key={option.value}
                className="py-2 px-4 cursor-pointer hover:font-bold transition-all duration-300"
                onClick={() => {
                  setFilter(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 댓글 목록에 스크롤 적용 */}
      <div className="mt-20 max-h-[60vh] overflow-y-auto">
        {comments.map((comment) => (
          <div
            key={comment.commentId}
            className="border-b border-gray-200 py-6"
          >
            <div className="flex items-center gap-4">
              {comment.memberProfile && (
                <img
                  src={comment.memberProfile}
                  alt={`${comment.memberNickname}'s profile`}
                  className="w-12 h-12 rounded-full border-2 border-gray-300"
                />
              )}
              <div>
                <span className="font-semibold text-gray-800">
                  {comment.memberNickname}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {comment.commentPostDateTime}
                </span>
              </div>
            </div>
            <p className="text-gray-700 mt-3">{comment.commentContent}</p>
            <div className="flex items-center mt-4">
              <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 transition duration-200 mr-1.5">
                <ThumbsUp className="w-4 h-4 inline-block" />
                <span className="text-sm text-gray-500">
                  {comment.commentsLike}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
