import React from 'react';

interface CommentWriteProps {
  newComment: string;
  onNewCommentChange: (comment: string) => void;
  onAddComment: () => void;
}

const CommentWrite: React.FC<CommentWriteProps> = ({
  newComment,
  onNewCommentChange,
  onAddComment,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 ml-2">
        댓글 달기
      </h2>
      <div className="w-full bg-white p-4 border border-gray-300 rounded-xl shadow-lg">
        <textarea
          className="w-full h-24 p-3 focus:outline-none focus:ring-0 resize-none"
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => onNewCommentChange(e.target.value)} // 부모 컴포넌트의 상태 변경 함수 호출
        />
        <div className="flex justify-end mt-3 gap-2">
          <button
            onClick={() => onNewCommentChange('')} // 댓글 입력 초기화
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            취소
          </button>
          <button
            onClick={onAddComment} // 댓글 작성 함수 호출
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-black/80 transition"
          >
            작성
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentWrite;
