// ReviewCommentSection.tsx
import axios from 'axios';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utility/AuthContext';
import { redirectToLogin } from '../../utility/AuthUtils';
import LikeButton from '../button/LikeButton'; // LikeButton 컴포넌트 import
import { Review } from './type';
interface ReviewSectionProps {
  review: Review;
  onImageClick: (image: string, index: number) => void;
}

const ReviewCommentSection: React.FC<ReviewSectionProps> = ({ review }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [editMode, setEditMode] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(review.content);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    console.error('AuthContext가 제공되지 않았습니다.');
    return null; // 또는 다른 처리
  }

  const { loggedIn } = useContext(AuthContext);

  // 이미지
  const handleImageClick = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const handleModalClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedImage(null);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      setSelectedImage(review.imageUrls[currentImageIndex - 1]);
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < review.imageUrls.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setSelectedImage(review.imageUrls[currentImageIndex + 1]);
    }
  };

  // 리뷰수정
  const handleUpdateReview = async () => {
    const formData = new FormData();
    const reviewData = JSON.stringify({
      content: updatedContent,
      imageUrls: review.imageUrls,
    });
    formData.append(
      'data',
      new Blob([reviewData], { type: 'application/json' }),
    );

    try {
      if (!loggedIn) {
        redirectToLogin(navigate); // 로그인 페이지로 이동
        return;
      }
      const token = localStorage.getItem('accesstoken');
      console.log('🔑 토큰 확인:', token);

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL_DEV}/api/reviews/${review.id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log('리뷰 수정 성공:', response.data);

      // 서버에서 받은 수정된 리뷰 데이터를 상태에 업데이트
      setUpdatedContent(response.data.content); // 내용 수정
      review.content = response.data.content; // 서버에서 받은 수정된 내용을 적용

      setEditMode(false);
    } catch (error) {
      console.error('리뷰 수정 실패:', error);
    }
  };

  // 리뷰삭제
  const handleDeleteReview = async () => {
    if (!loggedIn) {
      redirectToLogin(navigate); // 로그인 페이지로 이동
      return;
    }
    try {
      const token = localStorage.getItem('accesstoken');
      console.log('🔑 토큰 확인:', token);

      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL_DEV}/api/reviews/${review.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log('리뷰 삭제 성공:', response.data);

      // 삭제 성공 알림 표시
      alert('리뷰가 삭제되었습니다.');

      // 페이지 새로 고침
      window.location.reload(); // 페이지 리로드 후 이전 페이지로 돌아가기
      navigate(-1); // 마지막 페이지로 돌아가기
    } catch (error) {
      console.error('리뷰 삭제 실패:', error);
    }
  };

  // 날짜
  const formattedDate = new Date(review.createdAt).toLocaleString();

  return (
    <div>
      <div key={review.id} className="flex mb-8 gap-12 mt-4">
        {/* 프로필 */}
        <div className="w-1/6 flex flex-col items-center gap-3">
          <img
            src={review.memberProfileImage}
            alt="profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <span className="font-semibold text-xl text-gray-800 text-center">
            {review.nickname}
          </span>
          {/* 좋아요 */}
          <LikeButton
            reviewId={review.id}
            likeCount={review.likeCount}
            liked={review.liked}
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* 삭제 */}
        <div className="absolute right-16 top-7 mt-3 text-gray-400 py-1 px-3 text-right">
          <button
            onClick={handleDeleteReview}
            className="flex items-center gap-2 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* 리뷰 내용 */}
        <div className="flex flex-col w-5/6">
          <h1 className="text-3xl font-bold text-gray-900">
            {review.bookTitle}
          </h1>

          {/* 날짜 표시 추가 */}
          <p className="text-gray-500 text-sm mt-2">{formattedDate}</p>

          <div className="mt-10 grid grid-cols-5 gap-2">
            {review.imageUrls.map((img, idx) => (
              <img
                key={idx}
                src={img}
                className="w-full h-full object-cover rounded-lg aspect-square cursor-pointer"
                onClick={() => handleImageClick(img, idx)}
              />
            ))}
          </div>

          {/* 수정 textarea */}
          {editMode ? (
            <textarea
              className="w-full border p-2 mt-5 resize-none"
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
            />
          ) : (
            <p className="text-gray-600 text-lg mt-5">{review.content}</p>
          )}

          {/* 수정버튼 */}
          <div className="flex justify-end">
            <button
              onClick={() => setEditMode(!editMode)}
              className="mt-3 text-gray-400 py-1 px-3 text-right hover:text-black"
            >
              {editMode ? '취소' : '수정'}
            </button>

            {editMode && (
              <button
                onClick={handleUpdateReview}
                className="mt-3 text-gray-700 py-1 px-3 text-right hover:text-black"
              >
                저장
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 이미지 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-60"
          onClick={handleModalClose}
        >
          <button
            onClick={handlePrevImage}
            className="absolute left-[20%] top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Enlarged"
            className="max-w-full max-h-full object-contain cursor-pointer"
          />
          <button
            onClick={handleNextImage}
            className="absolute right-[20%] top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewCommentSection;
