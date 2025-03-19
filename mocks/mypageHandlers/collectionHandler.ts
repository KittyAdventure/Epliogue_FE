import { http } from 'msw';

type Collection = {
  bookId: string;
  bookTitle: string;
  thumbnail: string;
};
type User = {
  page: string;
  totalPages: string;
  books: Collection[];
};

// 10books
const mockDatabase: User = {
  page: '1',
  totalPages: '2',
  books: [
    {
      bookId: '11111111111111',
      bookTitle: '책 제목',
      thumbnail:
        'https://images.pexels.com/photos/2844795/pexels-photo-2844795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      bookId: '21111111111111',
      bookTitle: '책 제목',
      thumbnail:
        'https://images.pexels.com/photos/2844795/pexels-photo-2844795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      bookId: '31111111111111',
      bookTitle: '책 제목',
      thumbnail:
        'https://images.pexels.com/photos/2844795/pexels-photo-2844795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      bookId: '41111111111111',
      bookTitle: '책 제목',
      thumbnail:
        'https://images.pexels.com/photos/2844795/pexels-photo-2844795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      bookId: '51111111111111',
      bookTitle: '책 제목',
      thumbnail:
        'https://images.pexels.com/photos/2844795/pexels-photo-2844795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      bookId: '61111111111111',
      bookTitle: '책 제목',
      thumbnail:
        'https://images.pexels.com/photos/2844795/pexels-photo-2844795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      bookId: '71111111111111',
      bookTitle: '책 제목',
      thumbnail:
        'https://images.pexels.com/photos/2844795/pexels-photo-2844795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      bookId: '81111111111111',
      bookTitle: '책 제목',
      thumbnail:
        'https://images.pexels.com/photos/2844795/pexels-photo-2844795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      bookId: '91111111111111',
      bookTitle: '책 제목',
      thumbnail:
        'https://images.pexels.com/photos/2844795/pexels-photo-2844795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      bookId: '10111111111111',
      bookTitle: '책 제목',
      thumbnail:
        'https://images.pexels.com/photos/2844795/pexels-photo-2844795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      bookId: '11111111111111',
      bookTitle: '책 제목',
      thumbnail:
        'https://images.pexels.com/photos/2844795/pexels-photo-2844795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ],
};

export const collectionHandler = [
  http.get('http://localhost:5000/collection', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);

    const pageLimit = 9;
    const startIndex = (page - 1) * pageLimit;
    const paginatedCollections = mockDatabase.books.slice(
      startIndex,
      startIndex + pageLimit,
    );

    return new Response(
      JSON.stringify({
        page: mockDatabase.page,
        totalPages: mockDatabase.totalPages,
        collections: paginatedCollections,
      }),
      { status: 202, headers: { 'Content-Type': 'application/json' } },
    );
  }),
];
