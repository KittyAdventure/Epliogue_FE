import axios, { AxiosError } from 'axios';
import { ThumbsUp } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../utility/AuthContext';
import { Review } from '../review/type'; // 타입 파일

interface CommentsLikeButtonProps {
  commentId: string;
}

interface ErrorResponse {
  message?: string;
}

const CommentsLikeButton: React.FC<CommentsLikeButtonProps> = ({
  commentId,
}) => {
  const [liked, setLiked] = useState(false); // 좋아요 상태
  const [commentLike, setCommentLike] = useState(0); // 좋아요 수
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { loggedIn } = authContext;
  const [review, setReview] = useState<Review | null>(null); // 리뷰 상태
  const { reviewId } = useParams<{ reviewId: string }>();

  // 리뷰 데이터를 가져오는 함수
  useEffect(() => {
    if (!reviewId) {
      console.error('Review ID is missing.');
      return; // reviewId가 없으면 API 요청을 하지 않음
    }

    const fetchReviewData = async () => {
      try {
        const token = localStorage.getItem('accesstoken');
        const headers: { [key: string]: string } = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };

        // 토큰이 있을 경우 Authorization 헤더 추가
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_DEV}/api/reviews/${reviewId}`,
          { headers },
        );

        setReview(response.data);
      } catch (error) {
        console.error('Error fetching review data:', error);
        if (axios.isAxiosError(error)) {
          console.error('Axios error details:', error.response?.data);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    fetchReviewData();
  }, [reviewId]);

  // 컴포넌트가 처음 렌더링될 때 댓글 정보 불러오기
  useEffect(() => {
    const fetchCommentData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_DEV}/api/comments/view`,
          {
            params: { reviewId: reviewId, page: 1, sort: 'like' }, // 필요한 파라미터 전달
          },
        );

        // 첫 번째 댓글 데이터를 가져온 후 상태 설정
        const comment = response.data.comments[0];
        setCommentLike(comment.commentLike); // 댓글의 좋아요 수
        setLiked(comment.existLike); // 댓글이 이미 좋아요 상태인지 확인
      } catch (err) {
        const axiosError = err as AxiosError<ErrorResponse>;
        setError(axiosError.response?.data?.message || 'Something went wrong');
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

      // 좋아요 추가 또는 취소 API 호출
      if (liked) {
        await axios.delete(
          `${import.meta.env.VITE_API_URL_DEV}/api/comments/${commentId}/likes`,
          config,
        );
        setCommentLike(commentLike - 1); // 좋아요 취소 시 감소
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL_DEV}/api/comments/${commentId}/likes`,
          {},
          config,
        );
        setCommentLike(commentLike + 1); // 좋아요 추가 시 증가
      }

      // 좋아요 상태를 토글
      setLiked(!liked);
      setError(null);
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      setError(axiosError.response?.data?.message || 'Something went wrong');
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
