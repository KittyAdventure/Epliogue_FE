import { FaShareAlt } from 'react-icons/fa';

interface ShareOption {
  shareUrl: string;
  kakaoShareUrl: string;
}

interface ShareProps {
  bookIsbn: string;
  onShareClick: (shareData: ShareOption) => void;
}

const Share = ({ bookIsbn, onShareClick }: ShareProps) => {
  const handleShareClick = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL_DEV
        }/api/share?type=book&id=${bookIsbn}`,
      );

      if (!response.ok) {
        throw new Error('공유 URL을 가져오는 데 실패했습니다.');
      }

      const data = await response.json();

      const shareData = {
        shareUrl: data.shareUrl,
        kakaoShareUrl: `${data.shareUrl}?kakao=true`, // Kakao URL은 ?kakao=true 형식으로 가정
      };

      onShareClick(shareData); // 부모 컴포넌트에 공유 URL 전달
    } catch (error) {
      console.error('API 호출 오류:', error); // 오류 처리
    }
  };

  return (
    <FaShareAlt
      className="ml-2 cursor-pointer mt-[2px]"
      onClick={handleShareClick}
    />
  );
};

export default Share;
