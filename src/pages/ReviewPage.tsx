import { ArrowLeft, ChevronLeft, ChevronRight, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Comment {
  id: number;
  username: string;
  content: string;
  time: string;
  profileImage?: string;
}

const commentsData: Comment[] = [
  {
    id: 1,
    username: 'Username',
    content:
      '평범한 여성 영혜가 육식을 거부하면서 시작되는 충격적이고 기괴한 변화의 과정을 그립니다. 가족과 사회의 압박 속에서 영혜는 점차 극단적인 선택을 하게 되며, 인간 본성과 욕망, 그리고 광기에 대한 깊은 통찰을 제공합니다. 이 소설은 아름다움과 잔혹함이 공존하는 강렬한 문체와 함께 독자를 끌어들입니다.',
    time: '3개월 전',
    profileImage: 'https://randomuser.me/api/portraits/men/20.jpg',
  }
];

export default function CommentPage() {
  const [comments, setComments] = useState<Comment[]>(commentsData);
  const [newComment, setNewComment] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // 선택된 이미지 상태 관리
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0); // 현재 선택된 이미지 인덱스
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const images = [
    '../../public/img/members/member1.jpg',
    '../../public/img/members/member2.jpg',
    '../../public/img/members/member3.jpg',
    '../../public/img/members/member4.jpg',
    '../../public/img/members/member5.jpg',
  ];
  const options = [
    { value: 'latest', label: '최신순' },
    { value: 'likes', label: '좋아요순' },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    const newEntry: Comment = {
      id: comments.length + 1,
      username: 'Username',
      content: newComment,
      time: '방금 전',
      profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
    };
    setComments([newEntry, ...comments]);
    setNewComment('');
  };

  // 이미지 클릭 시 선택된 이미지 상태 업데이트
  const handleImageClick = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index); // 선택된 이미지 인덱스 업데이트
  };

  // 모달을 닫는 함수 (모달 영역 클릭 시만 닫기)
  const handleModalClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedImage(null);
    }
  };

  // 이전 이미지로 이동
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
    setSelectedImage(
      images[
        currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
      ],
    );
  };

  // 다음 이미지로 이동
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
    setSelectedImage(
      images[
        currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
      ],
    );
  };

  return (
    <div className="relative max-w-5xl mx-auto p-16 bg-white shadow-lg rounded-lg mt-1 mb-40">
      {/* 뒤로가기 버튼 */}
      <button
        className="absolute top-6 left-6 text-gray-900 hover:text-black transition text-3xl font-bold flex items-center"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="w-8 h-8" />
      </button>
      <div className="flex justify-between mb-8 gap-20 mt-4">
        <div className="flex flex-col items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/men/20.jpg"
            alt="User's profile"
            className="w-12 h-12 rounded-full border-2 border-gray-300"
          />
          <span className="font-semibold text-xl text-gray-800">Username</span>
          <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 transition duration-200 mr-1.5">
            <ThumbsUp className="w-5 h-5 inline-block" />
            <span className="text-base text-gray-500"> 30</span>
          </button>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900">급류</h1>
          {/* 이미지 렌더링 */}
          <div className="mt-10">
            <div className="grid grid-cols-5 gap-2">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  className="w-full h-full object-cover rounded-lg aspect-square cursor-pointer"
                  onClick={() => handleImageClick(img, idx)}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600 text-lg mt-5">
            평범한 여성 영혜가 육식을 거부하면서 시작되는 충격적이고 기괴한
            변화의 과정을 그립니다. 가족과 사회의 압박 속에서 영혜는 점차
            극단적인 선택을 하게 되며, 인간 본성과 욕망, 그리고 광기에 대한 깊은
            통찰을 제공합니다. 이 소설은 아름다움과 잔혹함이 공존하는 강렬한
            문체와 함께 독자를 끌어들입니다.
          </p>
        </div>
      </div>

      {/* 댓글 달기 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 ml-2">
          댓글 달기
        </h2>
        <div className="w-full bg-white p-4 border border-gray-300 rounded-xl shadow-lg">
          <textarea
            className="w-full h-24 p-3 focus:outline-none focus:ring-0 resize-none"
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end mt-3 gap-2">
            <button
              onClick={() => setNewComment('')}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              취소
            </button>
            <button
              onClick={handleAddComment}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-black/80 transition"
            >
              작성
            </button>
          </div>
        </div>
      </div>
      {/* 정렬 */}
      <div className="absolute float-right right-16 w-36 z-50 mt-7">
        <button
          className="w-full border p-2 px-4 rounded-lg text-m bg-white flex justify-between items-center hover:"
          onClick={() => setIsOpen(!isOpen)}
        >
          {filter ? options.find((opt) => opt.value === filter)?.label : '정렬'}
          <span>▼</span>
        </button>

        {isOpen && (
          <ul className="absolute w-full mt-1 border py-2 border-gray-300 rounded-lg bg-white shadow-md">
            {options.map((option) => (
              <li
                key={option.value}
                className="py-2 px-4 cursor-pointer hover:font-bold transition-all duration-300"
                onClick={() => {
                  setFilter(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 댓글 목록에 스크롤 적용 */}
      <div className="mt-20 max-h-[60vh] overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-200 py-6">
            <div className="flex items-center gap-4">
              {comment.profileImage && (
                <img
                  src={comment.profileImage}
                  alt={`${comment.username}'s profile`}
                  className="w-12 h-12 rounded-full border-2 border-gray-300"
                />
              )}
              <div>
                <span className="font-semibold text-gray-800">
                  {comment.username}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {comment.time}
                </span>
              </div>
            </div>
            <p className="text-gray-700 mt-3">{comment.content}</p>
            <div className="flex items-center mt-4">
              <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 transition duration-200 mr-1.5">
                <ThumbsUp className="w-4 h-4 inline-block" />
                <span className="text-sm text-gray-500"> 30</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 모달 이미지 보기 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleModalClose}
        >
          <button
            onClick={handlePrevImage}
            className="absolute left-[20%] top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 transition-all shadow-lg"
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
            className="absolute right-[20%] top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 transition-all shadow-lg"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
}
