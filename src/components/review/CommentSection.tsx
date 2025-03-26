import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utility/AuthContext';
import { redirectToLogin } from '../../utility/AuthUtils';
import CommentList from './CommentList'; // CommentList 컴포넌트 가져오기
import CommentWrite from './CommentWrite'; // CommentWrite 컴포넌트 가져오기

interface Comment {
  commentId: string;
  commentContent: string;
  memberNickname: string;
  commentsLike: string;
  commentPostDateTime: string;
  memberProfile: string;
  commentColor?: string;
  existLike: boolean;
}
interface MyComponentProps {
  comments: Comment[];
  reviewId: number;
  newComment: string;
  onNewCommentChange: (comment: string) => void;
  onAddComment: () => void;
}

const CommentSection: React.FC<MyComponentProps> = ({ reviewId }) => {
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 목록 상태
  const [newComment, setNewComment] = useState<string>(''); // 새로운 댓글 내용 상태
  const [error, setError] = useState<string>(''); // 오류 메시지 상태
  const [sort, setSort] = useState<string | null>('latest'); // 기본 정렬 기준을 최신순으로 설정
  const [likedComments, setLikedComments] = useState<{
    [key: string]: boolean;
  }>({}); // 좋아요 상태 추적
  const [isEditing, setIsEditing] = useState<string | null>(null); // 수정 중인 댓글 ID 상태
  const [editCommentContent, setEditCommentContent] = useState<string>(''); // 수정할 댓글 내용 상태
  const [pageInfo, setPageInfo] = useState<{
    totalPages: number;
    currentPage: number;
  }>({
    totalPages: 1,
    currentPage: 1,
  }); // 페이지 정보 상태
  const [filter, setFilter] = useState<string>(''); // 정렬 기준
  const [isOpen, setIsOpen] = useState(false); // 정렬 옵션 펼치기/접기
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { loggedIn } = authContext;

  // 댓글 목록을 서버에서 가져오는 함수
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL_DEV}/api/comments/view`,
        {
          params: {
            reviewId, // 리뷰 ID
            page: pageInfo.currentPage, // 페이지 번호
            sort, // 정렬 기준 (최신순 또는 좋아요 순)
          },
        },
      );

      if (response.data.comments) {
        setComments(response.data.comments || []);
        setPageInfo({
          totalPages: response.data.totalPages, // 총 페이지 수
          currentPage: pageInfo.currentPage, // 현재 페이지를 직접 반영
        });
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error('댓글을 불러오는 중 오류가 발생했습니다.', error);
      setError('댓글을 불러오는 중 오류가 발생했습니다.');
    }
  };

  // 페이지가 변경되거나 리뷰가 변경되면 댓글 목록을 새로 가져오도록 useEffect 추가
  useEffect(() => {
    fetchComments();
  }, [reviewId, sort, pageInfo.currentPage]);

  // 댓글 내용이 변경될 때 호출되는 함수
  const handleNewCommentChange = (comment: string) => {
    setNewComment(comment);
  };

  // 댓글 작성 함수
  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      if (!loggedIn) {
        redirectToLogin(navigate);
        return;
      }
      const token = localStorage.getItem('accesstoken');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_DEV}/api/comments`,
        {
          content: newComment,
          reviewId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.status === 200) {
        alert(response.data.message); // 성공 메시지
        setNewComment(''); // 댓글 입력란 초기화
        fetchComments(); // 댓글 목록 다시 가져오기
      }
    } catch (error) {
      console.error('댓글 작성 오류:', error);
      setError('댓글 작성에 실패했습니다.');
    }
  };

  // 좋아요 버튼 클릭 처리
  const handleToggleLike = (commentId: string) => {
    setLikedComments((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  // 댓글 수정 시작 처리
  const handleEditClick = (commentId: string, currentContent: string) => {
    setIsEditing(commentId); // 수정 중인 댓글 ID 설정
    setEditCommentContent(currentContent); // 수정할 댓글 내용 설정
  };

  // 수정된 댓글 서버로 전송
  const handleSaveEdit = async (commentId: string) => {
    if (editCommentContent.trim() === '') {
      alert('수정된 내용을 입력해주세요.');
      return;
    }

    try {
      const token = localStorage.getItem('accesstoken');
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL_DEV}/api/comments`,
        {
          commentId: commentId,
          content: editCommentContent, // 수정된 내용
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.status === 200) {
        // 댓글 수정 성공 후, 댓글 목록 업데이트
        const updatedComments = comments.map((comment) =>
          comment.commentId === commentId
            ? { ...comment, commentContent: editCommentContent }
            : comment,
        );
        setComments(updatedComments); // 수정된 댓글을 반영
        alert(response.data.message); // 성공 메시지
        setIsEditing(null); // 수정 종료
      }
    } catch (error) {
      console.error('댓글 수정 오류:', error);
      alert('댓글 수정에 실패했습니다.');
    }
  };

  // 댓글 삭제 클릭 처리
  const handleDeleteComment = (commentId: string) => {
    const confirmDelete = window.confirm('정말로 이 댓글을 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        if (!loggedIn) {
          redirectToLogin(navigate);
          return;
        }
        const token = localStorage.getItem('accesstoken');
        axios
          .delete(`${import.meta.env.VITE_API_URL_DEV}/api/comments`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { commentId }, // 삭제할 댓글 ID를 쿼리 파라미터로 전달
          })
          .then((response) => {
            if (response.status === 200) {
              alert(response.data.message); // 성공 메시지
              fetchComments(); // 댓글 목록 새로 고침
            }
          })
          .catch((error) => {
            console.error('댓글 삭제 오류:', error);

            // 오류 코드에 따른 처리
            if (error.response?.status === 404) {
              alert('댓글이 존재하지 않습니다.');
            } else if (error.response?.status === 403) {
              alert('이 댓글을 삭제할 권한이 없습니다.');
            } else {
              alert('댓글 삭제 중 오류가 발생했습니다.');
            }
          });
      } catch (error) {
        console.error('댓글 삭제 오류:', error);
        setError('댓글 삭제에 실패했습니다.');
      }
    }
  };

  // 좋아요 순으로 댓글을 정렬하는 함수
  const sortCommentsByLikes = (comments: Comment[]) => {
    return comments.sort((a, b) => {
      const aLikes = likedComments[a.commentId] ? 1 : 0;
      const bLikes = likedComments[b.commentId] ? 1 : 0;
      return bLikes - aLikes; // 좋아요가 많은 순으로 정렬
    });
  };

  // 최신순 정렬 함수
  const sortCommentsByDate = (comments: Comment[]) => {
    return comments.sort((a, b) => {
      const dateA = new Date(a.commentPostDateTime).getTime();
      const dateB = new Date(b.commentPostDateTime).getTime();
      return dateB - dateA; // 최신순으로 정렬
    });
  };

  // 정렬에 맞는 댓글 목록을 반환하는 함수
  const getSortedComments = () => {
    if (sort === 'likes') {
      return sortCommentsByLikes(comments);
    } else {
      return sortCommentsByDate(comments); // 기본값: 최신순
    }
  };

  // 정렬 변경 시 댓글 목록 재요청
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setSort(newFilter); // 정렬 기준 변경
    fetchComments(); // 필터 변경 시 댓글 목록 다시 불러오기
    setIsOpen(false); // 옵션 클릭 후 옵션창 닫기
  };

  const options = [
    { value: 'latest', label: '최신순' },
    { value: 'likes', label: '좋아요순' },
  ];

  return (
    <div>
      {/* 댓글 작성 폼 */}
      <CommentWrite
        newComment={newComment}
        onNewCommentChange={handleNewCommentChange}
        onAddComment={handleAddComment}
      />
      {/* 오류 메시지 표시 */}
      {/* {error && <div className="error">{error}</div>} */}

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

      {/* 댓글 목록 표시 */}
      <CommentList
        comments={getSortedComments()} // 정렬된 댓글 목록 전달
        handleEditClick={handleEditClick}
        handleDeleteComment={handleDeleteComment}
        handleToggleLike={handleToggleLike}
        likedComments={likedComments}
        isEditing={isEditing}
        editCommentContent={editCommentContent}
        setEditCommentContent={setEditCommentContent}
        handleSaveEdit={handleSaveEdit}
      />
    </div>
  );
};

export default CommentSection;
