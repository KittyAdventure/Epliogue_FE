import axios from 'axios';
import { ThumbsUp } from 'lucide-react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utility/AuthContext';
import { redirectToLogin } from '../../utility/AuthUtils';

interface LikeButtonProps {
  reviewId: number;
  likeCount: number;
  isLiked: boolean;
  onLikeToggle: (reviewId: number, newLikeCount: number) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  reviewId,
  likeCount,
  isLiked,
  onLikeToggle,
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    console.error('🚨 AuthContext가 제공되지 않았습니다.');
    return null;
  }

  const { loggedIn } = authContext;

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading) return;
    setLoading(true);

    try {
      const token = localStorage.getItem('accesstoken');
      console.log('🔑 토큰 확인:', token);

      if (!token) {
        console.error('❌ 토큰이 존재하지 않습니다.');
        redirectToLogin(navigate);
        return;
      }

      // ✅ 토큰 유효성 검사
      try {
        console.log('🔍 토큰 유효성 확인 중...');
        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) {
          console.error('❌ 토큰 형식이 잘못됨.');
          redirectToLogin(navigate);
          return;
        }

        const payload = JSON.parse(atob(tokenParts[1]));
        const now = Math.floor(Date.now() / 1000);

        console.log('⏳ 토큰 만료 시간:', payload.exp);
        console.log('⏰ 현재 시간:', now);

        if (payload.exp < now) {
          console.error('❌ 토큰이 만료됨.');
          localStorage.removeItem('accesstoken');
          redirectToLogin(navigate);
          return;
        }

        console.log('✅ 토큰이 유효함.');
      } catch (error) {
        console.error('❌ 토큰 검증 중 오류 발생:', error);
        redirectToLogin(navigate);
        return;
      }

      if (!loggedIn) {
        redirectToLogin(navigate);
        return;
      }

      console.log('🆔 요청하는 리뷰 ID:', reviewId);

      const BASE_URL = import.meta.env.VITE_API_URL_DEV?.replace(/\/$/, '');
      const API_URL = `${BASE_URL}/api/reviews/${reviewId}/likes`;

      // ✅ 서버에서 좋아요 상태 조회 (토큰 포함)
      console.log('📡 서버에서 좋아요 상태 조회 중...');
      const { data: likeStatus } = await axios.get(`${API_URL}/status`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('🔄 서버에서 가져온 좋아요 상태:', likeStatus.isLiked);

      const newLikeCount = likeStatus.isLiked ? likeCount - 1 : likeCount + 1;

      if (likeStatus.isLiked) {
        console.log('💔 좋아요 취소 요청 (DELETE)');
        await axios.delete(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        console.log('❤️ 좋아요 요청 (POST)');
        await axios.post(
          API_URL,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      }

      onLikeToggle(reviewId, newLikeCount);
    } catch (error: any) {
      console.error(
        `❌ 좋아요 처리 실패 (에러 코드: ${error.response?.status}):`,
        error,
      );
    } finally {
      console.log('🔄 로딩 상태 초기화 (loading = false)');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-1 text-sm ${
        isLiked ? 'text-red-500' : 'text-gray-600'
      } hover:text-gray-800`}
      disabled={loading}
    >
      <ThumbsUp className="w-5 h-5" />
      <span className="text-base">{likeCount}</span>
    </button>
  );
};

export default LikeButton;
