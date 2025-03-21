export interface Comment {
  commentId: string; // commentId (문자열)
  commentContent: string; // 댓글 내용
  memberId?: string; // 회원 ID
  memberNickname: string; // 회원 닉네임
  commentPostDateTime: string; // 댓글 작성 시간
  memberProfile: string; // 프로필 이미지 URL
  commentsLike: string; // 좋아요 수 (문자열)
  commentColor?: string; // 댓글 색상
}

export interface Review {
  id: number;
  content: string;
  nickname: string;
  memberId?: string;
  memberProfileImage: string;
  likeCount: number;
  commentsCount?: string;
  bookTitle: string;
  createdAt: string;
  imageUrls: string[];
}

export interface LatestReview {
  id: number;
  memberId?: string;
  nickname: string;
  memberProfileImage: string;
  bookId: number;
  bookTitle: string;
  content: string;
  imageUrls: string[];
  createdAt: string;
  modifiedAt: string;
  likeCount: number;
  commentsCount?: string;
  bookCoverUrl: string;
}
