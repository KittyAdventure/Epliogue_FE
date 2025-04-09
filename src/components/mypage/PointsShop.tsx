// Mypage - TabPoints Component
import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiUrl } from '../../utility/AuthUtils';
import Pagination from './Pagination';

interface Item {
  id: string;
  name: string;
  price: string;
  buy: boolean;
}
const PointsShop: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const accessToken = localStorage.getItem('accesstoken');
  const memberId = localStorage.getItem('memberId');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/item/list`, {
          params: { memberId, page },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response?.data) {
          console.log('Points Shop Resp', response);
          setItems(response.data.items);
          setPage(response.data.page);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        console.error('Points-Item Error', error);
      } finally {
        setLoading(false);
      }
    };
    if (accessToken && memberId) {
      fetchItems();
    }
  }, [page, accessToken, memberId]);

  if (loading) return <div className="mt-10">Loading...</div>;
  return (
    <div className="mt-10">
      <button>Shop</button>
      {items.length > 0 ? (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      ) : null}
    </div>
  );
};
export default PointsShop;
