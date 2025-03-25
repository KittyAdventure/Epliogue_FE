import React from 'react';
import CommentsLikeButton from '../button/CommentsLikeButton';

interface Comment {
  commentId: string;
  commentContent: string;
  memberNickname: string;
  commentsLike: string;
  commentPostDateTime: string;
  memberProfile: string;
  commentColor?: string;
}

interface CommentListProps {
  comments: Comment[];
  handleEditClick: (commentId: string, currentContent: string) => void;
  handleDeleteComment: (commentId: string) => void;
  handleToggleLike: (commentId: string) => void;
  likedComments: { [key: string]: boolean };
  isEditing: string | null;
  editCommentContent: string;
  setEditCommentContent: React.Dispatch<React.SetStateAction<string>>;
  handleSaveEdit: (commentId: string, newContent: string) => void; // 수정된 내용도 전달
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  handleEditClick,
  handleDeleteComment,
  isEditing,
  editCommentContent,
  setEditCommentContent,
  handleSaveEdit,
}) => {
  const defaultProfileImage = '/img/members/user.png'; // 기본 프로필 이미지 URL

  return (
    <div className="mt-20 max-h-[60vh] overflow-y-auto">
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment.commentId}
            className="border-b border-gray-200 py-6"
          >
            <div className="relative flex flex-col">
              <div className="flex items-center gap-2">
                <img
                  src={comment.memberProfile || defaultProfileImage}
                  alt={`${comment.memberNickname}'s profile`}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <span className="font-semibold text-gray-800">
                  {comment.memberNickname}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {comment.commentPostDateTime}
                </span>
                <div className="flex">
                  <button
                    onClick={() =>
                      handleEditClick(comment.commentId, comment.commentContent)
                    }
                    className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.commentId)}
                    className="ml-2 text-sm text-red-500 hover:text-red-700"
                  >
                    삭제
                  </button>
                </div>
              </div>

              {/* 댓글 내용 */}
              <div className="ml-2">
                {isEditing === comment.commentId ? (
                  <div>
                    <textarea
                      value={editCommentContent}
                      onChange={(e) => {
                        setEditCommentContent(e.target.value);
                        console.log('수정된 텍스트:', e.target.value); // 수정 중인 내용을 콘솔로 확인
                      }}
                      className="w-full p-2 border border-gray-300 rounded"
                    />

                    <button
                      onClick={() =>
                        handleSaveEdit(comment.commentId, editCommentContent)
                      } // 수정된 내용을 전달
                      className="mt-2 text-blue-500"
                    >
                      저장
                    </button>
                  </div>
                ) : (
                  <p>{comment.commentContent}</p>
                )}
              </div>

              {/* 좋아요 버튼 */}
              <CommentsLikeButton
                commentId={comment.commentId}
                commentsLike={comment.commentsLike}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        ))
      ) : (
        <p>댓글이 없습니다.</p>
      )}
    </div>
  );
};

export default CommentList;
