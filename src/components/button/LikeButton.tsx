import axios, { AxiosError } from 'axios';
import { ThumbsUp } from 'lucide-react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utility/AuthContext';
import { redirectToLogin } from '../../utility/AuthUtils';

interface LikeButtonProps {
  reviewId: number;
  likeCount: number;
  liked: boolean; // 부모에서 전달받은 liked 값
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  reviewId,
  likeCount,
  liked, // 부모 컴포넌트에서 전달받은 liked 값
  onClick,
}) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { loggedIn } = authContext;

  const [isInLikes, setIsInLikes] = useState<boolean>(liked); // 초기값: 부모에서 전달받은 liked 값
  const [currentLikeCount, setLikeCount] = useState<number>(likeCount);

  const addToLikes = async () => {
    if (!loggedIn) {
      redirectToLogin(navigate);
      return;
    }

    try {
      const token = localStorage.getItem('accesstoken');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_DEV}/api/reviews/${reviewId}/likes`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.status === 200) {
        setIsInLikes(true); // 좋아요 추가
        setLikeCount((prev) => prev + 1);
      } else {
        throw new Error('좋아요 추가 실패');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data === '이미 좋아요를 눌렀습니다.') {
          setIsInLikes(true); // 이미 좋아요 상태라면 그대로 두기
        } else {
          console.error('Response error:', error.response);
        }
      } else {
        console.error('Error:', error);
      }
      // alert('좋아요 추가 중 오류가 발생했습니다.');
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
        `${import.meta.env.VITE_API_URL_DEV}/api/reviews/${reviewId}/likes`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.status === 200) {
        setIsInLikes(false); // 좋아요 제거
        setLikeCount((prev) => Math.max(prev - 1, 0));
      } else {
        throw new Error('좋아요 삭제 실패');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Response error:', error.response);
      } else {
        console.error('Error:', error);
      }
      alert('좋아요 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="icon-container">
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
        <ThumbsUp className="w-5 h-5" />
        <span className="text-base">{currentLikeCount}</span>
      </button>
    </div>
  );
};

export default LikeButton;
