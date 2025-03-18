import { http } from 'msw';
// Define a type for the mock database structure

type UserInfo = {
  nickname: string;
  loginId: string;
  email: string;
  follower: string;
  following: string;
  reviewCount: string;
  commentCount: string;
  meetingCount: string;
  collectionCount: string;
  point: string;
};
const mockDatabase: UserInfo[] = [
  {
    nickname: 'HelloThere',
    loginId: 'test123',
    email: 'email@email.com',
    follower: '3',
    following: '4',
    reviewCount: '5',
    meetingCount: '6',
    collectionCount: '7',
    commentCount: '8',
    point: '9',
  },
  {
    nickname: 'HelloThere',
    loginId: 'test321',
    email: 'email@email.com',
    follower: '3',
    following: '4',
    reviewCount: '5',
    commentCount: '6',
    meetingCount: '7',
    collectionCount: '8',
    point: '9',
  },
];
//Handlers for intercepting requests
export const mypageHandler = [
  http.get('http://localhost:5000/mypage', ({ request }) => {
    const url = new URL(request.url);
    const loginId = url.searchParams.get('id');
    const user = mockDatabase.find((user) => user.loginId === loginId);

    if (!user) {
      return new Response(JSON.stringify({ error: 'User Not Found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(
      JSON.stringify({
        nickname: user.nickname,
        loginId: user.loginId,
        email: user.email,
        follower: user.follower,
        following: user.following,

        reviewCount: user.reviewCount,
        commentCount: user.commentCount,
        meetingCount: user.meetingCount,
        collectionCount: user.collectionCount,
        point: user.point,
      }),
      { status: 202, headers: { 'Content-Type': 'application/json' } },
    );
  }),
];
