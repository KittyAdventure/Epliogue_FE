import { Image, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ReviewModalProps {
  setReviewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReviewModal({ setReviewModalOpen }: ReviewModalProps) {
  const [text, setText] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const maxChars = 10000;
  const maxImages = 5;

  useEffect(() => {
    const newPreviews = images.map((img) => URL.createObjectURL(img));
    setImagePreviews(newPreviews);

    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxChars) {
      setText(e.target.value);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (images.length + files.length <= maxImages) {
      setImages((prev) => [...prev, ...files]);
    } else {
      alert(`최대 ${maxImages}개의 이미지만 업로드할 수 있습니다.`);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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
        <h2 className="text-xl font-bold mb-4">채식주의자</h2>
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
          <button className="w-1/3 bg-black text-white p-2 rounded-md">
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
