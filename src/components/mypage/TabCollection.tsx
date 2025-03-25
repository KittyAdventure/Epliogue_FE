/**
 * 마이페이지 용 컴포넌트
 */
import axios from 'axios';
import { useEffect, useState } from 'react';
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
  const fetchCollections = async (page: number) => {
    try {
      const apiUrl =
        import.meta.env.NODE === 'production'
          ? import.meta.env.VITE_API_URL_PROD
          : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.get(`${apiUrl}/api/collection`, {
        params: { page },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response)
      console.log(response.data.books)
      console.log(response.data.page)
      console.log(response.data.totalPages)
      const { totalPages, books = [] } = response.data;

      setTotalPages(Number(totalPages));
      setCollections(books);
    } catch (error) {
      console.error('Failed to fetch collection:', error);
    }
  };
  useEffect(() => {
    fetchCollections(page);
  }, [page]);

  return (
    <div className="mt-20">
      <h3 className="text-2xl font-semibold">나의 컬렉션</h3>
      <div className="mt-10 gap-y-10 grid grid-cols-3">
        {collections.length > 0 ? (
          collections.map((col) => (
            <div
              key={col.bookId}
              className="collectionPost w-[300px] overflow-hidden"
            >
              <img
                src={col.thumbnail}
                alt="collection book"
                className="block w-full h-[450px] shadow-md rounded-xl"
              />
              <h4 className="font-semibold text-center leading-5">
                {col.bookTitle}
              </h4>
            </div>
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
