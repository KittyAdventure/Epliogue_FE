import axios from 'axios'; // axios import
import { Image, X } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utility/AuthContext';
import { redirectToLogin } from '../../utility/AuthUtils';

interface ReviewModalProps {
  setReviewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bookId: string;
}

export default function ReviewModal({
  setReviewModalOpen,
  bookId,
}: ReviewModalProps) {
  const [text, setText] = useState('');
  const [imageUrls, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const maxChars = 10000;
  const maxImages = 5;
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { loggedIn } = authContext;

  useEffect(() => {
    const newPreviews = imageUrls.map((img) => URL.createObjectURL(img));
    setImagePreviews(newPreviews);

    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxChars) {
      setText(e.target.value);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (imageUrls.length + files.length <= maxImages) {
      setImages((prev) => [...prev, ...files]); // 실제 File 객체를 추가
    } else {
      alert(`최대 ${maxImages}개의 이미지만 업로드할 수 있습니다.`);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!text.trim() && imageUrls.length === 0) {
      alert('리뷰 내용을 입력하거나 이미지를 추가해야 합니다.');
      return;
    }

    const formData = new FormData();

    // 리뷰 데이터 (텍스트) 추가
    const reviewData = {
      content: text || '', // content가 비어있으면 빈 문자열로 설정
    };
    formData.append(
      'data',
      new Blob([JSON.stringify(reviewData)], { type: 'application/json' }),
    );

    // 이미지 파일 (File[])을 FormData에 추가
    imageUrls.forEach((image) => {
      if (image instanceof File) {
        formData.append('images', image); // 이미지 파일은 'images' 필드로 전송
      }
    });

    // FormData 내부 확인
    formData.forEach((value, key) => {
      console.log(key, value); // key는 'data' 또는 'images'가 되고, value는 값
    });

    try {
      if (!loggedIn) {
        redirectToLogin(navigate); // 로그인 페이지로 이동
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_DEV}/api/books/${bookId}/reviews`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
          },
        },
      );

      console.log(response);

      if (response.status !== 200) {
        throw new Error('리뷰 등록 실패');
      }

      alert('리뷰가 성공적으로 등록되었습니다.');
      setReviewModalOpen(false); // 모달 닫기

      // 페이지 새로고침
      window.location.reload(); // 리뷰를 저장하고 새로고침
    } catch (error) {
      alert('리뷰 저장 중 오류가 발생했습니다.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-100">
      <div className="bg-white p-9 rounded-lg w-[500px] md:w-[600px] lg:w-[700px] shadow-xl relative">
        <button
          onClick={() => setReviewModalOpen(false)}
          className="absolute top-4 right-4"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4">리뷰 작성</h2>
        <textarea
          className="w-full h-40 rounded-md resize-none"
          placeholder="이 작품에 대한 리뷰 작성하기."
          value={text}
          onChange={handleTextChange}
        />

        {/* 글자수 카운트 */}
        <div className="flex justify-between items-center mt-2 text-gray-600 text-sm">
          <label className="cursor-pointer">
            <Image size={20} className="inline-block" />
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          <span>
            {text.length} / {maxChars}
          </span>
        </div>

        {/* 이미지 미리보기 */}
        <div className="flex mt-2 gap-2">
          {imagePreviews.map((src, index) => (
            <div key={index} className="relative">
              <img
                src={src}
                alt="preview"
                className="w-16 h-16 object-cover rounded-md"
              />
              <button
                className="absolute top-0 right-0 bg-black text-white rounded-full p-1"
                onClick={() => handleRemoveImage(index)}
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-between mt-4">
          {/* 초기화 버튼 */}
          <button
            onClick={() => {
              setText('');
              setImages([]);
            }}
            className="w-1/3 bg-gray-200 text-black p-2 rounded-md"
          >
            다시쓰기
          </button>

          {/* 저장 버튼 */}
          <button
            onClick={handleSave}
            className="w-1/3 bg-black text-white p-2 rounded-md"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
