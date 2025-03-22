/**
 * 마이페이지 콘텐츠 컴포넌트
 */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
interface HeaderRow {
  id: number;
  name: string;
}
const hdrRowTitle: HeaderRow[] = [
  { id: 1, name: '작성일' },
  { id: 2, name: '책 제목' },
  { id: 3, name: '댓글 내용' },
];

interface Comment {
  postDateTime: string;
  bookTitle: string;
  content: string;
}

const TabComment = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState<number>(1); //pagination
  const [totalPages, setTotalPages] = useState<number>(1); //pagination total page #

  const fetchComments = async (page: number) => {
    try {
      const apiUrl =
        import.meta.env.NODE === 'production'
          ? import.meta.env.VITE_API_URL_PROD
          : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.get(`${apiUrl}/mypage/comment`, {
        params: { page },
      });
      if (!response.data || !response.data.nickname) {
        console.warn('No response in mypage/comment');
        navigate('/login');
      }
      // console.log(response);
      // console.log(response.data);
      const { totalPage, comments = [] } = response.data; //mypage 각 가져오기

      console.log('Comments ================');
      console.log(comments);
      console.log(totalPage);
      setComments(comments);
      setTotalPages(Number(totalPage));
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };
  useEffect(() => {
    fetchComments(page);
  }, [page]); //run the code when [something] changes

  return (
    <div className="mt-20">
      <h3 className="text-2xl">나의 댓글</h3>

      <div className='mt-10'>
        {comments.length > 0 ? (
          <table className="w-full mt-10">
            <thead className="headerTitle w-full border-y-1">
              <tr>
                {hdrRowTitle.map((rowTitle, idx) => (
                  <th key={idx} className=" font-medium leading-10 text-center">
                    {rowTitle.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {comments.map((comment, idx) => (
                <tr
                  key={idx}
                  className="text-center leading-10 border-b-1 border-gray-300"
                >
                  <td className="leading-10">{comment.postDateTime}</td>
                  <td className="leading-10">{comment.bookTitle}</td>
                  <td className="leading-10">{comment.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>리뷰에 댓글을 남겨보세요</p>
        )}
      </div>
      {comments.length > 0 ? (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
export default TabComment;
