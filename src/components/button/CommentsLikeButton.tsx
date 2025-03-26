import axios from 'axios';
import { ThumbsUp } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utility/AuthContext';
import { redirectToLogin } from '../../utility/AuthUtils';

interface UserLikeButtonProps {
  commentId: string;
  commentsLike: string;
  existLike: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CommentsLikeButton: React.FC<UserLikeButtonProps> = ({
  commentId,
  commentsLike,
  existLike,
  onClick,
}) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { loggedIn } = authContext;

  // LocalStorage에서 저장된 값 가져오기
  const getStoredLikes = () => {
    const storedLikes = localStorage.getItem(`commentLike_${commentId}`);
    return storedLikes
      ? JSON.parse(storedLikes)
      : { isInLikes: existLike, likeCount: commentsLike };
  };

  const [isInLikes, setIsInLikes] = useState<boolean>(
    getStoredLikes().isInLikes,
  );
  const [currentcommentsLike, setcommentsLike] = useState(
    getStoredLikes().likeCount || '0',
  );

  // 좋아요 상태를 localStorage에 저장하는 함수
  const saveLikeState = (isLiked: boolean, likeCount: string) => {
    localStorage.setItem(
      `commentLike_${commentId}`,
      JSON.stringify({ isInLikes: isLiked, likeCount }),
    );
  };

  // 컴포넌트가 마운트될 때 LocalStorage에서 상태 복원
  useEffect(() => {
    const storedData = getStoredLikes();
    setIsInLikes(storedData.isInLikes);
    setcommentsLike(storedData.likeCount);
  }, [commentId]);

  const addToLikes = async () => {
    if (!loggedIn) {
      redirectToLogin(navigate);
      return;
    }

    try {
      const token = localStorage.getItem('accesstoken');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_DEV}/api/comments/${commentId}/likes`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.status === 200) {
        alert('좋아요에 추가 되었습니다.');
        const newCount = String((Number(currentcommentsLike) || 0) + 1);
        setIsInLikes(true);
        setcommentsLike(newCount);
        saveLikeState(true, newCount);
      } else {
        throw new Error('좋아요 추가 실패');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('좋아요 추가 중 오류가 발생했습니다.');
    }
  };

  const removeFromLikes = async () => {
    if (!loggedIn) {
      redirectToLogin(navigate);
      return;
    }

    try {
      const token = localStorage.getItem('accesstoken');
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL_DEV}/api/comments/${commentId}/likes`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.status === 200) {
        alert('좋아요에서 삭제되었습니다.');
        const newCount = String(
          Math.max((Number(currentcommentsLike) || 0) - 1, 0),
        );
        setIsInLikes(false);
        setcommentsLike(newCount);
        saveLikeState(false, newCount);
      } else {
        throw new Error('좋아요 삭제 실패');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('좋아요 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="icon-container mt-3 ml-2">
      <button
        onClick={(e) => {
          if (isInLikes) {
            removeFromLikes();
          } else {
            addToLikes();
          }
          if (onClick) {
            onClick(e);
          }
        }}
        className={`flex items-center gap-1 text-sm ${
          isInLikes ? 'text-red-500' : 'text-gray-600'
        } hover:text-gray-800`}
      >
        <ThumbsUp className="w-4 h-4" />
        <span className="text-base">{currentcommentsLike}</span>
      </button>
    </div>
  );
};

export default CommentsLikeButton;
