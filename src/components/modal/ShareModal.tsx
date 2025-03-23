import axios from 'axios';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaLink } from 'react-icons/fa';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { Book } from '../review/type'; 

declare global {
  interface Window {
    Kakao: any;
  }
}

interface ShareOption {
  shareUrl: string;
}

interface ShareModalProps {
  type: string;
  id: string;
  setShareModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  book: Book; // 책 정보 전달
}

const ShareModal: React.FC<ShareModalProps> = ({
  type,
  id,
  setShareModalOpen,
  book
}) => {
  const [shareOptions, setShareOptions] = useState<ShareOption>({
    shareUrl: '',
  });
  const JAVASCRIPT_KEY = import.meta.env.VITE_APP_JAVASCRIPT_KEY;

  useEffect(() => {
    if (!type || !id) {
      console.error('공유할 리소스의 타입과 ID가 필요합니다.');
      return;
    }

    // API 요청을 통해 kakaoShareUrl만 가져오고, shareUrl은 직접 생성
    axios
      .get(`${import.meta.env.VITE_API_URL_DEV}/api/share`, {
        params: { type, id },
      })
      .then((response) => {
        const baseUrl = import.meta.env.VITE_API_URL_DEV; // API URL
        setShareOptions({
          shareUrl: `${baseUrl}/api/books/detail?query=${id}&type=d_isbn`, // 원하는 URL 형식
        });

        // 예시로 response 데이터를 사용하려면 여기에서 처리할 수 있습니다.
        console.log(response.data); // API 응답 데이터 출력
      })
      .catch((error) =>
        console.error('공유 링크를 가져오는 데 실패했습니다.', error),
      );
  }, [type, id]);

  useEffect(() => {
    if (!JAVASCRIPT_KEY) {
      console.error('Kakao JavaScript Key가 설정되지 않았습니다.');
      return;
    }

    if (window.Kakao && window.Kakao.isInitialized()) {
      console.log('Kakao SDK 이미 초기화됨');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao) {
        window.Kakao.init(JAVASCRIPT_KEY);
      }
    };
    document.body.appendChild(script);
  }, [JAVASCRIPT_KEY]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareOptions.shareUrl);
    alert('링크가 복사되었습니다!');
  };

  const handleKakaoShare = () => {
    if (!window.Kakao || !window.Kakao.Share) {
      alert('Kakao SDK가 로드되지 않았습니다.');
      return;
    }

 window.Kakao.Share.sendDefault({
   objectType: 'feed',
   content: {
     title: `${book.title}`, // 책 제목
     description: `${book.description}`, // 책 설명
     imageUrl: book.image, // 책 이미지 URL
     link: {
       webUrl: shareOptions?.shareUrl || '', // 공유 링크
       mobileWebUrl: shareOptions?.shareUrl || '', // 모바일 공유 링크
     },
   },
   buttons: [
     {
       title: '웹에서 보기',
       link: {
         webUrl: shareOptions?.shareUrl || '',
       },
     },
   ],
 });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-100">
      <div className="bg-white p-8 rounded-lg w-96 shadow-lg relative">
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
