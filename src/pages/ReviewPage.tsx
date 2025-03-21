import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import CommentSection from '../components/review/CommentSection';
import ReviewCommentSection from '../components/review/ReviewCommentSection';
import { Comment, Review } from '../components/review/type'; // 타입 파일

export default function ReviewPage() {
  const [review, setReview] = useState<Review | null>(null); // 리뷰 상태
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 상태
  const [newComment, setNewComment] = useState(''); // 새 댓글 입력 상태
  const reviewId = 5; // 예시로 리뷰 ID를 5로 설정

  const fakeReview: Review = {
    id: 999,
    content: '재미있어요',
    nickname: '책읽는고양이',
    memberId: 'user123',
    memberProfileImage:
      'https://i.pinimg.com/736x/09/fa/41/09fa410e40c990bce7498f9d971838d6.jpg', // 더미 프로필 이미지
    likeCount: 42,
    commentsCount: '5',
    bookTitle: '감동적인 책',
    createdAt: '2024-03-21T12:00:00Z',
    imageUrls: [
      'https://i.pinimg.com/736x/09/fa/41/09fa410e40c990bce7498f9d971838d6.jpg',
      'https://i.pinimg.com/736x/09/fa/41/09fa410e40c990bce7498f9d971838d6.jpg',
    ],
  };
  // 리뷰 데이터를 가져오는 함수
  useEffect(() => {
    // 리뷰 데이터를 API에서 가져옵니다.
    // const fetchReviewData = async () => {
    //   try {
    //     const response = await fetch(
    //       `${import.meta.env.VITE_API_URL_DEV}/reviews/${reviewId}`,
    //     );
    //     if (response.ok) {
    //       const data = await response.json();
    //       setReview(data);
    //       // 댓글 데이터를 가져오려면 댓글 API도 추가적으로 호출할 수 있습니다.
    //       // 예시로, 댓글을 별도로 가져오는 API가 있다면 그 API를 호출해야 합니다.
    //       // setComments(data.comments); // 예시
    //     } else {
    //       throw new Error('리뷰를 가져오는 데 실패했습니다.');
    //     }
    //   } catch (error) {
    //     console.error('Error fetching review data:', error);
    //   }
    // };
    const fetchReviewData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL_DEV}/reviews/${reviewId}`,
        );

        if (!response.ok) {
          throw new Error('리뷰를 가져오는 데 실패했습니다.');
        }

        const data = await response.json(); // JSON 데이터 파싱
        let sortedReviews = data.content ? [...data.content] : []; // 배열인지 확인 후 복사

        // 가짜 리뷰 데이터를 추가
        sortedReviews.unshift(fakeReview);

        // 첫 번째 리뷰를 상태로 설정
        setReview(sortedReviews.length > 0 ? sortedReviews[0] : fakeReview);
      } catch (error) {
        console.error('Error fetching review data:', error);
        setReview(fakeReview); // API 호출 실패 시 가짜 리뷰 사용
      }
    };

    fetchReviewData();
  }, [reviewId]); // reviewId가 바뀔 때마다 API 호출

  // 댓글 추가 함수
  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    const newEntry: Comment = {
      commentId: (comments.length + 1).toString(),
      memberNickname: 'Username2',
      commentContent: newComment,
      commentPostDateTime: '방금 전',
      memberProfile:
        'https://i.pinimg.com/736x/09/fa/41/09fa410e40c990bce7498f9d971838d6.jpg',
      commentsLike: '0', // 댓글의 좋아요 수는 string으로 처리
    };
    setComments([newEntry, ...comments]);
    setNewComment('');
  };

  // 댓글 내용 변경 함수
  const handleNewCommentChange = (comment: string) => {
    setNewComment(comment);
  };

  if (!review) {
    return (
      <div className="mx-auto mt-36 text-xl h-[75vh] text-center">
        리뷰를 불러오는 중입니다.
      </div>
    );
  }

  return (
    <div className="relative max-w-5xl mx-auto p-16 bg-white shadow-lg rounded-lg mt-1 mb-40">
      <button
        className="absolute top-6 left-6 text-gray-900 hover:text-black transition text-3xl font-bold flex items-center"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="w-8 h-8" />
      </button>

      {/* Review Section */}
      <ReviewCommentSection review={review} onImageClick={() => {}} />

      {/* Comment Section */}
      <CommentSection
        comments={comments}
        reviewId={reviewId}
        newComment={newComment}
        onNewCommentChange={handleNewCommentChange}
        onAddComment={handleAddComment}
      />
    </div>
  );
}
