import axios from 'axios';
import { ChevronLeft, ChevronRight, ThumbsUp, Trash2 } from 'lucide-react';
import { useState } from 'react';
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

  // 좋아요 상태 추가
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(review.likeCount);

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

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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

    selectedFiles.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL_DEV}/reviews/${review.id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      console.log('리뷰 수정 성공:', response.data);
      setEditMode(false);
    } catch (error) {
      console.error('리뷰 수정 실패:', error);
    }
  };

  const handleDeleteReview = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL_DEV}/reviews/${review.id}`,
      );
      console.log('리뷰 삭제 성공:', response.data);
    } catch (error) {
      console.error('리뷰 삭제 실패:', error);
    }
  };

  const formattedDate = new Date(review.createdAt).toLocaleString();

  // 좋아요 클릭 처리 함수
  const handleLike = async () => {
    try {
      if (liked) {
        // 좋아요 취소
        await axios.delete(
          `${import.meta.env.VITE_API_URL_DEV}/reviews/${review.id}/likes`,
        );
        setLiked(false);
        setLikeCount(likeCount - 1);
      } else {
        // 좋아요 추가
        await axios.post(
          `${import.meta.env.VITE_API_URL_DEV}/reviews/${review.id}/likes`,
        );
        setLiked(true);
        setLikeCount(likeCount + 1);
      }
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
    }
  };

  return (
    <div>
      <div key={review.id} className="flex justify-between mb-8 gap-12 mt-4">
        <div
          className="flex flex-col items-center gap-3"
          style={{ width: '80%' }}
        >
          <img
            src={review.memberProfileImage}
            alt="profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <span className="font-semibold text-xl text-gray-800 text-center">
            {review.nickname}
          </span>
          <button
            onClick={handleLike} // 좋아요 버튼 클릭 시 처리
            className={`flex items-center gap-1 text-sm ${
              liked ? 'text-red-500' : 'text-gray-600'
            } hover:text-gray-800`}
          >
            <ThumbsUp className="w-5 h-5" />
            <span className="text-base text-gray-500">{likeCount}</span>
          </button>
        </div>

        <div className="absolute right-16 top-7 mt-3 text-gray-400 py-1 px-3 text-right">
          <button
            onClick={handleDeleteReview}
            className="flex items-center gap-2 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col">
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

          {editMode ? (
            <textarea
              className="w-full border p-2 mt-5"
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
            />
          ) : (
            <p className="text-gray-600 text-lg mt-5">{review.content}</p>
          )}

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
