import axios from 'axios';
import React, { useState } from 'react';

interface CollectionProps {
  bookId: string;
}

const Collection: React.FC<CollectionProps> = ({ bookId }) => {
  const [isInCollection, setIsInCollection] = useState(false);
  const [message, setMessage] = useState('');


  const addToCollection = async () => {
    try {
      const accessToken = localStorage.getItem('accesstoken');
      console.log(accessToken);
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_DEV}/api/collection`,
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.data.message === '컬렉션에 추가 되었습니다.') {
        setIsInCollection(true);
        setMessage(response.data.message);
      }
    } catch (error: any) {
      console.error('Error occurred at URL:', error.config?.url);
      console.error('Error details:', error);

      setMessage('Error adding to collection.');
    }
  };


  const removeFromCollection = async () => {
    try {
      const accessToken = localStorage.getItem('accesstoken'); // 저장된 accesstoken을 가져옵니다.
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL_DEV}/collection`,
        {
          data: { bookId },
          headers: {
            Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 token을 포함시킵니다.
          },
        },
      );
      if (response.data.message === '컬렉션에 삭제 되었습니다.') {
        setIsInCollection(false);
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Error removing from collection.');
    }
  };

  return (
    <div className="collection-container">
      <div className="icon-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-10 h-12"
          style={{
            filter: 'drop-shadow(0.5px 2px 3px rgba(255, 255, 255, 0.5))',
          }}
        >
          <path d="M6 2a2 2 0 00-2 2v18l8-5 8 5V4a2 2 0 00-2-2H6z" />
        </svg>
      </div>
      <div className="message">{message}</div>
      <button onClick={isInCollection ? removeFromCollection : addToCollection}>
        {isInCollection ? 'Remove from Collection' : 'Add to Collection'}
      </button>
    </div>
  );
};

export default Collection;
