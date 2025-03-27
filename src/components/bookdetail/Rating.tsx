import axios from 'axios';
import { useContext, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utility/AuthContext';
import { redirectToLogin } from '../../utility/AuthUtils';

interface RatingProps {
  bookIsbn: string;
  initialRating: number;
  initialMyRating: boolean;
}

const Rating = ({ bookIsbn, initialRating, initialMyRating }: RatingProps) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [myRating, setMyRating] = useState<boolean>(initialMyRating);
  const authContext = useContext(AuthContext);
  const { loggedIn } = authContext;
  const navigate = useNavigate();

  console.log(myRating); //배포에러 myRating 처리요망

  // ⭐ 별점 클릭 핸들러
  const handleRatingClick = async (index: number) => {
    const newRating = index + 1;
    if (!loggedIn) {
      redirectToLogin(navigate);
      return;
    }

    const token = localStorage.getItem('accesstoken');

    if (rating === newRating) {
      // 별점 삭제
      try {
        console.log(`별점 삭제 요청: ${newRating}`);
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL_DEV}/api/books/${bookIsbn}/ratings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 404) {
          throw new Error('해당 책에 대한 별점이 존재하지 않습니다.');
        }
        setRating(0);
        setMyRating(false);
        console.log('별점 삭제 성공');

        // 🚀 페이지 새로고침
        window.location.reload();
      } catch (error) {
        console.error('별점 삭제 오류:', error);
      }
    } else {
      // 별점 등록
      try {
        console.log(`별점 등록 요청: ${newRating}`);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL_DEV}/api/books/${bookIsbn}/ratings`,
          { score: newRating },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.data || !response.data.score) {
          throw new Error('별점 등록 실패');
        }
        setRating(newRating);
        setMyRating(true);
        console.log('별점 등록 성공:', response.data);

        // 🚀 페이지 새로고침
        window.location.reload();
      } catch (error) {
        console.error('별점 등록 오류:', error);
      }
    }
  };

  // ⭐ 마우스 오버 핸들러
  const handleMouseEnter = (index: number) => setHoverRating(index + 1);
  const handleMouseLeave = () => setHoverRating(0);

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => {
        const isFilled = hoverRating > 0 ? hoverRating > index : rating > index;
        return (
          <span
            key={index}
            className={`text-4xl font-semibold cursor-pointer ${
              isFilled ? 'text-yellow-400' : 'text-[#d1d1d1]'
            }`}
            onClick={() => handleRatingClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <FaStar />
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
