/**
 * 마이페이지 용 컴포넌트
 */
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../utility/AuthUtils';
import Pagination from './Pagination';

interface Collection {
  bookId: string;
  bookTitle: string;
  thumbnail: string;
}
const TabCollection = (): React.JSX.Element => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const accessToken = localStorage.getItem('accesstoken');

  const fetchCollections = useCallback(async () => {
    if (!accessToken) return; //prevent api call if user not authenticated
    try {
      const response = await axios.get(`${apiUrl}/api/collection`, {
        params: { page },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response?.data) {
        console.log('TabCollection Resp', response);
        const { totalPages, books = [] } = response.data;
        setTotalPages(Number(totalPages));
        setCollections(books);
      }
    } catch (error) {
      console.error('Failed to fetch collection:', error);
    }
  }, [accessToken, page]);
  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return (
    <div className="mt-20">
      <h3 className="text-2xl font-semibold">나의 컬렉션</h3>
      <div className="mt-10 gap-y-10 grid grid-cols-3">
        {collections.length > 0 ? (
          collections.map((col) => (
            <Link
              key={col.bookId}
              to={`/book/${col.bookId}`}
              title={col.bookTitle}
              className="collectionPost w-[300px] h-[500px]"
            >
              <img
                src={col.thumbnail}
                alt="collection book"
                className="block w-full h-[450px] shadow-lg rounded-xl"
              />
              <h4 className="font-semibold text-center mt-3 leading-5 hover:underline">
                {col.bookTitle}
              </h4>
            </Link>
          ))
        ) : (
          <div>나만의 컬렉션을 만들어보세요</div>
        )}
      </div>
      {collections.length > 0 ? (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      ) : null}
    </div>
  );
};
export default TabCollection;
