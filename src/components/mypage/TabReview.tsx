/**
 * 마이페이지 용 컴포넌트
 */

interface Review {
  reviewid: number;
  reviewBooktitle: string;
  reviewBookPubYear: number;
  reviewBookAuthor: string;
  reviewContent: string;
  reviewCommentsCount: number;
  thumbnail: string;
}
const reviews: Review[] = [
  {
    reviewid: 1,
    reviewBooktitle: '"여우와 함께 춤을"',
    reviewBookPubYear: 2022,
    reviewBookAuthor: '비우산',
    reviewContent:
      'Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
    reviewCommentsCount: 23,
    thumbnail: 'http://dd.com/1',
  },
  {
    reviewid: 2,
    reviewBooktitle: '"여우와 함께 춤을"',
    reviewBookPubYear: 2022,
    reviewBookAuthor: '비우산',
    reviewContent:
      'Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
    reviewCommentsCount: 23,
    thumbnail: 'http://dd.com/1',
  },
  {
    reviewid: 3,
    reviewBooktitle: '"여우와 함께 춤을"',
    reviewBookPubYear: 2022,
    reviewBookAuthor: '비우산',
    reviewContent:
      'Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
    reviewCommentsCount: 23,
    thumbnail: 'http://dd.com/1',
  },
];

const TabReview = (): React.JSX.Element => {
  return (
    <div className="">
      <h3 className="text-2xl">내가 남긴 리뷰</h3>

      <div className="flex w-full color-[#f60]">
        {reviews.map((review) => (
          <div
            key={review.reviewid}
            className="border border-red-500 text-center w-1/5"
          >
            <span>삭제버튼</span>
            <div id="reviewInfo" className=""></div>
            <p>{review.reviewContent}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TabReview;
