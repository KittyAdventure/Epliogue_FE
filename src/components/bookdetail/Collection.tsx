interface CollectionProps {
  bookIsbn: string;
  bookTitle: string;
  bookImage: string;
  selectedBooks: Set<string>;
  setSelectedBooks: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const Collection = ({
  bookIsbn,
  bookTitle,
  bookImage,
  selectedBooks,
  setSelectedBooks,
}: CollectionProps) => {
  const collection = async (isbn: string) => {
    const isCollection = selectedBooks.has(isbn);
    const url = `${import.meta.env.VITE_API_URL_DEV}/collection${
      isCollection ? `/${isbn}` : ''
    }`;
    const method = isCollection ? 'DELETE' : 'POST';

    const dataToSend = {
      bookId: isbn,
      bookTitle,
      thumbnail: bookImage,
    };

    try {
      // fetch에서 'url' 사용
      const accessToken = localStorage.getItem('accesstoken');
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 token을 포함시킵니다.
        },
        body: isCollection ? null : JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error('API 요청 실패');

      setSelectedBooks((prev) => {
        const newSet = new Set(prev);
        isCollection ? newSet.delete(isbn) : newSet.add(isbn);
        return newSet;
      });

      alert(
        isCollection
          ? '컬렉션에서 삭제되었습니다.'
          : '컬렉션에서 추가되었습니다.',
      );
    } catch (error) {
      console.error('컬렉션 처리 중 오류 발생:', error);
      alert('컬렉션 처리 중 오류가 발생했습니다.');
    } finally {
    }
  };

  return (
    <div
      className={`absolute top-0 right-2 cursor-pointer ${
        selectedBooks.has(bookIsbn) ? 'text-green-500' : 'text-black/90'
      }`}
      onClick={(e) => {
        e.stopPropagation();
        collection(bookIsbn);
      }}
    >
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
  );
};

export default Collection;
