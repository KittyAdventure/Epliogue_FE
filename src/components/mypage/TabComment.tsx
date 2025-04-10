/**
 * 마이페이지 콘텐츠 컴포넌트
 */
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { apiUrl } from '../../utility/AuthUtils';
import Pagination from './Pagination';
// interface HeaderRow {
//   id: number;
//   name: string;
// }
// const hdrRowTitle: HeaderRow[] = [
//   { id: 1, name: '작성일' },
//   { id: 2, name: '책 제목' },
//   { id: 3, name: '댓글 내용' },
// ];
// {
//   hdrRowTitle.map((rowTitle, idx) => (
//     <th key={idx} className=" font-medium leading-10 text-center">
//       {rowTitle.name}
//     </th>
//   ));
// }
interface Comment {
  postDateTime: string;
  bookTitle: string;
  content: string;
}

const TabComment = (): React.JSX.Element => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState<number>(1); //pagination
  const [totalPages, setTotalPages] = useState<number>(1); //pagination total page #

  const accessToken = localStorage.getItem('accesstoken');

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/mypage/comments`, {
        params: { page },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response?.data) {
        console.log('TabComments Resp', response);
        const { totalPage, comments = [] } = response.data;
        setComments(comments);
        setTotalPages(Number(totalPage));
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  }, [accessToken, page]);
  useEffect(() => {
    fetchComments();
  }, [fetchComments]); //run the code when [something] changes

  return (
    <div className="mt-20">
      <h3 className="text-2xl font-semibold">나의 댓글</h3>

      <div className="mt-10">
        {comments.length > 0 ? (
          <div className="w-full mt-10">
            <div className="headerTitle text-center w-full border-y-1 grid grid-cols-15 gap-12">
              <h5 className="font-semibold col-span-3">작성일</h5>
              <h5 className="font-semibold col-span-6">책 제목</h5>
              <h5 className="font-semibold col-span-6">댓글 내용</h5>
            </div>

            <div>
              {comments.map((comment, idx) => (
                <div
                  key={idx}
                  className="commentInfo border-b-1 border-gray-300 w-full border-y-1 grid grid-cols-15 gap-12"
                >
                  <p className="col-span-3 leading-10 text-center">
                    {comment.postDateTime}
                  </p>
                  <p className="col-span-6 leading-10 text-ellipsis line-clamp-1">
                    {comment.bookTitle}
                  </p>
                  <p className="col-span-6 leading-10 text-ellipsis line-clamp-1">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
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
      ) : null}
    </div>
  );
};
export default TabComment;
