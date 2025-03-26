import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '../components/review/CommentSection';
import ReviewCommentSection from '../components/review/ReviewCommentSection';
import { Comment, Review } from '../components/review/type'; // 타입 파일

export default function ReviewPage() {
  const [review, setReview] = useState<Review | null>(null); // 리뷰 상태
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 상태
  const [newComment, setNewComment] = useState(''); // 새 댓글 입력 상태
  const { reviewId } = useParams<{ reviewId: string }>();
  // reviewId를 숫자로 변환
  const safeReviewId = reviewId ? Number(reviewId) : 0;

  const getProfileImage = (imageUrl: string | null | undefined): string => {
    return imageUrl && imageUrl.trim() !== ''
      ? imageUrl
      : '/img/members/user.png';
  };

  // 리뷰 데이터를 가져오는 함수
  useEffect(() => {
    if (!reviewId) {
      console.error('Review ID is missing.');
      return; // reviewId가 없으면 API 요청을 하지 않음
    }

    const fetchReviewData = async () => {
      try {
        console.log('Attempting to fetch review data...');

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

        console.log('Review data received:', response.data);
        setReview(response.data);
      } catch (error) {
        console.error('Error fetching review data:', error);
        if (axios.isAxiosError(error)) {
          // Axios 에러 상세 정보
          console.error('Axios error details:', error.response?.data);
        } else {
          // Axios 외부 에러
          console.error('Unexpected error:', error);
        }
      }
    };

    fetchReviewData();
  }, [reviewId]); // reviewId가 변경될 때마다 다시 데이터를 요청

  if (!review) {
    return (
      <div className="mx-auto mt-36 text-xl h-[75vh] text-center">
        리뷰를 불러오는 중입니다.
      </div>
    );
  }

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
      commentsLike: '0',
      existLike: false, // existLike 추가
    };

    setComments([newEntry, ...comments]);
    setNewComment('');
  };

  // 댓글 내용 변경 함수
  const handleNewCommentChange = (comment: string) => {
    setNewComment(comment);
  };

  return (
    <div className="relative max-w-5xl mx-auto p-16 bg-white shadow-lg rounded-lg mt-1 mb-40">
      <button
        className="absolute top-6 left-6 text-gray-900 hover:text-black transition text-3xl font-bold flex items-center"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="w-8 h-8" />
      </button>

      {/* Review Section */}
      <ReviewCommentSection
        review={{
          ...review,
          memberProfileImage: getProfileImage(review.memberProfileImage),
        }}
        onImageClick={() => {}}
      />

      {/* Comment Section */}
      <CommentSection
        comments={comments}
        reviewId={safeReviewId}
        newComment={newComment}
        onNewCommentChange={handleNewCommentChange}
        onAddComment={handleAddComment}
      />
    </div>
  );
}
