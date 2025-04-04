import axios, { AxiosError } from 'axios';
import { ThumbsUp } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../utility/AuthContext';

interface CommentsLikeButtonProps {
  commentId: string;
}

interface ErrorResponse {
  message?: string;
}

const CommentsLikeButton: React.FC<CommentsLikeButtonProps> = ({
  commentId,
}) => {
  const [liked, setLiked] = useState(false);
  const [commentLike, setCommentLike] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);
  const { reviewId } = useParams<{ reviewId: string }>();

  useEffect(() => {
    const fetchCommentData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_DEV}/api/comments/view`,
          {
            params: { reviewId, page: 1, sort: 'like' },
          },
        );

        const comment = response.data.comments.find(
          (c: any) => c.commentId === commentId,
        );

        if (comment) {
          setCommentLike(comment.commentLike);
          setLiked(comment.existLike);
        } else {
          setError('댓글 정보를 찾을 수 없습니다.');
        }
      } catch (err) {
        const axiosError = err as AxiosError<ErrorResponse>;
        setError(
          axiosError.response?.data?.message ||
            '댓글 정보를 불러올 수 없습니다.',
        );
      }
    };

    fetchCommentData();
  }, [commentId, reviewId]);

  const handleLike = async () => {
    if (!loggedIn) {
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('accesstoken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      if (liked) {
        await axios.delete(
          `${import.meta.env.VITE_API_URL_DEV}/api/comments/${commentId}/likes`,
          config,
        );
        setCommentLike(commentLike - 1);
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL_DEV}/api/comments/${commentId}/likes`,
          {},
          config,
        );
        setCommentLike(commentLike + 1);
      }

      setLiked(!liked);
      setError(null);
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      setError(
        axiosError.response?.data?.message || '좋아요 처리 중 오류 발생',
      );
    }
  };

  return (
    <div>
      <button
        onClick={handleLike}
        className={`flex items-center gap-1 text-sm ml-2 ${
          liked ? 'text-red-500' : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        <ThumbsUp className="w-5 h-5" />
        <span className="text-base">{commentLike}</span>
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default CommentsLikeButton;
