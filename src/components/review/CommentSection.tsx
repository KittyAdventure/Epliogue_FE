import axios from 'axios';
import { ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { Comment } from './type'; // 타입 파일이 있으면 가져오기

interface CommentSectionProps {
  comments: Comment[]; // 부모 컴포넌트에서 전달된 댓글 목록
  newComment: string; // 부모 컴포넌트에서 전달된 새 댓글 내용
  reviewId: number; // 부모 컴포넌트에서 전달된 리뷰 ID
  onNewCommentChange: (comment: string) => void; // 부모 컴포넌트에서 전달된 새 댓글 내용 변경 핸들러
  onAddComment: () => void; // 부모 컴포넌트에서 전달된 댓글 추가 핸들러
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  newComment,
  reviewId,
  onNewCommentChange,
  onAddComment,
}) => {
  const [localComments, setLocalComments] = useState<Comment[]>([
    // 더미 댓글 데이터
    {
      commentId: '1',
      memberNickname: '홍길동',
      memberProfile: 'https://cdn.ibos.kr/og-BD2109-23201.gif?v=1705626538',
      commentPostDateTime: '2025-03-21 10:30:00',
      commentContent:
        '이 리뷰 정말 유익했어요! 감사합니다! 리뷰 정말 유익했어요! 감사합니다! 리뷰 정말 유익했어요! 감사합니다! 리뷰 정말 유익했어요! 감사합니다! 리뷰 정말 유익했어요! 감사합니다! 리뷰 정말 유익했어요! 감사합니다! 리뷰 정말 유익했어요! 감사합니다!',
      commentsLike: '10',
    },
    {
      commentId: '2',
      memberNickname: '김영희',
      memberProfile: 'https://cdn.ibos.kr/og-BD2109-23201.gif?v=1705626538',
      commentPostDateTime: '2025-03-20 15:45:00',
      commentContent: '정말 도움이 많이 되었어요. 좋은 정보 감사합니다!',
      commentsLike: '7',
    },
    {
      commentId: '3',
      memberNickname: '이민호1',
      memberProfile: 'https://cdn.ibos.kr/og-BD2109-23201.gif?v=1705626538',
      commentPostDateTime: '2025-03-19 18:00:00',
      commentContent: '이 리뷰가 너무 좋네요! 잘 사용하고 있어요.',
      commentsLike: '5',
    },
    {
      commentId: '4',
      memberNickname: '이민호2',
      memberProfile: 'https://cdn.ibos.kr/og-BD2109-23201.gif?v=1705626538',
      commentPostDateTime: '2025-03-19 18:00:00',
      commentContent: '이 리뷰가 너무 좋네요! 잘 사용하고 있어요.',
      commentsLike: '5',
    },
    {
      commentId: '5',
      memberNickname: '이민호3',
      memberProfile: 'https://cdn.ibos.kr/og-BD2109-23201.gif?v=1705626538',
      commentPostDateTime: '2025-03-19 18:00:00',
      commentContent: '이 리뷰가 너무 좋네요! 잘 사용하고 있어요.',
      commentsLike: '5',
    },
  ]); // 로컬 상태로 더미 댓글 데이터 설정
  const [filter, setFilter] = useState<string>(''); // 정렬 기준
  const [page, setPage] = useState(1); // 페이지 번호
  const [totalPages, setTotalPages] = useState<number>(0); // 총 페이지 수
  const [isOpen, setIsOpen] = useState(false); // 정렬 옵션 펼치기/접기
  const [editMode, setEditMode] = useState(false); // 수정 모드 여부
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null); // 수정 중인 댓글 ID
  const [updatedContent, setUpdatedContent] = useState<string>(''); // 수정할 댓글 내용
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>(
    {},
  );

  // 수정 버튼 클릭 시 실행될 함수
  const handleEditClick = (commentId: string) => {
    setEditMode(true);
    setEditingCommentId(commentId);

    // 현재 댓글 내용을 수정할 내용으로 설정
    const commentToEdit = localComments.find((c) => c.commentId === commentId);
    if (commentToEdit) {
      setUpdatedContent(commentToEdit.commentContent);
    }
  };

  // 수정 저장 버튼 클릭 시 실행될 함수
  const handleSaveClick = async () => {
    if (!editingCommentId) return;

    await handleEditComment(editingCommentId, updatedContent);
  };

  const options = [
    { value: 'latest', label: '최신순' },
    { value: 'likes', label: '좋아요순' },
  ];

  // 댓글 불러오기 함수 (여기서는 실제 API 호출을 하지 않으므로 주석 처리)
  const fetchComments = async () => {
    try {
      // const response = await axios.get(
      //   `${import.meta.env.VITE_API_URL_DEV}/comments/view`,
      //   {
      //     params: {
      //       reviewId,
      //       page,
      //       sort: filter || null, // 정렬 기준
      //     },
      //   },
      // );
      // if (response.data) {
      //   setLocalComments(response.data.comments || []); // 댓글 목록 업데이트
      //   setTotalPages(Number(response.data.totalPages)); // 총 페이지 수 업데이트
      // }
    } catch (error) {
      console.error('댓글을 불러오는 중 오류 발생', error);
      alert('댓글을 불러오는 중 오류가 발생했습니다.');
    }
  };

  // 댓글 작성 함수
  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    // 댓글 작성 요청
    const response = await submitComment(newComment, reviewId);

    if (response) {
      onAddComment(); // 부모 컴포넌트에서 onAddComment 호출 (댓글 추가 처리)
      onNewCommentChange(''); // 부모 컴포넌트에서 새 댓글 내용 초기화
      fetchComments(); // 댓글 목록 다시 불러오기
    }
  };

  // 댓글 작성 API 호출
  const submitComment = async (content: string, reviewId: number) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_DEV}/comments`,
        { content, reviewId },
      );

      if (response.status === 200) {
        console.log('댓글이 성공적으로 작성되었습니다.');
        return response.data; // 성공한 경우 댓글 데이터를 반환
      }
    } catch (error) {
      console.error('댓글 작성에 실패했습니다', error);
      alert('댓글 작성에 실패했습니다.');
    }
  };

  // 정렬 변경 시 댓글 목록 재요청
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    fetchComments(); // 필터 변경 시 댓글 목록 다시 불러오기
  };

  // 댓글 삭제 함수
  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL_DEV}/comments`,
        { params: { commentId } },
      );

      if (response.status === 200) {
        alert(response.data.message); // 성공 시 메시지 표시
        // 로컬에서 해당 댓글 삭제
        setLocalComments(
          localComments.filter((comment) => comment.commentId !== commentId),
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Error 객체인 경우
        console.error('댓글 삭제 오류:', error.message);
        alert(`Error: ${error.message}`);
      } else if (error && (error as any).response) {
        // 오류 응답이 있는 경우
        alert(`Error: ${(error as any).response.data.message}`);
      } else {
        alert('댓글 삭제에 실패했습니다.');
      }
    }
  };

  // 댓글 수정 함수
  const handleEditComment = async (commentId: string, newContent: string) => {
    if (newContent.trim() === '') {
      alert('수정할 내용을 입력해주세요.');
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL_DEV}/comments`,
        {
          commentId,
          content: newContent, // 수정된 댓글 내용
        },
      );

      if (response.status === 200) {
        alert(response.data.message); // 성공 시 메시지 표시

        // 로컬에서 해당 댓글 수정
        setLocalComments(
          localComments.map((comment) =>
            comment.commentId === commentId
              ? { ...comment, commentContent: newContent }
              : comment,
          ),
        );

        // 수정 모드 종료
        setEditMode(false);
        setEditingCommentId(null);
        setUpdatedContent('');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('댓글 수정 오류:', error.message);
        alert(`Error: ${error.message}`);
      } else if (error && (error as any).response) {
        alert(`Error: ${(error as any).response.data.message}`);
      } else {
        alert('댓글 수정에 실패했습니다.');
      }
    }
  };

  // 댓글 좋아요 & 좋아요 취소 API 호출 함수
  const handleToggleLike = async (commentId: string) => {
    const isLiked = likedComments[commentId];
    const url = `${
      import.meta.env.VITE_API_URL_DEV
    }/comments/${commentId}/likes`;

    try {
      if (isLiked) {
        const response = await axios.delete(url);
        if (response.status === 200) {
          setLikedComments((prev) => ({ ...prev, [commentId]: false }));
          setLocalComments((prevComments) =>
            prevComments.map((comment) =>
              comment.commentId === commentId
                ? {
                    ...comment,
                    commentsLike: String(
                      Math.max(Number(comment.commentsLike) - 1, 0),
                    ),
                  }
                : comment,
            ),
          );
        }
      } else {
        const response = await axios.post(url);
        if (response.status === 200) {
          setLikedComments((prev) => ({ ...prev, [commentId]: true }));
          setLocalComments((prevComments) =>
            prevComments.map((comment) =>
              comment.commentId === commentId
                ? {
                    ...comment,
                    commentsLike: String(Number(comment.commentsLike) + 1),
                  }
                : comment,
            ),
          );
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(`오류: ${error.response.data.message}`);
      } else {
        alert('좋아요 처리 중 오류가 발생했습니다.');
      }
    }
  };

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
            onChange={(e) => onNewCommentChange(e.target.value)} // 부모에서 전달된 onNewCommentChange 호출
          />
          <div className="flex justify-end mt-3 gap-2">
            <button
              onClick={() => onNewCommentChange('')} // 부모에서 전달된 onNewCommentChange 호출
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              취소
            </button>
            <button
              onClick={handleAddComment} // 댓글 작성 시 onAddComment 호출
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-black/80 transition"
            >
              작성
            </button>
          </div>
        </div>
      </div>

      {/* 정렬 옵션 */}
      <div className="absolute float-right right-16 w-36 z-50 mt-7">
        <button
          className="w-full border p-2 px-4 rounded-lg text-m bg-white flex justify-between items-center"
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
                onClick={() => handleFilterChange(option.value)} // 정렬 방식 변경
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 댓글 목록에 스크롤 적용 */}
      <div className="mt-20 max-h-[60vh] overflow-y-auto">
        {localComments && localComments.length > 0 ? (
          localComments.map((comment) => (
            // 선
            <div
              key={comment.commentId}
              className="border-b border-gray-200 py-6"
            >
              <div className="relative flex flex-col">
                <div className="flex items-center gap-2">
                  {comment.memberProfile && (
                    <img
                      src={comment.memberProfile}
                      alt={`${comment.memberNickname}'s profile`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <span className="font-semibold text-gray-800">
                    {comment.memberNickname}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    {comment.commentPostDateTime}
                  </span>
                  <div className="flex">
                    {editMode && editingCommentId === comment.commentId ? (
                      <div className="absolute -bottom-[28px] right-[14px] flex">
                        <button
                          onClick={handleSaveClick}
                          className="ml-2 text-sm text-gray-700 hover:text-black"
                        >
                          저장
                        </button>
                        <button
                          onClick={() => setEditMode(false)}
                          className="ml-2 text-sm text-gray-400 hover:text-black"
                        >
                          취소
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(comment.commentId)}
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
                      </>
                    )}
                  </div>
                </div>
                {editMode && editingCommentId === comment.commentId ? (
                  <textarea
                    className="w-full border p-2 mt-3 resize-none"
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                  />
                ) : (
                  <p className="text-gray-700 mt-3">{comment.commentContent}</p>
                )}
              </div>

              {/* 좋아요 버튼 */}
              <div className="flex items-center mt-4">
                <button
                  onClick={() => handleToggleLike(comment.commentId)}
                  className={`flex items-center gap-1 text-sm transition duration-200 mr-1.5 ${
                    likedComments[comment.commentId]
                      ? 'text-red-500'
                      : 'text-gray-600'
                  } hover:text-gray-800'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4 inline-block" />
                  <span className="text-sm text-gray-500">
                    {comment.commentsLike}
                  </span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="block w-[110px] mx-auto mt-20 h-[10vh]">
            댓글이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
