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
  const handleShareClick = () => {
    const shareData = {
      shareUrl: `https://localhost:5000/book/${bookIsbn}`,
      kakaoShareUrl: `https://localhost:5000/book/${bookIsbn}?kakao=true`,
    };
    onShareClick(shareData);
  };

  return (
    <FaShareAlt
      className="ml-2 cursor-pointer mt-[2px]"
      onClick={handleShareClick}
    />
  );
};

export default Share;
