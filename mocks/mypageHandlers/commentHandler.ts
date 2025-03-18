import { http } from 'msw';
// Define a type for the mock database structure
type Comment = {
  postDateTime: string;
  bookTitle: string;
  content: string;
};

type User = {
  totalPage: string;
  page: string;
  comments: Comment[];
};
const mockDatabase: User = {
  totalPage: '2',
  page: '1',
  comments: [
    {
      postDateTime: '2025.03.03 12:33:55',
      bookTitle: '테스트책',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      postDateTime: '2025.03.03 12:33:55',
      bookTitle: '테스트책',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      postDateTime: '2025.03.03 12:33:55',
      bookTitle: '테스트책',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      postDateTime: '2025.03.03 12:33:55',
      bookTitle: '테스트책',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      postDateTime: '2025.03.03 12:33:55',
      bookTitle: '테스트책',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      postDateTime: '2025.03.03 12:33:55',
      bookTitle: '테스트책',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      postDateTime: '2025.03.03 12:33:55',
      bookTitle: '테스트책',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      postDateTime: '2025.03.03 12:33:55',
      bookTitle: '테스트책',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      postDateTime: '2025.03.03 12:33:55',
      bookTitle: '테스트책',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      postDateTime: '2025.03.03 12:33:55',
      bookTitle: '테스트책',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      postDateTime: '2025.03.03 12:33:55',
      bookTitle: '테스트책',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      postDateTime: '2025.03.03 12:33:55',
      bookTitle: '테스트책',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      postDateTime: '2025.03.03 12:33:55',
      bookTitle: '테스트책',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      postDateTime: '2025.03.03 12:33:55',
      bookTitle: '테스트책',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      postDateTime: '2025.03.03 12:33:55',
      bookTitle: '테스트책',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      postDateTime: '2025.03.03 12:33:55',
      bookTitle: '테스트책',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      postDateTime: '2025.03.03 12:33:55',
      bookTitle: '테스트책',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      postDateTime: '2025.03.03 12:33:55',
      bookTitle: '테스트책',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      postDateTime: '2025.03.03 12:33:55',
      bookTitle: '테스트책',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      postDateTime: '2025.03.03 12:33:55',
      bookTitle: '테스트책',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      postDateTime: '2025.03.03 12:33:55',
      bookTitle: '테스트책',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
  ],
};

//Handlers for intercepting requests
export const commentHandler = [
  http.get('http://localhost:5000/mypage/comment', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);

    // Simulate pagination
    const pageLimit = 20; //posts per page
    const startIndex = (page - 1) * pageLimit;
    // 0~19 comments are extracted
    const paginatedComments = mockDatabase.comments.slice(
      startIndex,
      startIndex + pageLimit,
    );

    return new Response(
      JSON.stringify({
        page: mockDatabase.page,
        totalPage: mockDatabase.totalPage,
        comments: paginatedComments,
      }),
      { status: 202, headers: { 'Content-Type': 'application/json' } },
    );
  }),
];
