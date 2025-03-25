import axios, { AxiosError } from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utility/AuthContext';
import { redirectToLogin } from '../../utility/AuthUtils';

interface CollectionProps {
  bookId: string;
}

const Collection: React.FC<CollectionProps> = ({ bookId }) => {
  const [isInCollection, setIsInCollection] = useState(false);
  const navigate = useNavigate();
 const authContext = useContext(AuthContext);

  if (!authContext) {
    console.error('🚨 AuthContext가 제공되지 않았습니다.');
    return null;
  }

  const { loggedIn } = authContext;

  const addToCollection = async () => {

    const reviewData = {
      content: bookId,
    };

    const token = localStorage.getItem('accesstoken');

    if (!loggedIn) {
      redirectToLogin(navigate);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_DEV}/api/collection?bookId=${bookId}`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 필요한 경우 인증 추가
          },
        },
      );

      console.log('Response:', response); // 응답 객체 찍기

      if (response.status !== 200) {
        throw new Error('컬렉션 등록 실패');
      }

      alert('컬렉션에 추가 되었습니다.');
      setIsInCollection(true);
    } catch (error) {
      // error가 AxiosError 타입일 경우 처리
      if (error instanceof AxiosError) {
        console.error('Response error:', error.response);
      } else {
        console.error('Error:', error); // AxiosError가 아닌 경우
      }

      alert('컬렉션에 추가 오류가 발생했습니다.');
    }
  };

  const removeFromCollection = async () => {
    const token = localStorage.getItem('accesstoken');
   
    if (!loggedIn) {
      redirectToLogin(navigate);
      return;
    }

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL_DEV}/api/collection?bookId=${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('삭제 응답:', response);

      // 응답 메시지를 직접 확인하고 상태 변경
      if (response.status === 200) {
        alert('컬렉션에서 삭제되었습니다.');
        setIsInCollection(false);
      } else {
        throw new Error('삭제 실패');
      }
    } catch (error) {
      console.error('삭제 요청 오류:', error);

      if (error instanceof AxiosError && error.response) {
        console.error('서버 응답 오류:', error.response);
      }
    }
  };

  return (
    <div className="collection-container absolute top-3 right-3">
      <button
        onClick={isInCollection ? removeFromCollection : addToCollection}
        className="icon-button"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
      >
        <div className="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-12 h-14"
            style={{
              filter: isInCollection
                ? 'drop-shadow(0px 0px 6px #22C55E)'
                : 'drop-shadow(0.5px 2px 3px rgba(255, 255, 255, 0.5))',
              color: isInCollection ? '#22C55E' : 'currentColor',
            }}
          >
            <path d="M6 2a2 2 0 00-2 2v18l8-5 8 5V4a2 2 0 00-2-2H6z" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default Collection;
