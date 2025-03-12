import { X } from 'lucide-react';
import { FaLink } from 'react-icons/fa';
import { RiKakaoTalkFill } from 'react-icons/ri';

declare global {
  interface Window {
    Kakao: any; // Kakao 객체의 타입을 any로 선언
  }
}

interface ShareOption {
  shareUrl: string;
  kakaoShareUrl: string;
}

interface ShareModalProps {
  shareOptions: ShareOption;
  setShareModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareModal: React.FC<ShareModalProps> = ({
  shareOptions,
  setShareModalOpen,
}) => {
  // const JAVASCRIPT_KET = import.meta.env.VITE_APP_JAVASCRIPT_KEY;

  // // 카카오 SDK 초기화 (필요한 경우만)
  // useEffect(() => {
  //   if (window.Kakao && !window.Kakao.isInitialized()) {
  //     window.Kakao.init(JAVASCRIPT_KET); // 카카오 개발자 사이트에서 제공하는 JavaScript Key
  //   }
  // }, [JAVASCRIPT_KET]); // JAVASCRIPT_KET이 변경될 때만 초기화

  // 링크 복사
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareOptions.shareUrl);
    alert('링크가 복사되었습니다!');
  };

  // 카카오톡으로 공유
  const handleKakaoShare = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '공유할 내용 제목',
          description: '공유할 내용 설명',
          imageUrl: '이미지 URL',
          link: {
            webUrl: shareOptions.shareUrl,
            mobileWebUrl: shareOptions.shareUrl,
          },
        },
        buttons: [
          {
            title: '웹에서 보기',
            link: {
              webUrl: shareOptions.shareUrl,
            },
          },
        ],
      });
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-100">
      <div className="bg-white p-8 rounded-lg w-96 shadow-lg scale-100">
        <h3 className="text-2xl text-center font-bold text-gray-800 mb-8">
          공유하기
        </h3>
        <div className="flex justify-evenly gap-4 mb-1">
          <div className="flex flex-col items-center">
            <button
              className="bg-gray-100 hover:bg-gray-300 text-black p-6 rounded-full shadow-md transition-all duration-200"
              onClick={handleCopyLink}
            >
              <FaLink className="text-3xl" />
            </button>
            <span className="mt-3 text-sm font-semibold text-gray-700">
              링크복사
            </span>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="bg-[#FEE500] hover:bg-[#F9D000] text-black p-6 rounded-full shadow-md transition-all duration-200"
              onClick={handleKakaoShare}
            >
              <RiKakaoTalkFill className="text-3xl transform scale-125" />
            </button>
            <span className="mt-3 text-sm font-semibold text-gray-700">
              카카오톡
            </span>
          </div>
        </div>
        {/* 닫기 버튼 */}
        <button
          onClick={() => setShareModalOpen(false)}
          className="absolute top-4 right-4"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
